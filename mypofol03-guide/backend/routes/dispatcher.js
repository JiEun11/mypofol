const router = require('express').Router();
const controllerMain = require('../controllers/main');

exports.dispatcher = router.get('/', controllerMain.index);