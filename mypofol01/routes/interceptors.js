const modelUser = require('../models/user');

exports.authorized = (req, res, next) => {
    if(!req.session.authUser) {       
        res.redirect('/signin');   
        return;
    } 

    next();
}

exports.validAccount = async (req, res, next) => {
    try {
        const account = await modelUser.findByAccount(req.params.account);
        if(!account) {
            res.status(404).render('error/404');
            return;
        }

        /**
         *  
         *  존재하는 계정인지 확인하고 계정(user)정보를 뽑아서 다음 핸들러나 view에 req.account 객체로 자동으로 전달함
         *  view에 전달된 req.account는 주로 화면의 왼쪽 /includes/account/sidebar 렌더링에 
         *  
         */
        req.account = account;
        
        next();
    } catch(err){
        next(err);
    }
};
