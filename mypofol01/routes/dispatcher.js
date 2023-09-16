const express = require('express');
const controllerMain = require('../controllers/main');
const controllerSign = require('../controllers/sign')
const controllerDashboard = require('../controllers/dashboard');
const controllerAccount = require('../controllers/account');
const {authorized, validAccount} = require('./interceptors');

const router = express.Router();

router.get('/', controllerMain.index);
router.get('/signin', controllerMain.signin);
router.get('/signup', controllerMain.signup);

router.get('/joinsuccess', controllerSign.joinsuccess);
router.post('/join', controllerSign.join);
router.post('/login', controllerSign.login);

router.get(['/dashboard', '/dashboard/profile'], authorized, controllerDashboard.profile);
router.post('/dashboard/updateProfile', authorized, controllerDashboard.updateProfile);
router.get('/dashboard/experiences', authorized, controllerDashboard.experiences);
router.get('/dashboard/educations', authorized, controllerDashboard.educations);
router.get('/dashboard/trainings', authorized, controllerDashboard.trainings);
router.get('/dashboard/projects', authorized, controllerDashboard.projects);

router.get(['/:account', '/:account/profile'], validAccount, authorized, controllerAccount.profile);
router.get('/:account/experiences', validAccount, authorized, controllerAccount.experiences);
router.get('/:account/educations', validAccount, authorized, controllerAccount.educations);
router.get('/:account/trainings', validAccount, authorized, controllerAccount.trainings);
router.get('/:account/skills', validAccount, authorized, controllerAccount.skills);
router.get('/:account/projects', validAccount, authorized, controllerAccount.projects);

exports.dispatcher = router;