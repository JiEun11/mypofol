const express = require('express');
const controllerMain = require('../controllers/main');
const controllerSign = require('../controllers/sign')
const controllerDashboard = require('../controllers/dashboard');
const controllerAccount = require('../controllers/account');
const {authorized, validAccount} = require('./interceptors');

const router = express.Router();
//
// 회 먹는다고 좋아서 안 바꾼거 주석 -_-;;;
// validAccount 로 바꿈
//
// const interceptorOnlyBella = async (req, res, next) => {
//     if(req.params.account !== 'bella') {
//         res.status(200).render('error/404');
//         return;
//     }    
//     next();
// };
// -> dasgboard/profile 작업해보려다가 볼 수록 헷갈려가지고
// 흐름 타고 타고 보는 중이에요,,,
//

router.get('/', controllerMain.index);
router.get('/signin', controllerMain.signin);
router.get('/signup', controllerMain.signup);

// 20230908 #2
// /joinsuccess 추가
router.get('/joinsuccess', controllerSign.joinsuccess);
router.post('/join', controllerSign.join);
router.post('/login', controllerSign.login);

// 1. 만약 dashboard에서는 자기꺼만 수정가능이므로 필요한 것들은 authorized의 session안에 정보들을 뽑아쓰면 되는거고
//    굳이 validAccount 해줄 필요가 없어서 없는 것임 => 이해한게 맞을까요,,?
// 2. 아 근데 dashboard profile에서 이름,이메일,자기소개,거주지,SNS 결국 user table들의 정보들을 다 가져와서 보여주고
//    upsert 해줘야하면 controllerDashboard.profile에서 modelUser 불러서 유저정보들 한번 더 가져오는게
//    일반적인지 아니면 session의 authUser 값들을 보여주는게 일반적인지 궁금합니다
// --> 지금 운영 코드 생각해보니 session에서 필요값들 뽑아서 API로 컴포넌트마다 필요한 값들 가져오게 되어있는게 대부분인 것 같고
// session에 있는 값들을 그대로 state 만들어서 넣어주는 애들도 있는 거 같아요!!
// 3. 저도 session에 있는 값들로 model.user의 findByAccount 한번 더 써서 해주는게 더 나으려나요?

/*
답변

1. 일단 디비 스키마를 바바
   user 와 profile로 나누어 놨지? (멀티 프로필 지원)

2.   
/{사용자계정}/profile (또는 /{사용자계정})
/dashboard/profile (또는 /dashboard)
여긴 profile 테이블과 연관 있고

3.
user 테이블의 내용은
req.session.authUser
req.account
와 연관이 있어

4.
req.session.authUser
는 로그인 사용자의 정보로 주로 헤더나 오른쪽 sliding 메뉴에 보여지는 정보가 되고

req.account
는 /{사용자계정} 에 접근할 때 외쪽 sidebar의 보여지는 정보가 됨

5.
github랑 비슷해
니가 로그인하고 내 계정으로 왔을 때랑 똑같어
mypofol에서도 회원가입하고 로그인 한 후, /bella 로 가바 (bella는 회원 가입 필요없이 거의 모든 정보가 있는 테스트 계정으로 SQL로 때려 넣은 계정)

5.
req.session.authUser 즉 세션에 저장할 내용은 최소 여야 해.
id(PK) 정도가 이상적이지만 헤더나 오른쪽 sliding 메뉴에 보여 지는 정보를 매번 디비에 접근해서 가져오면 부담이니
id, account, name, email, image_profile 이 정도만 세션에 저장 한거지!(email은 필요 없을 꺼 같넹? 빼주고...)
리액트로 프론트엔드를 만들면 로그인 할 때 프론트엔드로 저 정보를 던져 주면 되니깐 그 때 백엔드(노드)의 세션에 id 정도만 저장하면 될 꺼 같고

6. profile은 아까도 말했지만
/{사용자계정}/profile (또는 /{사용자계정})
/dashboard/profile (또는 /dashboard)
접근할 때만 디비에서 가져 오면 됨

/{사용자계정}/profile 일 땐 req.account 에서 id 가져와서 profile model에서 프로필 정보 가져오면 되고
/dashboard/profile 일 땐 req.session.authUser 에서 id 가져와서 profile model에서 프로필 정보 가져오면 되고

*/

router.get('/dashboard', authorized, controllerDashboard.profile);
router.get('/dashboard/profile', authorized, controllerDashboard.profile);
router.post('/dashboard/updateProfile', authorized, controllerDashboard.updateProfile);
router.get('/dashboard/experiences', authorized, controllerDashboard.experiences);
router.get('/dashboard/educations', authorized, controllerDashboard.educations);
router.get('/dashboard/trainings', authorized, controllerDashboard.trainings);

router.get('/:account', validAccount, authorized, controllerAccount.profile);
router.get('/:account/profile', validAccount, authorized, controllerAccount.profile);
router.get('/:account/experiences', validAccount, authorized, controllerAccount.experiences);
router.get('/:account/educations', validAccount, authorized, controllerAccount.educations);
router.get('/:account/trainings', validAccount, authorized, controllerAccount.trainings);
router.get('/:account/skills', validAccount, authorized, controllerAccount.skills);
router.get('/:account/projects', validAccount, authorized, controllerAccount.projects);

exports.dispatcher = router;