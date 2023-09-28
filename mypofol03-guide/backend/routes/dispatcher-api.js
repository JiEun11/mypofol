const express = require('express');
const { validAccount, verifyToken, delayForTest } = require('./interceptors');

const controllerJWT = require('../controllers/jwt');
const controllerAccount = require('../controllers/account');
const controllerProfile = require('../controllers/profile');
const controllerExperiences = require('../controllers/experiences');
const controllerEducations = require('../controllers/educations');
const controllerTrainings = require('../controllers/trainings');
const controllerProjects = require('../controllers/projects');

const router = express.Router();

/* APIs */
router.post('/signup', controllerAccount.create);

router.post('/auth', controllerJWT.auth);
router.get('/refresh-token', controllerJWT.refreshToken);
router.get('/signout', controllerJWT.signout);

router.get('/:account', verifyToken, validAccount, controllerAccount.get);
router.get('/:account/profile', verifyToken, validAccount, controllerProfile.get);
router.get('/:account/experiences', verifyToken, validAccount, controllerExperiences.get);
router.get('/:account/educations', verifyToken, validAccount, controllerEducations.get);
router.get('/:account/trainings', verifyToken, validAccount, controllerTrainings.get);

router.get('/:account/projects', verifyToken, validAccount, controllerProjects.get);
router.post('/:account/projects', verifyToken, validAccount, controllerProjects.create);
router.delete('/:account/projects', verifyToken, validAccount, controllerProjects.delete);


exports.dispatcherApi = router;