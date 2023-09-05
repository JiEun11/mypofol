module.exports = {
    index: (req, res, next) => {
        /**
         * 
         * 인증이 되어 있는 경우 접근하면 /dashboard(/dashboard/profile)로 리다이렉트 하는 핸들러야
         * / 뿐만 아니라 밑에 /signin, /signup 에도 있고 
         * sign.js 모듈에 있는 /login, /join 도 같이 해야 함
         * 
         * 여기서!
         * 
         * 1. sign.js와 main.js 를 합하면 좋지 않을까?
         * 2. 똑같은 처리를 핸들러 앞에서 하면 인터셉터를 쓰는 거지. 바로 이런 경우지!! 반대의 경우 인터셉터 authorized(interceptors.js) 만들어 놓았으니깐 참고해서 함 해바라~
         * 3. 이름? nonAuthorized?
         * 4. 정리하면
         *    authorized
         *    - 인증을 하고 접근해야 하는 데 안한 경우 /sigin으로 리다이렉트
         * 
         *    nonAuthorized
         *    - 인증을 안하고 접근해야 하는 데 한 경우 /dashboard로 리다이렉트
         */
        if(req.session.authUser) {
            res.redirect("/dashboard");
            return;
        }
        res.status(200).render('main/index');
    },
    signin: (req, res, next) => {
        if(req.session.authUser) {
            res.redirect("/dashboard");
            return;
        }
        res.status(200).render('main/signin');
    },
    signup: (req, res, next) => {
        if(req.session.authUser) {
            res.redirect("/dashboard");
            return;
        }
        res.status(200).render('main/signup');
    }    
}