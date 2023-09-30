const { modelExperience } = require("../models");

exports.get = async (req, res, next) => {
    try {
        const experiences = await modelExperience.findByAccountId(req.account.id);
        res.json(experiences);
    } catch (error) {
        next?.(error);
    }
};