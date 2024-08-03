import { api } from "src/boot/axios";
import { tokenManagement } from "src/stores/tokenManagement";


/**
 * Performed by the administrator
 * Get a user task
 * 
 * @param {*} userId : number
 * @returns {message: string, data: null | [task instance], res: boolean} 
 */
export const getUserTaskByAdmin = async (userId) => {
    let res = {
        message: "",
        data: null,
        res: false
    }

    try {
        const response = await api.get(`task/get/${userId}`)
        console.log("Response from getUserTaskByAdmin request : ", response)

        // If a task has been found
        if (response.status === 200) {
            res.data = response.data.tasks
            res.res = true
            return res

            // If there's no task found
        } else if (response.status === 404) return res


    } catch (error) {
        console.log("Error captured inside getUsertTaskByAdmin request : ", error)
        return res
    }
}


/**
 * Performed by all simple users
 * Get their list of task
 * 
 * @returns {message: string, data: null | [task instance], res: boolean}
 */
export const getUserTask = async () => {
    let res = {
        message: "",
        data: null,
        res: false
    }

    try {
        const response = await api.get(`get/task`)
        console.log("Response from getUserTask request : ", response)

        // if user's task has been found
        if (response.status === 200) {
            res.data = response.data.tasks
            res.res = true
            return res

            // If there's no user's task
        } else if (response.status === 404) return res

    } catch (error) {
        console.log("Error captured inside getUsertTask request : ", error)
        return res
    }
}


/**
 * 
 * @param {*} body: {name, description, status, owner} 
 * @returns {message: string, data: null | task instance, res: boolean}
 */
export const createTask = async (body) => {
    let res = {
        message: "",
        data: null,
        res: false
    }

    try {
        const response = await api.post('task/create')
        console.log("Response from createTask request : ", response)

        // if the task has been successfully created
        if (response.status === 201) {
            res.data = response.data.task
            res.res = true
            return res

            // If there's an error with values inside the request body 
        } else if (response.status === 400) {
            res.message = response.data.message
            return res
        }


    } catch (error) {
        console.log("Error captured inside createTask request : ", error)
        res.message = "Please verify your network connectivity and try again"
        return res
    }
}


/**
 * Update a task
 * Performed by the administrator
 * 
 * @param {*} body : {name, description, status} 
 * @param {*} taskId : number
 * @returns {message: string, res: boolean}
 */
export const updateTask = async (body, taskId) => {
    let res = {
        message: "",
        res: false
    }

    try {
        const response = await api.put(`task/update/${taskId}`, body)
        console.log("Response from updateTask request : ", response)

        // IF the update has been done successfully
        if (response.status === 200) {
            res.res = true
            return res

            // if an error occured
        } else if (response.status === 500) {
            console.log("error catched : ", response.data.error)
            res.message = response.data.message
            return res
        }

    } catch (error) {
        console.log("Error captured inside updateTask request : ", error)
        res.message = "Please verify your network connectivity and try again"
        return res
    }
}


/**
 * Update the status of a task
 * Performed by users
 * 
 * @param {*} body : {status, taskId} 
 * @returns {message: string, res: boolean}
 */
export const updateTaskStatus = async (body) => {
    let res = {
        message: "",
        res: false
    }

    try {
        const response = await api.put('task/update/status')

        // if the status has been updated successfully
        if (response.status === 200) {
            res.res = true
            return res

            // if an error occured
        } else if (response.status === 500) {
            console.log("error catched : ", response.data.error)
            res.message = response.data.message
            return res
        }

    } catch (error) {
        console.log("Error captured inside updateTaskStatus request : ", error)
        res.message = "Please verify your network connectivity and try again"
        return res
    }
}


/**
 * Delete the selected task
 * Performed by only the administrator
 * 
 * @param {*} taskId : number
 * @returns {message: string, res: boolean}
 */
export const deleteTask = async (taskId) => {
    let res = {
        message: "",
        res: false
    }

    try {
        const response = await api.delete(`task/delete/${taskId}`)

        if (response.status === 204) {
            res.res = true
            return res

        } else if (response.status === 500) {
            console.log("error catched : ", response.data.error)
            res.message = response.data.message
            return res
        }

    } catch (error) {
        console.log("Error captured inside updateTaskStatus request : ", error)
        res.message = "Please verify your network connectivity and try again"
        return res
    }
}