import express from 'express';
import {
  getCurrentUser,
  createUser,
  deleteUser,
} from '../controllers/userControllers.js';

const user = express.Router();

/**
 * @swagger
 * /api/user/login:
 *  post:
 *    tags: [User]
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 *    requestBody:
 *      content:
 *        application/json:
 *          examples:
 *            admin:
 *              value: { "userName": "admin", "password": "admin" }
 *            user:
 *              value: { "userName": "user", "password": "user" }
 *          schema:
 *            properties:
 *              userName:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *                - userName
 *                - password
 *
 *    description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 * /api/user/currentUser:
 *  get:
 *    tags: [User]
 *    security:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 *    description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

user.get('/currentUser', getCurrentUser);

user.post('/', createUser);

user.delete('/:email', deleteUser);

export default user;
