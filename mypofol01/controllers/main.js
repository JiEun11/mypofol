const modelAccount = require('../models/account');
const modelProfile = require('../models/profile');

module.exports = {
    index: (req, res, next) => {
        if(req.session.authAccount) {
            next && next();
            return;
        }
        res.status(200).render('main/landing', {theme: ''});
    },

    welcome: (req, res, next) => {
      res.status(200).render('main/landing', {theme: 'welcome'});
    },

    signin: (req, res, next) => {
        if(req.session.authAccount) {
            res.redirect("/dashboard");
            return;
        }
        res.status(200).render('main/signin');
    },

    signup: async (req, res, next) => {
      try {
  
        const accountId = await modelAccount.insert(req.body.account);
        await modelProfile.insertByDefault(accountId);
  
        res.redirect("/welcome");
      } catch (error) {
        next && next(error);
      }
    },  
    signout : async (req, res, next) => {
      try {
        await req.session.destroy();
        res.redirect('/')
      } catch (error) {
        next && next(error)
      }
    },

    auth: async (req, res, next) => {
      try {        
        const email = req.body.email;
        const password = req.body.password;
        const authAccount = await modelAccount.findByEmailAndPassword(email, password);

        if(!authAccount) {
          res.status(200).render('main/landing', {theme: '', email });
          return;
        }
        req.session.authAccount = authAccount;  
        res.redirect('/');
      } catch (error) {
        next && next(error);
      }
        
    },
}