const modelAccount = require("../models/account");
const modelProfile = require("../models/profile");

exports.create = async (req, res, next) => {
    try {
        const accountId = await modelAccount.insert(req.body);
        await modelProfile.insertByDefault(accountId);
        res.json(null);
    } catch (error) {
        next?.(error);
    }
};
