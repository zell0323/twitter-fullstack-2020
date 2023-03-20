const userController = {
  getUserTweets: (req, res, next) => {
    res.json({ controller: 'getUserTweets' })
  },
  getUserFollowings: (req, res, next) => {
    res.json({ controller: 'getUserFollowings' })
  },
  getUserFollowers: (req, res, next) => {
    res.json({ controller: 'getUserFollowers' })
  },
  getUserLikes: (req, res, next) => {
    res.json({ controller: 'getUserLikes' })
  }
}

module.exports = userController