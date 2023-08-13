const modelExperience = require("../models/experience");

module.exports = {
    experiences: async (req, res, next) => {
        try {
            const experiences = await modelExperience.findByUserId(req.params.userId);

            res
            .status(200)
            .send({
                result: 'success',
                data: experiences,
                message: null
            });

        } catch(err){
            next(err);
        }
    }
}