const passport = require('passport')
const LocalStrategy = require('passport-local')
// const passportJWT = require('passport-jwt')
// const JWTStrategy = passportJWT.Strategy
// const ExtractJWT = passportJWT.ExtractJwt
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
// set up Passport strategy
passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'account',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  (req, account, password, cb) => {
    User.findOne({ where: { account } })
      .then(user => {
        if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
        bcrypt.compare(password, user.password).then(res => {
          if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
          return cb(null, user)
        })
      })
  }
))
// // set up Passport JWT strategy
// const jwtOptions = {
//   secretOrKey: process.env.JWT_SECRET,
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
// }
// passport.use(new JWTStrategy(jwtOptions, (jwt_payload, cb) => {
//   console.log('Start')
//   console.log(jwt_payload)
//   User.findByPk(jwt_payload.id)
//     .then(user => {
//       console.log(user)
//       cb(null, user)
//     })
//     .catch(err => {
//       console.log(err)
//       cb(err)
//     })
// }))
// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id).then(user => {
    user = user.toJSON()
    //console.log(user)  //暫時添加
    return cb(null, user)
  })
})
module.exports = passport