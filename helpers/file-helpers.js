const fs = require('fs')
const imgur = require('imgur')
const { type } = require('os')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
imgur.setClientId(IMGUR_CLIENT_ID)
const localFileHandler = file => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)
    const fileName = `upload/${file.originalname}`
    return fs.promises.readFile(file.path)
      .then(data => fs.promises.writeFile(fileName, data))
      .then(() => resolve(`/${fileName}`))
      .catch(err => reject(err))
  })
}
const imgurFileHandler = file => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)
    console.log('Start')
    imgur.uploadBase64(file)
      .then(img => {
        resolve(img?.link || null) // 檢查 img 是否存在
        return img
      })
      .catch(err => reject(err))
  })
}
module.exports = {
  localFileHandler, // 增加逗點
  imgurFileHandler // 新增這一行
}
