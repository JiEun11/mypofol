const modelUser = require("../models/user");

exports.ValidAccount = async (req, res, next) => {
    try {
        const user = await modelUser.findById(req.params.userId);

        if(!user) {
            res.status(401).send({
                result: "fail",
                data: null,
                message: "User's Account Not Exist"
            });

            return;
        }

        next();

    } catch(err){
        next(err);
    }
};