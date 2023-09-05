const modelUser = require('../models/user');

exports.authorized = (req, res, next) => {
    console.log(req.session.authUser);

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
         *  있는 계정인지 확인하면서 계정정보를 뽑아서 다음 핸들러나 화면을 그릴 때 사용함!!
         *  그러니깐 중요한 인터셉터임!!
         * 
         *  다음 핸들러에 account(user) 정보를 보냄(화면의 왼쪽 /includes/account/sidebar 여기 그릴 라고!!)
         * 
         *  
         */
        req.account = account;
        next();
    } catch(err){
        next(err);
    }
};
