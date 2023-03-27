const db = require('../../models')
const { User } = db

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
  editUser: (req, res, next) => {
    res.json({ controller: 'editUser' })
  }
}

module.exports = userController