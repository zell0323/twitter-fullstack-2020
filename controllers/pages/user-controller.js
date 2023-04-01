const bcrypt = require('bcryptjs') //載入 bcrypt
const db = require('../../models')
const helpers = require('../../helpers')
const { User } = db
const userController = {
  registPage: (req, res) => {
    res.render('regist')
  },
  regist: (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')

    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email已被註冊！')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        account: req.body.account,
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => {
        req.flash('success_messages', '成功註冊帳號！')
        res.redirect('/login')
      })
      .catch(err => next(err))
  }, // 新增以下程式碼
  logInPage: (req, res) => {
    res.render('login')
  },
  logIn: (req, res, next) => {
    try {
      req.flash('success_messages', '成功登入！')
      res.redirect('/main')
    } catch (err) {
      next(err)
    }
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/login')
  },
  getUserTweets: (req, res, next) => {
    res.render('user-profile', { Page: 'Tweets' })
  },
  // getUserFollowings: (req, res, next) => {
  //   res.json({ controller: 'getUserFollowings' })
  // },
  // getUserFollowers: (req, res, next) => {
  //   res.json({ controller: 'getUserFollowers' })
  // },
  // getUserLikes: (req, res, next) => {
  //   res.json({ controller: 'getUserLikes' })
  // }
  settingPage: async (req, res, next) => {
    try {
      const loginUser = helpers.getUser(req).id
      // console.log(loginUser.id)
      const findUser = await User.findByPk(loginUser.id, { raw: true })
      if (!findUser) throw new Error('Can not find user!')
      return res.render('setting', { findUser })
    } catch (err) {
      next(err)
    }
  },
  setting: async (req, res, next) => {
    try {
      const { account, name, email, password, confirmpassword } = req.body
      if (!account || !name || !email || !password || !confirmpassword) throw new Error('All column is required!')
      if (password !== confirmpassword) throw new Error('Password do not match to confirm password')
      const loginUser = helpers.getUser(req).id
      const user = await User.findByPk(loginUser.id)
      if (!user) throw new Error('Cannot find user!')
      await user.update({
        account,
        name,
        email,
        password
      })
      req.flash('success_messages', '使用者資料編輯成功')
      res.redirect(`/`)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController