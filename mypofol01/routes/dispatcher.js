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
//

router.get('/', controllerMain.index);
router.get('/signin', controllerMain.signin);
router.get('/signup', controllerMain.signup);
router.post('/join', controllerSign.join);
router.post('/login', controllerSign.login);

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