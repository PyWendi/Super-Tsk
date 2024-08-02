import express from 'express';
import UserController from '../controllers/UserController.js';
import jwtMiddleware from '../middlewares/jwtMiddleware.js';
import adminFilter from '../middlewares/adminFilter.js';

const router = express.Router();

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/user/get/:id', jwtMiddleware, UserController.getUser);

router.get('/user/get/by_name/:name', adminFilter, UserController.getUserByName);


export default router;
