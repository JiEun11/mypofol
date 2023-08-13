const express = require('express');

const {ValidAccount} = require('./validaccount');

const controllerMain = require('../controllers/main');
const controllerApi = require('../controllers/api');

const router = express.Router();
router.get('/', controllerMain.index);
router.get('/:account', controllerMain.accountLanding);

// APIs
router.get('/api/:userId/experiences', ValidAccount, controllerApi.experiences);




module.exports = router;