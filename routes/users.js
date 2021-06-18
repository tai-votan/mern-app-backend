import express from 'express';
import { authToken } from '../services/TokenAuth.js';
import {
  getCurrentUser,
  createUser,
  deleteUser,
  userLogin,
} from '../controllers/usersControllers.js';

const users = express.Router();

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

users.get('/currentUser', authToken, getCurrentUser);

users.post('/login', userLogin);

users.post('/', createUser);

users.delete('/:email', deleteUser);

export default users;
