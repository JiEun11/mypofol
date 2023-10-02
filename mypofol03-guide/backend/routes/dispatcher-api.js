const express = require('express');
const { validAccount, verifyToken, delayForTest } = require('./interceptors');
const { controllerJWT, controllerProjects, controllerAccount, controllerProfile, controllerExperiences, controllerEducations, controllerTrainings } = require('../controllers');

const router = express.Router();

/* APIs */
router.post('/signup', controllerAccount.create);

router.post('/auth', controllerJWT.auth);
router.get('/refresh-token', controllerJWT.refreshToken);
router.get('/signout', controllerJWT.signout);

router.get('/:accountName', verifyToken, validAccount, controllerAccount.get);
router.get('/:accountName/profile', verifyToken, validAccount, controllerProfile.get);
router.get('/:accountName/trainings', verifyToken, validAccount, controllerTrainings.get);

router.get('/:accountName/projects', verifyToken, validAccount, controllerProjects.get);
router.post('/:accountName/projects', verifyToken, validAccount, controllerProjects.create);
router.delete('/:accountName/projects', verifyToken, validAccount, controllerProjects.delete);


/**
 * @swagger
 * /api/{accountName}/experiences:
 *
 *    parameters:      
 *    - name: accountName
 *      description: the user's account name, as accountName 
 *      in: path
 *      required: true
 *      schema:
 *         type: string
 *      examples:
 *         bella:
 *            value: 1
 *            summary: bella
 *         kickscar:
 *            value: 2
 *            summary: kickscar
 *
 *    get:
 *       description: Returns user's experiences based on accountName
 *       tags:
 *       - 경력
 *         
 *       responses:
 *          200:
 *             description: the user's experiences being returned
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                          result:
 *                              type: string
 *                              example: 'success' 
 *                          data:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Experience' 
 *                          message:
 *                              type: string
 *                              example: null 
 *          400:
 *             description: Bad Request - user's account not exist
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                          result:
 *                              type: string
 *                              example: 'fail' 
 *                          data:
 *                              type: object
 *                              example: null
 *                          message:
 *                              type: string
 *                              example: "Invalid Account(wrong-account)"
 * 
 */
router.get('/:accountName/experiences', verifyToken, validAccount, controllerExperiences.get);

/**
 * @swagger
 * /api/{accountName}/trainings:
 *
 *    parameters:      
 *    - name: accountName
 *      description: the user's account name, as accountName 
 *      in: path
 *      required: true
 *      schema:
 *         type: string
 *      examples:
 *         bella:
 *            value: 1
 *            summary: bella
 *         kickscar:
 *            value: 2
 *            summary: kickscar
 *
 *    get:
 *       description: Returns user's trainings based on accountName
 *       tags:
 *       - 교육및 자격증
 *         
 *       responses:
 *          200:
 *             description: the user's trainings being returned
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                          result:
 *                              type: string
 *                              example: 'success' 
 *                          data:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Experience' 
 *                          message:
 *                              type: string
 *                              example: null 
 *          400:
 *             description: Bad Request - user's account not exist
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                          result:
 *                              type: string
 *                              example: 'fail' 
 *                          data:
 *                              type: object
 *                              example: null
 *                          message:
 *                              type: string
 *                              example: "Invalid Account(wrong-account)"
 * 
 */
router.get('/:accountName/educations', verifyToken, validAccount, controllerEducations.get);



exports.dispatcherApi = router;