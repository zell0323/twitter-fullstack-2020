const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const { authenticatedAdmin } = require('../../middleware/auth') 

router.get('/admin_main', authenticatedAdmin, adminController.getMainPage)
//須補"後台登入"
router.use('/', (req, res) => res.redirect('/admin/admin_main'))
module.exports = router