const express = require('express');
const mainController = require('../controllers/main');

const router = express.Router();
router.get('/', mainController.landing);
router.get('/:account', mainController.home);

module.exports = router;