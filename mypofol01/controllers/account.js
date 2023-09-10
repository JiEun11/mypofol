const modelUser = require('../models/account');
const modelSkill = require("../models/skill");
const modelProject = require('../models/project');

module.exports = {
    profile: (req, res, next) => {
        res.status(200).render('account/profile');
    },
    experiences: (req, res, next) => {
        res.status(200).render('account/experiences');
    },
    educations: (req, res, next) => {
        res.status(200).render('account/educations');
    },
    trainings: (req, res, next) => {
        res.status(200).render('account/trainings');
    },
    skills: async (req, res, next) => {
      try {
        /**
         *  route(dispatcher.js) 보면 앞에 validAccount 인터셉터가 있다! 그치?
         *  validAccount 구현에 설명 달아 놓았으니 읽어 보고
         * 
         *  쟤 때문에 아래는 할 필요가 없음 req.account에 이 정보가 있음!! --> 봐도봐도 진심 짱이네,, --> ♡
         *  ejs 에서도 참조 가능!! 따라서 따로 세팅해 줄 필요가 없음
         * 
         *  아 참고로...
         *  /bella 여기에 다른 로그인 한 사용자가 접근할 수 있쟎어?
         *  로그인한 사용자랑 헷갈릴 수 있어
         *  /bella 저급 계정의 정보는 account라 했음!!!
         * 
         *  디비가 바껴서 user와 profile은 분리됐다.
         *  꼭 참고해서 바라~~ data-schema-mypofol 폴더 확인해라
         * 
         */        
        // const profile = await modelUser.findByAccount(req.params.account);
        // if(!profile){
        //  res.status(404).render('error/404');
        //  return;
        // }
        // const skills = await modelSkill.findByUserId(req.account.id);
        // res.status(200).render('account/skills', {
        //   account: profile,
        //   skills: skills.reduce((result, skill) => {
        //     (skill.skillSet in result) || (result[skill.skillSet] = [])
        //     result[skill.skillSet].push(skill);
        //     return result;
        //   }, {})
        // });
        
        // 20230910 #9
        const skills = await modelSkill.findByAccountId(req.account.id);
        res.status(200).render('account/skills', {
          skills: skills.reduce((result, skill) => {
            (skill.skillSet in result) || (result[skill.skillSet] = [])
            result[skill.skillSet].push(skill);
            return result;
          }, {})
        });
      } catch (error) {
        /**
         * 빼먹지 말고 꼭 next(err) 그래야 500 에러 페이지 나온다.
         * 에러나면 응답이 안와.... 계속 브라우저 빙글빙글 돈다. --> next()만 해주면 된다고 생각했어여..
         */
        next(error);
      }
        
    },
    projects: async (req, res, next) => {
      try {
        /**
         *  여기도 위와 마찬가지!!!
         *  인터셉터는 많이 쓰는 기능이니깐 꼭 이해 해줘라
         */
        // const profile = await modelUser.findByAccount(req.params.account);
        // if(!profile){
        //  res.status(404).render('error/404');
        //  return;
        // }
        // const projects = await modelProject.findByUserId(req.account.id);
        // res.status(200).render('account/projects', {
        //   account: req.account,
        //   projects
        // });
        
        // 20230910 #8
        const projects = await modelProject.findByAccountId(req.account.id);
        res.status(200).render('account/projects', {
          projects
        });
      } catch(err) {
        next(err);
      }
    }
}