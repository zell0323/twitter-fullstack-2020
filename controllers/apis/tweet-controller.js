const { User, Tweet, Reply, Like } = require('../../models')
const dateFormatter = require('../../helpers/dateFormatter')
const helpers = require('../../helpers/auth-helper')

const tweetController = {
  getTweet: async (req, res) => {
    try {
      // find tweet by id
      const TweetId = req.params.id
      const tweet = await Tweet.findByPk(TweetId, {
        include: { model: User },
        nest: true
      })
      if (!tweet) throw new Error("Tweet doesn't exist!")

      // modify data's createdAt property
      dateFormatter(tweet.toJSON(), 8)

      // return tweet
      res.status(200).json({
        tweet
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },
  getLikeCount: async (req, res) => {
    try {
      // count likes
      const TweetId = req.params.id
      const likeCount = await Like.count({ where: { TweetId } })

      // return likeCount
      res.status(200).json({
        likeCount
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },
  addLike: async (req, res) => {
    try {
      // find tweet and like
      const UserId = helpers.getUser(req)?.id
      const TweetId = req.params.id
      if (!UserId) throw new Error("Please login first!")
      const [tweet, like] = await Promise.all([
        Tweet.findByPk(TweetId),
        Like.findOne({ where: { UserId, TweetId } })
      ])
      if (!tweet) throw new Error("Tweet doesn't exist!")
      if (like) throw new Error("You've already liked this tweet!")

      // if user hasn't liked the tweet, create a like
      const newLike = await Like.create({ UserId, TweetId })
      const likeCount = await Like.count({ where: { TweetId } })

      // return likeCount and isLiked
      res.status(302).json({
        likeCount,
        isLiked: newLike ? true : false
      })
    } catch (error) {
      res.status(302).json({
        error: error.message
      })
    }
  },
  removeLike: async (req, res) => {
    try {
      // find tweet and like
      const UserId = helpers.getUser(req)?.id
      const TweetId = req.params.id
      if (!UserId) throw new Error("Please login first!")
      const [tweet, like] = await Promise.all([
        Tweet.findByPk(TweetId),
        Like.findOne({ where: { UserId, TweetId } })
      ])
      if (!tweet) throw new Error("Tweet doesn't exist!")
      if (!like) throw new Error("You haven't liked this tweet!")

      // if user has liked the tweet, remove the like
      const isDestroy = await like.destroy()

      // return likeCount and isLiked
      const likeCount = await Like.count({ where: { TweetId } })
      res.status(302).json({
        likeCount,
        isLiked: !isDestroy
      })
    } catch (error) {
      res.status(302).json({
        error: error.message
      })
    }
  },

  postTweet: async (req, res) => {
    try {
      const UserId = helpers.getUser(req)?.id
      const description = req.body.description
      if (!UserId) throw new Error("Please login first!")
      if (!description) throw new Error("The tweet cannot be blank!")
      if (description.length > 140) throw new Error("tweet length limit is 140 characters!")
      const tweet = await Tweet.create({ UserId, description })
      if (!tweet) throw new Error("Tweet failed!")
      res.status(302).json({
        status: "success",
        message: "Tweet successfully!"
      })
    } catch (error) {
      res.status(302).json({
        status: "failure",
        message: error.message
      })
    }
  },
  postReply: async (req, res) => {
    try {
      const UserId = helpers.getUser(req)?.id
      const comment = req.body.comment
      const TweetId = req.params.id
      if (!UserId) throw new Error("Please login first!")
      if (!comment) throw new Error("The reply cannot be blank!")
      if (comment.length > 140) throw new Error("Reply length limit is 140 characters!")
      const tweet = await Tweet.findByPk(TweetId)
      if (!tweet) throw new Error("Tweet doesn't exist!")
      const reply = await Reply.create({ UserId, TweetId, comment })
      if (!reply) throw new Error("Reply failed!")
      res.status(302).json({
        status: "success",
        message: "Reply successfully!"
      })

    } catch (error) {
      res.status(302).json({
        status: "failure",
        message: error.message
      })
    }
  }
}

module.exports = tweetController
