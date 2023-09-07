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
router.post('/join', controllerSign.join);
router.post('/login', controllerSign.login);

// 만약 dashboard에서는 자기꺼만 수정가능이므로 필요한 것들은 authorized의 session안에 정보들을 뽑아쓰면 되는거고
// 굳이 validAccount 해줄 필요가 없어서 없는 것임 => 이해한게 맞을까요,,?
// 아 근데 dashboard profile에서 이름,이메일,자기소개,거주지,SNS 결국 user table들의 정보들을 다 가져와서 보여주고
// upsert 해줘야하면 controllerDashboard.profile에서 modelUser 불러서 유저정보들 한번 더 가져오는게
// 일반적인지 아니면 session의 authUser 값들을 보여주는게 일반적인지 궁금합니다
router.get('/dashboard', authorized, controllerDashboard.profile);
router.get('/dashboard/profile', authorized, controllerDashboard.profile);
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