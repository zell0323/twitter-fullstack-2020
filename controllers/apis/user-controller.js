const db = require('../../models')
const { User } = db
const { imgurFileHandler } = require('../../helpers/file-helpers')

const userController = {
  editUserPage: async (req, res, next) => {
    try {
      // 根據傳入的id找到對應的使用者
      const user = await User.findOne({ where: { id: req.params.id } })
      if (!user) throw new Error('No such User!')
      // 回傳資料
      return res.json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            coverage: user.coverage,
            introduction: user.introduction
          }
        }
      })
    } catch (err) {
      next(err)
    }
  },
  editUser: async (req, res, next) => {
    try {
      if (req.body.croppedAvatar) {
        // https://stackoverflow.com/questions/20512887/imgur-image-uploading-will-not-work-with-base64-data 在上傳前記得把前綴 replace
        const avatarData = req.body.croppedAvatar.replace("data:image/jpeg;base64,", "")
        const avatarFilePath = await imgurFileHandler(avatarData)
        console.log(avatarFilePath)
      }
      if (req.body.croppedCoverage) {
        const coverageData = req.body.croppedCoverage.replace("data:image/jpeg;base64,", "")
        const coverageFilePath = await imgurFileHandler(coverageData)
        console.log(coverageFilePath)
      }

    } catch (err) {
      next(err)
    }

    // res.json({ controller: 'editUser' })
  }
}

module.exports = userController