import express from 'express';
import UserController from '../controllers/UserController.js';
import adminFilter from '../middlewares/adminFilter.js';
import jwtMiddleware from '../middlewares/jwtMiddleware.js';

const router = express.Router();

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/user/get/current', jwtMiddleware, UserController.getCurrent);

router.get('/user/get/all', adminFilter, UserController.getAllUser);

router.get('/user/get/:id', jwtMiddleware, UserController.getUser);

router.put('/user/update/:id', adminFilter, UserController.updateUser);

router.get('/user/get/by_name/:userName', adminFilter, UserController.getUserByName);


export default router;
