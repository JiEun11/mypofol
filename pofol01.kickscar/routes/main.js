const express = require('express');
const controllerMain = require('../controllers/main');

const router = express.Router();
router.get('/', controllerMain.index);
router.get('/:account', controllerMain.accountHome);

module.exports = router;