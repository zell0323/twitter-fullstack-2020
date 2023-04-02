const { Tweet, User ,Followship, Like} = require('../models')
const Handlebars=require('handlebars')
Handlebars.registerHelper('relativeTime', function (value) {
  const date = new Date();
      const timestamp = date.getTime();
      const seconds = Math.floor(timestamp / 1000);
      const valueTimestamp = value.getTime();
      const valueSeconds = Math.floor(valueTimestamp / 1000);
      const difference = seconds - valueSeconds;
      let output = ``;
      if (difference < 60) {
          
          output = `${difference} seconds ago`;
      } else if (difference < 3600) {
          output = `${Math.floor(difference / 60)} 分鐘`;
      } else if (difference < 86400) {
          output = `${Math.floor(difference / 3600)} 小時`;
      } else if (difference < 2620800) {
          output = `${Math.floor(difference / 86400)} 天`;
      } else if (difference < 31449600) {
          output = `${Math.floor(difference / 2620800)} 月`;
      } else {
          output = `${Math.floor(difference / 31449600)} 年`;
      }
      
  return output;
});

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
  getMainPage: (req, res,next) => {

      
      Tweet.findAll({
        raw: true,
        nest: true, 
        include: [User]
      })
      .then(tweets => {
        //console.log(tweets)
        res.render('admin/admin_main', { tweets })
      })
      .catch(err => next(err))

    },
  getUsers:(req,res, next)=>{
     User.findAll({
        where:{role:'regular'},
        include:[
          {model:Tweet},
          { model: User, as: 'Followers' },
          { model: User, as: 'Followings' },
        ]
      })
      .then(users => {
        const result = users.map(user => ({
          
          ...user.toJSON(),
          tweetCount: user.Tweets.length,
          followerCount:user.Followers.length,
          followingCount:user.Followings.length
        }))
        console.log( result)
        res.render('admin/admin_users', {users:result})
      })
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