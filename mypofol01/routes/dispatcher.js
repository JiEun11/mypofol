const express = require('express');
const controllerMain = require('../controllers/main');
const controllerDashboard = require('../controllers/dashboard');
const controllerAccount = require('../controllers/account');
const {authorizeNotRequired, authorizeRequired, validAccount} = require('./interceptors');

const router = express.Router();

router.get('/', controllerMain.index, validAccount, controllerAccount.profile);

router.get('/welcome', authorizeNotRequired, controllerMain.welcome);
router.get('/signout', authorizeNotRequired, controllerMain.signout);
router.post('/auth', authorizeNotRequired, controllerMain.auth);
router.post('/signup', authorizeNotRequired, controllerMain.signup);

router.get(['/dashboard', '/dashboard/profile'], authorizeRequired, controllerDashboard.profile);
router.post('/dashboard/updateProfile', authorizeRequired, controllerDashboard.updateProfile);
router.get('/dashboard/experiences', authorizeRequired, controllerDashboard.experiences);
router.get('/dashboard/educations', authorizeRequired, controllerDashboard.educations);
router.get('/dashboard/trainings', authorizeRequired, controllerDashboard.trainings);
router.get('/dashboard/projects', authorizeRequired, controllerDashboard.projects);

router.get(['/:account', '/:account/profile'], validAccount, authorizeRequired, controllerAccount.profile);
router.get('/:account/experiences', validAccount, authorizeRequired, controllerAccount.experiences);
router.get('/:account/educations', validAccount, authorizeRequired, controllerAccount.educations);
router.get('/:account/trainings', validAccount, authorizeRequired, controllerAccount.trainings);
router.get('/:account/skills', validAccount, authorizeRequired, controllerAccount.skills);
router.get('/:account/projects', validAccount, authorizeRequired, controllerAccount.projects);

exports.dispatcher = router;