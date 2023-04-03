const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const { User, Like } = require('../models')

// customize user field
const userField = {
  usernameField: 'account',
  passwordField: 'password',
  passReqToCallback: true
}

// authenticate user
const authenticatedUser = (req, account, password, cb) => {
  User.findOne({ where: { account } })
    .then(user => {
      if (!user) return cb(null, false, req.flash('error_messages', '帳號不存在！'))
      bcrypt.compare(password, user.password).then(res => {
        if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
        return cb(null, user)
      })
    })
}

// set up Passport strategy
passport.use('user-local', new LocalStrategy(userField, authenticatedUser))

// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  return User.findByPk(id, {
    include: [
      { model: Like },
      { model: User, as: 'Followings' },
      { model: User, as: 'Followers' }
    ],
  })
    .then(user => cb(null, user.toJSON()))
    .catch(err => cb(err))
})

module.exports = passport
