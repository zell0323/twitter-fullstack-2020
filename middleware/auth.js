const helpers = require('../helpers/auth-helper')

const authenticatedRegular = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    if (helpers.getUser(req).role !== 'admin') return next()
    res.redirect('/admin/tweets')
  } else {
    res.redirect('/signin')
  }
}

const authenticatedAdmin = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    if (helpers.getUser(req).role === 'admin') return next()
    res.redirect('/tweets')
  } else {
    res.redirect('/signin')
  }
}

module.exports = {
  authenticatedRegular,
  authenticatedAdmin
}
