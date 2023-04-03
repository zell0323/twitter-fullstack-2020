const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const adminController = require('../../../controllers/pages/admin-controller')
router.get('/admin_main', adminController.getMainPage)
//須補"後台登入"
router.use('/', (req, res) => res.redirect('/admin/admin_main'))
=======
const adminController = require('../../../controllers/pages/admin/admin-controller')



router.delete('/tweets/:id', adminController.deleteTweet)
router.get('/tweets', adminController.adminTweets)
router.get('/users', adminController.adminUsers)

router.use('/', (req, res) => res.redirect('/tweets'))
>>>>>>> 84023c03d51fd46a11f8282f96e5b1c085dae151
module.exports = router