const modelUser = require('../models/user');

module.exports = {
  login: async (req, res, next) => {
    try {
      
      /**
       * 인증이 되어 있는 경우 접근하면 /dashboard(/dashboard/profile)로 리다이렉트
       */
      if(req.session.authUser) {
        res.redirect("/dashboard");
        return;
      }

      const email = req.body.email;
      const password = req.body.password;
      const loginUser = await modelUser.findByEmailPassword(email, password);

      if(!loginUser) {
        /*
        사용자가 이메일과 비밀번호가 잘못 되었는데 왜 404 Not Found?
        email과 함께 다시 로인 폼 보여주기
        */
        // res.status(404).render('error/404');
        res.status(200).render('main/signin', {email});

        return;
      }


      /*
      세션 처리 추가
      난 옛날부터 authUser를 사용하지!!
      */
      req.session.authUser = loginUser;

      /*
        1. 로그인을 해달라는 데 왜 프로필 수정 페이지를 보여 주지?
        2. 로그인 성공 후, 프로필 수정 페이지인 대시보드 보여 주는 건 우리 협의 사항으로 맞는데 방식이 틀렸음!
           그 URL로 **리다이렉트** 하는 것이 맞음.
        3. 그 URL이 /dashboard 나 /dashboard/profile 인데, 바로 리다이렉트 하는 것도 좋지 않음.
        4. 왜냐면 로그인 한 후 돌아 댕기다가 사용자가 메인(/)로 접근할 수 있기 때문에 메인(/)으로 리다이렉트 하고 
           메인에서 인증 여부에 따라 메인페이지(/)나 /dashboard(또는 /dashboard/profile)로 분기 시켜야 함
        5. 이 내용이 지금 이해가 안갈 수 있을 것 같은데.... 생각할 수 있어야 함.
      */

      // const profile = await modelUser.findByAccount(loginUser.account);
      // console.log("profile >>> ", profile);
      // res.status(200).render('dashboard/profile', {profile});

      res.redirect('/');

    } catch (error) {
      next(error);
    }
      
  },
  join: async (req, res, next) => {
    try {
      /**
       * 인증이 되어 있는 경우 접근하면 /dashboard(/dashboard/profile)로 리다이렉트
       */
      if(req.session.authUser) {
        res.redirect("/dashboard");
        return;
      }

      const account = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      await modelUser.insert(account, email, password);
      res.status(200).render('sign/joinsuccess');
    
    } catch (error) {
      next(error);
    }
  }    
}