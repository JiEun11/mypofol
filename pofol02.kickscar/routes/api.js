const express = require('express');

const {ValidUserID, Delay1Second} = require('./interceptors');
const controllerApi = require('../controllers/api');

const router = express.Router();

/**
 * @swagger
 * /api/{userid}/experiences:
 *
 *    parameters:      
 *    - name: userid
 *      description: the user identifier, as userid 
 *      in: path
 *      required: true
 *      schema:
 *         type: number
 *      examples:
 *         bella:
 *            value: 1
 *            summary: bella
 *         kickscar:
 *            value: 2
 *            summary: kickscar
 *
 *    get:
 *       description: Returns user's experiences based on userid
 *       tags:
 *       - About Me
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
 *                              example: "User's Account Not Exist"
 * 
 */
router.get('/:userid/experiences', ValidUserID, Delay1Second, controllerApi.experiences);

/**
 * @swagger
 * /api/{userid}/educations:
 *
 *    parameters:      
 *    - name: userid
 *      description: the user identifier, as userid 
 *      in: path
 *      required: true
 *      schema:
 *         type: number
 *      examples:
 *         bella:
 *            value: 1
 *            summary: bella
 *         kickscar:
 *            value: 2
 *            summary: kickscar
 *
 *    get:
 *       description: Returns user's educations based on userid
 *       tags:
 *       - About Me
 *         
 *       responses:
 *          200:
 *             description: the user's educations being returned
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
 *                              example: "User's Account Not Exist"
 * 
 */
router.get('/:userid/educations', ValidUserID, Delay1Second, controllerApi.educations);

/**
 * @swagger
 * /api/{userid}/trainings:
 *
 *    parameters:      
 *    - name: userid
 *      description: the user identifier, as userid 
 *      in: path
 *      required: true
 *      schema:
 *         type: number
 *      examples:
 *         bella:
 *            value: 1
 *            summary: bella
 *         kickscar:
 *            value: 2
 *            summary: kickscar
 *
 *    get:
 *       description: Returns user's trainings based on userid
 *       tags:
 *       - About Me
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
 *                              example: "User's Account Not Exist"
 * 
 */
router.get('/:userid/trainings', ValidUserID, Delay1Second, controllerApi.trainings);

/**
 * @swagger
 * /api/{userid}/skills:
 *
 *    parameters:      
 *    - name: userid
 *      description: the user identifier, as userid 
 *      in: path
 *      required: true
 *      schema:
 *         type: number
 *      examples:
 *         bella:
 *            value: 1
 *            summary: bella
 *         kickscar:
 *            value: 2
 *            summary: kickscar
 *
 *    get:
 *       description: Returns user's skills based on userid
 *       tags:
 *       - Skills
 *         
 *       responses:
 *          200:
 *             description: the user's skills being returned
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
 *                              example: "User's Account Not Exist"
 * 
 */
router.get('/:userid/skills', ValidUserID, Delay1Second, controllerApi.skills);

/**
 * @swagger
 * /api/{userid}/projects:
 *
 *    parameters:      
 *    - name: userid
 *      description: the user identifier, as userid 
 *      in: path
 *      required: true
 *      schema:
 *         type: number
 *      examples:
 *         bella:
 *            value: 1
 *            summary: bella
 *         kickscar:
 *            value: 2
 *            summary: kickscar
 *
 *    get:
 *       description: Returns user's projects based on userid
 *       tags:
 *       - Projects
 *         
 *       responses:
 *          200:
 *             description: the user's projects being returned
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
 *                              example: "User's Account Not Exist"
 * 
 */
router.get('/:userid/projects', ValidUserID, Delay1Second, controllerApi.projects);

/**
 * @swagger
 * /api/{userid}/contacts:
 *
 *    parameters:      
 *    - name: userid
 *      description: the user identifier, as userid 
 *      in: path
 *      required: true
 *      schema:
 *         type: number
 *      examples:
 *         bella:
 *            value: 1
 *            summary: bella
 *         kickscar:
 *            value: 2
 *            summary: kickscar
 *
 *    get:
 *       description: Returns user's contacts based on userid
 *       tags:
 *       - Contact
 *         
 *       responses:
 *          200:
 *             description: the user's contacts being returned
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
 *                              example: "User's Account Not Exist"
 * 
 */
router.get('/:userid/contacts', ValidUserID, Delay1Second, controllerApi.contacts);

module.exports = router;