const modelAccount = require('../models/account');

exports.validAccount = async (req, res, next) => {
    try {
        const account = await modelAccount.findByName(req.params.accountName);
        if (!account) {
            throw new Error(`Invalid Account(${req.params.accountName})`);
        }

        req.account = account;
        next?.();

    } catch (error) {
        next?.(error);
    }
};