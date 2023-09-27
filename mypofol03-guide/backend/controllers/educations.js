const modelProfile = require("../models/profile");

const modelEducation = require("../models/education");

exports.get = async (req, res, next) => {
    try {
        const educations = await modelEducation.findByAccountId(req.account.id);
        res.json(educations);
    } catch (error) {
        next?.(error);
    }
};