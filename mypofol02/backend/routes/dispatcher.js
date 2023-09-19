const express = require('express');
const {authorizeNotRequired, authorizeRequired, validAccount} = require('./interceptors');

const controllerMain = require('../controllers/main');
const controllerDashboard = require('../controllers/dashboard');
const controllerAccount = require('../controllers/account');

const apiControllerAccount = require('../controllers/api/account');
const apiControllerMain = require('../controllers/api/main');

const router = express.Router();


router.get('/', controllerMain.index, validAccount, controllerAccount.profile);
router.get('/welcome', authorizeNotRequired, controllerMain.welcome);
router.get('/signout', authorizeRequired, controllerMain.signout);
router.post('/auth', authorizeNotRequired, controllerMain.auth);
router.post('/signup', authorizeNotRequired, controllerMain.signup);

router.get(['/dashboard', '/dashboard/profile'], authorizeRequired, controllerDashboard.profile);
router.post('/dashboard/updateProfile', authorizeRequired, controllerDashboard.updateProfile);
router.post('/dashboard/profile-pic', authorizeRequired, controllerDashboard.uploadProfilePic);
router.get('/dashboard/experiences', authorizeRequired, controllerDashboard.experiences);
router.get('/dashboard/educations', authorizeRequired, controllerDashboard.educations);
router.get('/dashboard/trainings', authorizeRequired, controllerDashboard.trainings);

router.get('/dashboard/projects', authorizeRequired, controllerDashboard.projects);
router.post('/dashboard/project/create', authorizeRequired, controllerDashboard.insertProject);
router.post('/dashboard/project/update', authorizeRequired, controllerDashboard.updateProject);
router.get('/dashboard/project/delete', authorizeRequired, controllerDashboard.deleteProject);

router.get(['/:account', '/:account/profile'], validAccount, authorizeRequired, controllerAccount.profile);
router.get('/:account/experiences', validAccount, authorizeRequired, controllerAccount.experiences);
router.get('/:account/educations', validAccount, authorizeRequired, controllerAccount.educations);
router.get('/:account/trainings', validAccount, authorizeRequired, controllerAccount.trainings);
router.get('/:account/skills', validAccount, authorizeRequired, controllerAccount.skills);
router.get('/:account/projects', validAccount, authorizeRequired, controllerAccount.projects);


/* APIs */
router.post(`/api/signup`, apiControllerMain.signup);

router.get(`/api/:account/projects`, validAccount, apiControllerAccount.projects);
router.post(`/api/:account/projects`, validAccount, apiControllerAccount.insertProject);
router.delete(`/api/:account/projects`, validAccount, apiControllerAccount.deleteProject);

exports.dispatcher = router;