const express = require('express')
const router = express.Router()
const userController = require('../../controllers/apis/user-controller')
const { apiErrorHandler } = require('../../middleware/error-handler')
const upload = require('../../middleware/multer')

// 瀏覽編輯使用者頁面 GET /api/users/:id
router.get('/users/:id', userController.editUserPage)
// 更新使用者的資訊 POST /api/users/:id, upload.single('image')
router.post('/users/:id', upload.fields([
  { name: 'name', maxCount: 1 },
  { name: 'introduction', maxCount: 1 },
  { name: 'croppedAvatar', maxCount: 1 },
  { name: 'croppedCoverage', maxCount: 1 }
]), userController.editUser)
router.use('/', apiErrorHandler)
module.exports = router