const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const { authenticatedAdmin } = require('../../middleware/auth') 

router.get('/admin_main', authenticatedAdmin, adminController.getMainPage)
router.delete('/admin_main/:id', adminController.deleteTweet)
router.get('/admin_users', authenticatedAdmin, adminController.getUsers)

router.use('/', (req, res) => res.redirect('/admin/admin_main'))
module.exports = router