const { modelTraining } = require("../models");

exports.get = async (req, res, next) => {
    try {
        const trainings = await modelTraining.findByAccountId(req.account.id);
        res.status(200).json(trainings);
    } catch (error) {
        next?.(error);
    }
};