const modelUser = require('../models/user');

module.exports = {
  signin: (req, res, next) => {
      res.status(200).render('main/signin');
  },
  join: async (req, res, next) => {
    try {
      console.log('req >>>> ', req.body)
      const account = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const createdUser = await modelUser.createUserInfo(account, email, password);
      console.log("createdUser 성공??? " , createdUser);
      res.status(200).render('sign/joinsuccess');
    } catch (error) {
      next(error);
    }
  }    
}