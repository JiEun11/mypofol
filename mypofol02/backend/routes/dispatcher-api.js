const express = require('express');
const { validAccount, verifyToken } = require('../interceptors');

const { controllerJWT, controllerProjects, controllerAccount, controllerProfile, controllerExperiences, controllerEducations, controllerTrainings, controllerSkills } = require('../controllers');

const router = express.Router();


/* APIs */
router.post(`/signup`, controllerAccount.create);

router.post(`/auth`, controllerJWT.auth);
router.get(`/refresh-token`, controllerJWT.refreshToken);
router.get(`/signout`, controllerJWT.signout);

router.get(`/:accountName`, verifyToken, validAccount, controllerAccount.get);
router.get(`/:accountName/profile`, verifyToken, validAccount, controllerProfile.get);
router.get(`/:accountName/experiences`, verifyToken,  validAccount, controllerExperiences.get);
router.get(`/:accountName/educations`, verifyToken, validAccount, controllerEducations.get);
router.get(`/:accountName/trainings`, verifyToken, validAccount, controllerTrainings.get);
router.get(`/:accountName/skills`, verifyToken, validAccount, controllerSkills.get);

router.get(`/:accountName/projects`, verifyToken, validAccount, controllerProjects.get);
router.post(`/:accountName/projects`, verifyToken, validAccount, controllerProjects.create);
router.delete(`/:accountName/projects`, verifyToken, validAccount, controllerProjects.delete);

exports.dispatcherApi = router;