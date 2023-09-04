const modelUser = require('../models/user');

module.exports = {
  login: async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const loginUser = await modelUser.findByEmailPassword(email, password);

      if(!loginUser){
        res.status(404).render('main/signin', {email});
        return;
      }
      const profile = await modelUser.findByAccount(loginUser.account);
      console.log("profile >>> ", profile);
      res.status(200).render('dashboard/profile', {profile});
    } catch (error) {
      next(error);
    }
      
  },
  join: async (req, res, next) => {
    try {
      const account = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      const createdUser = await modelUser.insert(account, email, password);
      console.log("createdUser 성공??? " , createdUser);
      res.status(200).render('sign/joinsuccess');
    
    } catch (error) {
      next(error);
    }
  }    
}