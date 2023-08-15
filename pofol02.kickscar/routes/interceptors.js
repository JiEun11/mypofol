const modelUser = require("../models/user");

exports.ValidAccount = async (req, res, next) => {
    try {
        const user = await modelUser.findById(req.params.userid);

        if(!user) {
            res
            .status(400)
            .json(new Error("User's Account Not Exist"))
            return;
        }

        next();
    } catch(err){
        next(err);
    }
};

exports.Delay1Second = async (req, res, next) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 0));
        next();
    } catch(err){
        next(err);
    }
};