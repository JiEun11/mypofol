const { modelProfile } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const profile = await modelProfile.findByAccountId(req.account.id);
    res.json(profile);
  } catch (error) {
    next?.(error);
  }
};

