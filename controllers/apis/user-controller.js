const { User, Tweet, Reply, Followship, Like } = require('../../models')
const helpers = require('../../helpers/auth-helper')
const dateFormatter = require('../../helpers/dateFormatter')
const { imgurFileHandler } = require('../../helpers/file-helpers')

const userController = {
  addFollowing: async (req, res) => {
    try {
      const UserId = helpers.getUser(req)?.id
      const reqUserId = req.body.id
      if (reqUserId === Number(UserId)) throw new Error('You cannot follow yourself!')

      // Check if user exists and find followship
      const [user, followship] = await Promise.all([
        User.findByPk(reqUserId),
        Followship.findOne({
          where: { followerId: UserId, followingId: reqUserId }
        })
      ])
      if (!user) throw new Error("User doesn't exist!")
      if (followship) throw new Error('You have already followed this user!')

      // Create followship if it doesn't exist
      const newFollowship = await Followship.create({ followerId: UserId, followingId: reqUserId })

      // Get user's follower count
      const followerCount = await Followship.count({ where: { followingId: reqUserId } })

      // Return user's follower count and isFollowed status
      res.status(302).json({
        followerCount,
        isFollowed: newFollowship ? true : false
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },
  removeFollowing: async (req, res) => {
    try {
      const UserId = helpers.getUser(req)?.id
      const reqUserId = req.params.id
      // Check if user exists and find followship
      const [user, followship] = await Promise.all([
        User.findByPk(reqUserId),
        Followship.findOne({
          where: { followerId: UserId, followingId: reqUserId }
        })
      ])
      if (!user) throw new Error("User doesn't exist!")
      if (!followship) throw new Error('You have not followed this user!')
      const isDestroy = await followship.destroy()

      // Get user's follower count
      const followerCount = await Followship.count({ where: { followingId: reqUserId } })

      res.status(302).json({
        followerCount,
        isFollowed: !isDestroy
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },
  // 可以改成捲動式版本
  getUserTweets: async (req, res) => {
    try {
      const reqUserId = req.params.id
      const user = await User.findByPk(reqUserId, {
        include: {
          model: Tweet,
          include: [{ model: Reply }, { model: User }, { model: Like }],
        },
        order: [[{ model: Tweet }, 'createdAt', 'DESC']],
        nest: true
      })
      const userTweets = user.toJSON().Tweets.map(tweet => ({
        ...tweet,
        replyCount: tweet.Replies.length,
        likeCount: tweet.Likes.length,
        isLiked: tweet.Likes.some(like => like.UserId === helpers.getUser(req).id)
      }))
      userTweets.forEach(reply => {
        dateFormatter(reply, 8)
      })
      res.status(200).render('partials/tweet', { tweets: userTweets, layout: false })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }

  },
  // 可以改成捲動式版本
  getUserReplies: async (req, res) => {
    try {
      const reqUserId = req.params.id
      const user = await User.findByPk(reqUserId, {
        include: {
          model: Reply,
          include: [
            {
              model: Tweet,
              include: { model: User }
            },
            { model: User }
          ],
        },
        order: [[{ model: Reply }, 'createdAt', 'DESC']],
        nest: true
      })
      const userReplies = user.toJSON().Replies
      userReplies.forEach(reply => {
        dateFormatter(reply, 8)
      })
      res.status(200).render('partials/tweet-reply', { replies: userReplies, layout: false })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },
  getUserLikes: async (req, res) => {
    try {
      const reqUserId = req.params.id
      let user = await User.findByPk(reqUserId, {
        include: [
          {
            model: Like, include:
            {
              model: Tweet,
              include: [{ model: Reply }, { model: Like }, { model: User }]
            }
          },
          { model: User, as: 'Followers' },
          { model: User, as: 'Followings' }
        ],
        nest: true
      })
      user = user.toJSON()
      user.Likes.sort((a, b) => b.createdAt - a.createdAt)
      const likedTweets = user.Likes.map(like => ({
        ...like.Tweet,
        replyCount: like.Tweet.Replies.length,
        likeCount: like.Tweet.Likes.length,
        isLiked: like.Tweet.Likes.some(like => like.UserId === helpers.getUser(req).id)
      }))


      likedTweets.forEach(reply => {
        dateFormatter(reply, 8)
      })

      user.followerCount = user.Followers.length
      user.followingCount = user.Followings.length

      res.status(200).render('partials/tweet', { tweets: likedTweets, layout: false })
    } catch (error) {

      res.status(500).json({
        error: error.message
      })
    }
  },
  getUserFollowers: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: {
          model: User,
          as: 'Followers',
          include: { model: User, as: 'Followers' }
        },
        nest: true
      })
      if (!user) throw new Error('User not found')
      const followers = user.toJSON().Followers

      followers.forEach(follower =>
        follower.isFollowed = follower.Followers.some(fr => fr.id === helpers.getUser(req).id)
      )

      followers.sort((a, b) => b.Followship.createdAt - a.Followship.createdAt)

      res.status(200).render('partials/user-followship', { users: followers, layout: false })
    } catch (error) {

      res.status(500).json({
        error: error.message
      })
    }
  },
  getUserFollowings: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: {
          model: User,
          as: 'Followings',
          include: { model: User, as: 'Followers' }
        },
        nest: true
      })

      if (!user) throw new Error('User not found')

      const followings = user.toJSON().Followings
      followings.forEach(following =>
        following.isFollowed = following.Followers.some(fr => fr.id === helpers.getUser(req).id)
      )
      followings.sort((a, b) => b.Followship.createdAt - a.Followship.createdAt)

      res.status(200).render('partials/user-followship', { users: followings, layout: false })
    } catch (error) {

      res.status(500).json({
        error: error.message
      })
    }
  },
  editUserPage: async (req, res, next) => {
    try {
      const check = helpers.getUser(req).id === Number(req.params.id) ? true : false
      if (!check) return res.json({
        status: 'error',
        message: 'Permission denied!'
      })
      // 根據傳入的id找到對應的使用者
      const user = await User.findOne({ where: { id: req.params.id } })
      if (!user) throw new Error('No such User!')
      // 回傳資料
      return res.json({
        status: 'success',
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        coverage: user.coverage,
        introduction: user.introduction
      })
    } catch (err) {
      next(err)
    }
  },
  editUser: async (req, res, next) => {
    try {
      const check = helpers.getUser(req).id === Number(req.params.id) ? true : false
      if (!check) return res.json({
        status: 'error',
        message: 'Permission denied!'
      })
      const { name, introduction, croppedAvatar, croppedCoverage } = req.body
      if (!name) throw new Error('Name is required!')
      const [user, avatarFilePath, coverageFilePath] = await Promise.all([
        User.findByPk(req.params.id),
        imgurFileHandler(croppedAvatar),
        imgurFileHandler(croppedCoverage)]
      )
      if (!user) throw new Error('Can not find user!')
      const updatedUser = await user.update({
        name,
        introduction,
        avatar: avatarFilePath || user.avatar,
        coverage: coverageFilePath || user.coverage
      })
      return res.json({
        status: 'success',
        id: updatedUser.id,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        coverage: updatedUser.coverage,
        introduction: updatedUser.introduction
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController
