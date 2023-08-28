const express = require('express');
const controllerMain = require('../controllers/main');
const controllerDashboard = require('../controllers/dashboard');
const controllerAccount = require('../controllers/account');

const router = express.Router();

const interceptorOnlyBella = async (req, res, next) => {
    if(req.params.account !== 'bella') {
        res.status(200).render('error/404');
        return;
    }    
    next();
};

router.get('/', controllerMain.index);
router.get('/signin', controllerMain.signin);
router.get('/signup', controllerMain.signup);

router.get('/dashboard', controllerDashboard.profile);
router.get('/dashboard/profile', controllerDashboard.profile);
router.get('/dashboard/experiences', controllerDashboard.experiences);

router.get('/:account', interceptorOnlyBella, controllerAccount.profile);
router.get('/:account/profile', interceptorOnlyBella, controllerAccount.profile);
router.get('/:account/experiences', interceptorOnlyBella, controllerAccount.experiences);
router.get('/:account/educations', interceptorOnlyBella, controllerAccount.educations);
router.get('/:account/trainings', interceptorOnlyBella, controllerAccount.trainings);
router.get('/:account/skills', interceptorOnlyBella, controllerAccount.skills);

exports.dispatcher = router;