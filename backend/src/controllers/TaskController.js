import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import Task from "../models/Task.js" 
import { Op } from "sequelize"
// For body validation
import { TaskSchema } from "../schemas/TaskSchema.js"
import zod from "zod"

// Load the .env variable
import dotenv from 'dotenv';
dotenv.config();


class TaskController {

    /**
     * Assuming the userId has been injected inside middleware
     * Get all current user's tasks
     * performed by the user only
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns {tasks: tasks} user's tasks 
     */
    static async getUserTasks(req, res) {
        try {
            // Find all taks with the given owner id
            let tasks = await Task.findAll({where: {owner: req.userId}})

            if(tasks) return res.json({tasks: tasks})
            
            // If no task has been found for the user
            return res.status(404)
        } catch (error) {
            console.log("An error is catch in the getUserTasks controller : ",error)
            return res.status(500).json({
                message: "An error occured, please try again or verify your network connectivity",
                error: error
            })
        }
    }


    /**
     * Get the tasks of the user requested by the administrator
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns {tasks: tasks} user's tasks
     */
    static async getUserTasksByAdmin(req, res) {
        try {
            const { userId } = req.params

            let tasks = await Task.findAll({where: {owner: userId}})

            if(tasks) return res.json({tasks: tasks})

            return res.status(404)
        
        } catch (error) {
            console.log("An error is catch in getUserTasksByAdmin : ", error)
            return res.status(500).json({
                message: "An error occured, please try again and verify your network connectivity.",
                error: error
            })
        }
    }


    /**
     * Create a task for a user by the administrator
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns {task: newTask}
     */
    static async createTask(req, res) {
        try {
            const { 
                name,
                description,
                status,
                owner
             } = req.body

             let newTask = await Task.create({name, description, status, owner})

             return res.status(201).json({task: newTask})


        } catch (error) {
            console.log("An error is catch in createTask Controller : ", error)
            if(error instanceof zod.ZodError) return res.status(400).json({
                message: "Please, verify the that all requested information or not blanks",
                error: error.errors
            })

            return res.status(500).json({
                message: "An error occured, please try again and verify your network connectivity.",
                error:error
            })
        }
    }



    /**
     * task modification performed by the administrator only
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns {task: task} updated task
     */
    static async updateTask(req, res) {
        try {
            const {
                name,
                description,
                status,
            } = req.body

            const {taskId} = req.params

            let task = await Task.update(
                {
                    name, description, status
                },
                {where : {id: taskId,}}
            ) 
            console.log(task[0])
            return res.json({task:task})
        } catch (error) {
            console.log("An error has been captured inside updateTask controller : ", error)
            return res.status(500).json({
                message: "An error occured, please verify the integrity of the given information and try again",
                error: error
            })
        }
    }

    /**
     * Task modification performed by the user 
     * Updating status only
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns {task: task} updated task
     */
    static async updateStatus(req, res) {
        try {
            const {
                status,
            } = req.body

            const {taskId} = req.params

            let task = await Task.update(
                {status}, {where : {id: taskId,}}
            ) 

            return res.json({task:task})
        } catch (error) {
            console.log("An error has been captured inside updateStatus controller : ", error)
            return res.status(500).json({
                message: "An error occured, please verify the integrity of the given information and try again",
                error: error
            })
        }
    }


    /**
     * Destroy the selected task
     * Performed by the admin only
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns status(204)
     */
    static async deleteTask(req, res) {
        try {
            const { taskId } = req.params

            let task = await Task.findByPk(taskId)

            await task.destroy()

            return res.status(204)
        } catch (error) {
            console.log("An error has been captured inside deleteTask controller : ", error)
            return res.status(500).json({
                message: "An error occured, please verify the integrity of the given information and try again",
                error: error
            })
        }
    }

}


export default TaskController