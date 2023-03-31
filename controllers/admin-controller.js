const { Tweet } = require('../models')
const adminController = {
  deleteTweet: (req, res, next) => {
    
    return Tweet.findByPk(req.params.id)
      .then(tweets => {
        if (!tweets) throw new Error("tweets didn't exist!")
        return tweets.destroy()
      })
      .then(() => res.redirect('/admin/admin_main'))
      .catch(err => next(err))
    },
    getMainPage: (req, res) => {
      Tweet.findAll({
        raw: true
      })
      .then(tweets => res.render('admin/admin_main', { tweets }))

      .catch(err => next(err))

    },
    loginPage: (req,res)=>{
      return res.render('admin/login') 
    },
    logIn: (req, res) => {
      req.flash('success_messages', '後台成功登入！')
      res.redirect('/admin/admin_main')
    }
  }
  module.exports = adminController