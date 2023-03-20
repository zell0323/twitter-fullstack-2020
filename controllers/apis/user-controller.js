// not edit yet
const userController = {
  editUserPage: (req, res, next) => {
    res.json({ controller: 'editUserPage' })
  },
  editUser: (req, res, next) => {
    res.json({ controller: 'editUser' })
  }
}

module.exports = userController