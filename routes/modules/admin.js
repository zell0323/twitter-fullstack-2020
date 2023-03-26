const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
router.get('/admin_main', adminController.getMainPage)
router.use('/', (req, res) => res.redirect('/admin/admin_main'))
module.exports = router