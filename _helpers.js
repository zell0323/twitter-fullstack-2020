const getUser = req => {
  return req.user || null
}

const ensureAuthenticated = req => {
  return req.isAuthenticated()
}
module.exports = {
  getUser,
  ensureAuthenticated
}

//這個檔案有重寫過，因為認證問題。並被routes/index以及routes/modules/admin引用