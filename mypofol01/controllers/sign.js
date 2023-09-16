// 20230908 #5
const modelAccount = require('../models/account');
const modelProfile = require('../models/profile');

module.exports = {
  login: async (req, res, next) => {
    try {      
      if(req.session.authAccount) {
        res.redirect("/dashboard");
        return;
      }

      const email = req.body.email;
      const password = req.body.password;
      const account = await modelAccount.findByEmailAndPassword(email, password);
      console.log('account >>>>> ' , account);
      if(!account) {
        res.status(200).render('main/signin', {email});

        return;
      }


      /*
      세션 처리 추가
      난 옛날부터 authUser를 사용하지!!
      */
      // 20230910 #7
      // authUser -> authAccount로 이름 바꿈 (이름은 중요 하니깐!)
      // req.session.authUser = account;
      req.session.authAccount = account;

      /*
        1. 로그인을 해달라는 데 왜 프로필 수정 페이지를 보여 주지?
        2. 로그인 성공 후, 프로필 수정 페이지인 대시보드 보여 주는 건 우리 협의 사항으로 맞는데 방식이 틀렸음!
           그 URL로 **리다이렉트** 하는 것이 맞음.
        3. 그 URL이 /dashboard 나 /dashboard/profile 인데, 바로 리다이렉트 하는 것도 좋지 않음.
        4. 왜냐면 로그인 한 후 돌아 댕기다가 사용자가 메인(/)로 접근할 수 있기 때문에 메인(/)으로 리다이렉트 하고 
           메인에서 인증 여부에 따라 메인페이지(/)나 /dashboard(또는 /dashboard/profile)로 분기 시켜야 함
        5. 이 내용이 지금 이해가 안갈 수 있을 것 같은데.... 생각할 수 있어야 함.
      */

      // const profile = await modelAccount.findByName(loginUser.account);
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
      if(req.session.authAccount) {
        res.redirect("/dashboard");
        return;
      }

      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      // 20230908 #1
      // DB insert 작업을 하는 요청인 경우 redirect가 기본임
      // 브라우저의 URL 변화가 없으면 사용자가 새로고침을 계속 하면 디비에 계속 inert 됨
      // 회원 가입 후, /joinsuccess 로 리다이렉트 (아래 joinsuccess 함수 참고)
      // res.status(200).render('sign/joinsuccess');

      // 20230910 #4
      const accountId = await modelAccount.insert(name, email, password);
      await modelProfile.insertByDefault(accountId);

      res.redirect("/joinsuccess");
    } catch (error) {
      next(error);
    }
  },
  // 20230908 #2
  // /joinsuccess handler 추가
  joinsuccess: (req, res, next) => {
      if(req.session.authAccount) {
          res.redirect("/dashboard");
          return;
      }
      res.status(200).render('sign/joinsuccess');
  }    
}