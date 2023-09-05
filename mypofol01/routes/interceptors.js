const modelUser = require('../models/user');

exports.authorized = (req, res, next) => {
    if(req.session.authUser) {       
        next();
        return;
    } 
    
    res.redirect('/signin');
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
         *  req.locals.account = user;  
         *  이렇게 하면 view 로 바로 넘어가고 다음 핸들러로는 넘어가지 않음! 다음 핸들러에서 account(user) 정보를 사용할 수 있으니깐
         *  아래 처럼!
         *  
         */
        req.account = account;
        next();
    } catch(err){
        next(err);
    }
};
