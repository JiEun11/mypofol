const modelUser = require("../models/user");

module.exports = {
    index: (req, res, next) => {
        res.status(200).render('main/index');
    },
    accountHome: async (req, res, next) => {
       try {
            const profile = await modelUser.findByAccount(req.params.account);

            if(!profile) {
                res.status(404).render('error/404');
                return;
            }

            res.status(200).render('main/accountHome', {
                profile
            });
       } catch(err){
            next(err);
        }
    }
}