const express = require('express')
const router = express.Router()
const userController = require('../../controllers/pages/user-controller')

// 瀏覽貼文頁面 GET /users/:id/tweets
router.get('/users/:id/tweets', userController.getUserTweets)
// 顯示所有追蹤的人的資訊 GET /users/:id/followings
router.get('/users/:id/followings', userController.getUserFollowings)
// 顯示所有被追蹤的資訊 GET /users/:id/followers
router.get('/users/:id/followers', userController.getUserFollowers)
// 顯示使用者喜愛的貼文清單 GET /users/:id/likes
router.get('/users/:id/likes', userController.getUserLikes)

module.exports = router
