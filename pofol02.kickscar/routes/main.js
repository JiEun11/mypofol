const express = require('express');

const {ValidAccount} = require('./validaccount');

const controllerMain = require('../controllers/main');
const controllerApi = require('../controllers/api');

const router = express.Router();
router.get('/', controllerMain.index);
router.get('/:account', controllerMain.accountLanding);

// APIs
/**
 * @swagger
 *  /api/{userId}/experiences:
 *    get:
 *      
 *      tags:
 *      - About Me
 *      
 *      description: 해당 id의 사용자 경력 조회
 *      
 *      produces:
 *      - application/json
 *      
 *      parameters:      
 *      - name: userId
 *        in: path
 *        required: true
 *        schema:
 *           type: number
 *        examples:
 *          Sample:
 *            value: 1
 *            summary: 예제 사용자 id
 *        style: simple
 *  
 *      responses:
 *       200:
 *        description: 경력 조회 성공
 */
router.get('/api/:userId/experiences', ValidAccount, controllerApi.experiences);




module.exports = router;