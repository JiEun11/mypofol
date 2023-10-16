const { modelAccount, modelProfile }= require("../models");
const { Account } = require('../models-mongoose');

exports.get = async (req, res, next) => {
    try {
        /**
         *  account name으로 account 정보를 DB에서 가져오는 것은
         *  이미 앞의 validAccount interceptor 에서
         *  validation과 함께 req에 넣어 놨기 때문에
         *  model을 통해서 가져올 필요가 없음.
         */
        res.json(req.account);
    } catch (error) {
        next?.(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const accountId = await modelAccount.insert(req.body);
        await modelProfile.insertByDefault(accountId);

        // result = await Account.create(req.body);

        res.json(null);
    } catch (error) {
        next?.(error);
    }
};
