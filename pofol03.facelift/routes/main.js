const express = require('express');


const controllerMain = require('../controllers/main');
const controllerApi = require('../controllers/api');

const router = express.Router();
router.get('/', controllerMain.index);
router.get('/:account', controllerMain.accountLanding);

module.exports = router;