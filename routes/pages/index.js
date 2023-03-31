const express = require('express')
const router = express.Router()
const userController = require('../../controllers/pages/user-controller')
const mainPageController = require('../../controllers/pages/mainPage-controller')
const { generalErrorHandler } = require('../../middleware/error-handler')
const passport = require('../../config/passport')
// 瀏覽貼文頁面 GET /users/:id/tweets
router.get('/users/:id/tweets', userController.getUserTweets)
// 顯示所有追蹤的人的資訊 GET /users/:id/followings
// router.get('/users/:id/followings', userController.getUserFollowings)
// // 顯示所有被追蹤的資訊 GET /users/:id/followers
// router.get('/users/:id/followers', userController.getUserFollowers)
// // 顯示使用者喜愛的貼文清單 GET /users/:id/likes
// router.get('/users/:id/likes', userController.getUserLikes)

//admin routes 
const admin = require('./modules/admin')
router.use('/admin', admin)

//normal users
//regist
router.get('/regist', userController.registPage)
router.post('/regist', userController.regist)

// login & logout
router.get('/login', userController.logInPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.logIn) // 注意是 post
router.get('/logout', userController.logout)

// setting
router.get('/setting', userController.settingPage)
router.post('/setting', userController.setting)

//main page
router.get('/main', mainPageController.getMainPage)

router.use('/', (req, res) => res.redirect('/main'))
router.use('/', generalErrorHandler)

module.exports = router
