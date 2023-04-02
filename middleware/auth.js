const { ensureAuthenticated, getUser } = require('../_helpers.js')
const authenticated = (req, res, next) => {
  // if (req.isAuthenticated)
  if (ensureAuthenticated(req)) {
    if (getUser(req).role=="regular") return next()
    res.redirect('/login')
    
  }
  res.redirect('/login')
}
const authenticatedAdmin = (req, res, next) => {
  // if (req.isAuthenticated)
  if (ensureAuthenticated(req)) {
    if (getUser(req).role=="admin") return next()
    res.redirect('/admin')
  } else {
    res.redirect('/admin')
  }
}
module.exports = {
  authenticated,
  authenticatedAdmin
}