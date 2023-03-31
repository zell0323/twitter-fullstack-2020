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
      const { name, introduction, croppedAvatar, croppedCoverage } = req.body
      if (!name) throw new Error('Name is required!')
      // console.log(name, introduction)
      // Upload image to imgur
      const [user, avatarFilePath, coverageFilePath] = await Promise.all([
        User.findByPk(req.params.id),
        imgurFileHandler(croppedAvatar),
        imgurFileHandler(croppedCoverage)]
      )
      console.log(avatarFilePath)
      console.log(coverageFilePath)
      if (!user) throw new Error('Can not find user!')
      const updatedUser = await user.update({
        name,
        introduction,
        avatar: avatarFilePath || user.avatar,
        coverage: coverageFilePath || user.coverage
      })
      return res.json({
        status: 'success',
        data: {
          user: {
            id: updatedUser.id,
            name: updatedUser.name,
            avatar: updatedUser.avatar,
            coverage: updatedUser.coverage,
            introduction: updatedUser.introduction
          }
        }
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController