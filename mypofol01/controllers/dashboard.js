const modelProfile = require('../models/profile');
module.exports = {
  profile: async (req, res, next) => {
    try {
      const profile = await modelProfile.findByAccountId(req.session.authAccount.id);
      res.status(200).render('dashboard/profile', {
        profile
      });
    } catch (error) {
      next(error);
    }
    // 20230911 #1   
    // res.status(200).render('dashboard/profile');
  },
  updateProfile: async (req, res, next) => {
    try {
      console.log('update >>>>> ', req.body.profile);

      //
      // 20230911 #2 (for using named-placeholders)
      //

      // const accountId = req.session.authAccount.id;
      // const profile = req.body.profile;        
      // const update = await modelProfile.updateByDefault(accountId, profile);

      // 
      // req.body.profile를 수정 하지 않고 clone 뜨고 accountId를 추가 하기 위해 Object.assign를 사용
      // 
      // const profile = req.body.profile;
      // profile.accountId = req.session.authAccount.id;
      //
      // 이래도 되지만, req.body를 수정하는 것은 좋아 보이지 않음
      //  
      //  a = Object.assign(b, c)
      //  a = b + c
      // 

      const profile = Object.assign(req.body.profile, {
        accountId: req.session.authAccount.id
      });
      const update = await modelProfile.updateByDefault(profile);

      console.log("update value >>>> ", update);
      // 여기가 맞지!!
      res.redirect('/dashboard');
    } catch (error) {
      next(error);
    }
    
    // res.redirect('/dashboard');  // update도 insert처럼 redirect가 맞는거겠지요,,?
                                    // 어! 맞는데 위치가 이상하다!
                                    // 에러 난 경우, catch 문 안으로 들어 갔다 실행 될 수 있쟎어?
                                    // 에러 난 경우, 여기서 리다이렉트 하면, 리다이렉트 응답이랑 에러페이지 html 응답이 함께 나가기 오류 날 꺼 같은데???? ㅋ;;;;
    // res.status(200).render('/dashboard');
  },
  experiences: (req, res, next) => {
    res.status(200).render('dashboard/experiences');
  },
  educations: (req, res, next) => {
    res.status(200).render('dashboard/educations');
  },
  trainings: (req, res, next) => {
    res.status(200).render('dashboard/trainings');
  },
  skills: (req, res, next) => {
    res.status(200).render('dashboard/skills');
  }
}