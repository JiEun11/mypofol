const modelAccount = require("../../models/account");
const modelProfile = require("../../models/profile");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const accountId = await modelAccount.insert(req.body);
      await modelProfile.insertByDefault(accountId);

      res.json(null);
    } catch (error) {
      next && next(error);
    }
  },

  signout: async (req, res, next) => {
  },

  auth: async (req, res, next) => {
    try {
      console.log("req >>> ", req.body);
      const email = req.body.email;
      const password = req.body.password;
      const authAccount = await modelAccount.findByEmailAndPassword(
        email,
        password
      );
      
      console.log("authAccount >>> ", authAccount);
      if (!authAccount) {
        res.status(200).render("main/landing", { theme: "", email });
        return;
      }
      req.session.authAccount = authAccount;
      res.status(200).json(authAccount);
    } catch (error) {
      next && next(error);
    }
  }
};
