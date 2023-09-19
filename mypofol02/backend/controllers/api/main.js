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
  }
};
