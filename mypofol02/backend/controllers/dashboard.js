const { modelProfile } = require("../../models");
const fs = require('fs');
const path = require('path');

module.exports = {
  profile: async (req, res, next) => {
    try {
      const profile = await modelProfile.findByAccountId(
        req.session.authAccount.id
      );
      console.log('profile >>> ', profile);
      res.status(200).render("dashboard/profile", {
        profile,
      });
    } catch (error) {
      next(error);
    }
  },
}