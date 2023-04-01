const passport = require('../config/passport') // 引入 passport

const authenticated = (req, res, next) => {
  console.log(req.headers.authorization)
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(200).json({ status: 'error', message: 'unauthorized' })
    req.user = user
    next()
  })(req, res, next)
  // const middleware = passport.authenticate('jwt', { session: false }, (err, user) => {
  //   if (err || !user) return res.status(401).json({ status: 'error', message: 'unauthorized' })
  //   next()
  // })
  // middleware(req, res, next)
}
module.exports = {
  authenticated
}
