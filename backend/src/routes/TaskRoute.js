import express from 'express';
import TaskController from '../controllers/TaskController.js';
import jwtMiddleware from '../middlewares/jwtMiddleware.js';
import adminFilter from '../middlewares/adminFilter.js';

const route = express.Router()

// Admin routes
route.get('/task/get/:userId', adminFilter, TaskController.getUserTasksByAdmin)
route.post('/task/create', adminFilter, TaskController.createTask)
route.put('/task/update/:taskId', adminFilter, TaskController.updateTask)
route.delete('/task/delete/:taskId', adminFilter, TaskController.deleteTask)

// user routes    
route.get('/get/task', jwtMiddleware, TaskController.getUserTasks)
route.put('/task/update/status', jwtMiddleware, TaskController.updateStatus)



export default route 