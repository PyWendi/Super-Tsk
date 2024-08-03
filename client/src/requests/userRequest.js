import { api } from "src/boot/axios";
import { tokenManagement } from "src/stores/tokenManagement";

/**
 * Register a new user by the admin
 * 
 * @param {*} body : {name, lastname, email, password, isAdmin} 
 * @returns {message: string, data: user instance, res: boolean}
 */
export const register = async (body) => {
    let res = {
        message: "",
        data: null,
        res: false
    }

    try {
        const response = await api.post('register', body)
        console.log(response)

        // If the user has been registered
        if (response.status === 201) {
            // Set the token
            tokenManagement.setJwt(response.data.token)
            // Set the user data to be used in front
            res.data = response.data.user
            res = true
            return res

            // If there's an error with the input
        } else if (response.status === 400) {
            res.message = response.data.message
            return res
        }


    } catch (error) {
        console.error("Error inside register request: ", error)
        res.message = "An error occured please try again."
        return res
    }
}


/**
 * Signin for both admin and simple user
 * 
 * @param {*} body : {email, password}
 * @returns {message: string, data: null | user instance, res: boolean}
 */
export const login = async (body) => {
    let res = {
        message: "",
        data: null,
        res: false
    }

    try {
        const response = await api.post('login', body)
        console.log("response from login request : ", response)

        // If the user is successfully authenticated
        if (response.status === 200) {
            // Set the token inside a Cookie
            tokenManagement.setJwt(response.data.token)
            res.data = response.data.user
            res.res = true
            return res

            // If the user's passowrd is incorrect
        } else if (response.status === 401) {
            res.message = response.data.message
            return res

            // If there's no user with the provided emailS
        } else if (response.status === 404) {
            res.message = response.data.message
            return res
        }


    } catch (error) {
        console.error("An error occured inside login request : ", error)
        res.message = "An error occured please try again."
        return res
    }
}


/**
 * Action performed by all authenticated user 
 * Get a user information
 * 
 * @param {*} id : number
 * @returns {message: string, data: null | user instance, res: true}
 */
export const getUser = async (id) => {
    let res = {
        message: "",
        data: null,
        res: true
    }

    try {
        const response = await api.get(`user/get/${id}`)
        console.log("Response inside user get", response)

        // If the user has been found
        if (response.status === 200) {
            res.data = response.data
            res.res = true
            return res

            // If there's no user found
        } else if (response.status === 404) {
            res.message = response.data.message
            return res
        }


    } catch (error) {
        console.error("Error captured inside getUser request : ", error)
        res.message = "An error occured, Please verify your network conectivity."
        return res
    }
}


/**
 * Action performed by all authenticated user 
 * Get a user information
 * 
 * @param {*} name : string 
 * @returns {message: string, data: null | [user instance], res: true}
 */
export const getUserByname = async (name) => {
    let res = {
        message: "",
        data: null,
        res: true
    }

    try {
        const response = await api.get(`user/get/by_name/${name}`)
        console.log("Response inside user get", response)

        // If the user has been found
        if (response.status === 200) {
            res.data = response.data
            res.res = true
            return res

            // If there's no user found
        } else if (response.status === 404) {
            res.message = response.data.message
            return res
        }


    } catch (error) {
        console.error("Error captured inside getUser request : ", error)
        res.message = "An error occured, Please verify your network conectivity."
        return res
    }
}
