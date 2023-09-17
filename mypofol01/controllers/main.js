const modelAccount = require('../models/account');
const modelProfile = require('../models/profile');

module.exports = {
  index: (req, res, next) => {
    res.status(200).render('main/landing', { theme: '' });
  },

  welcome: (req, res, next) => {
    res.status(200).render('main/landing', { theme: 'welcome' });
  },

  signout: async (req, res, next) => {
    try {
      await req.session.destroy();
      res.redirect('/');
    } catch (error) {
      next && next(error)
    }
  },

  auth: async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const authAccount = await modelAccount.findByEmailAndPassword(email, password);

      if (!authAccount) {
        res.status(200).render('main/landing', { theme: '', email });
        return;
      }
      req.session.authAccount = authAccount;
      res.redirect('/');
    } catch (error) {
      next && next(error);
    }
  },
}