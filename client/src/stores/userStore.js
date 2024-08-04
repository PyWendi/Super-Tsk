import { defineStore } from "pinia";
import { register, login, getUser, getUsersByName, getAllUser, getCurrentUser } from "src/requests/userRequest";
import { reactive, ref } from "vue";
import { tokenManagement } from "./tokenManagement";

export const useUserStore = defineStore("user", () => {
    /**
     * ALL GLOBAL STATE
     */
    // data of the current user
    const userData = reactive({
        id: 0,
        name: "",
        lastname: "",
        email: "",
        isAdmin: false,
    })

    // Data of a single user
    const userDetail = reactive({
        id: 0,
        name: "",
        lastname: "",
        email: "",
        isAdmin: false
    })

    // List of users
    const userList = ref([])



    /**
     * ALL FUNCTIONS 
     */
    const logUser = async (body) => {
        const response = await login(body)
        return response
    }

    const registerUser = async (body) => {
        const response = await register(body)
        if (response.res) {
            userList.value = [response.data, ...userList.value]
            return response
        } 
        return response
    }

    const getAllUserAction = async () => {
        const response = await getAllUser()
        console.log(response)
        userList.value = response.data.rows
        return response
    }

    const getCurrentUserAction = async (id) => {
        const response = await getCurrentUser(id)
        let data = response.data
        console.log(data)
        userData.id = data.id
        userData.name = data.name
        userData.lastname = data.lastname
        userData.email = data.email
        userData.isAdmin = data.isAdmin
        console.log("get user data" ,userData.value)
        return response
    }

    const getUserAction = async (id) => {
        const response = await getUser(id)
        userDetail = response.data
        console.log("get user data" ,userDetail.value)
        return response
    }

    const getUserByNameAction = async (name) => {
        const response = await getUsersByName(name)
        return response
    }

    const logoutUser = () => {
        return (tokenManagement.deleteJwt()) ? true : false
    }

    return {
        // Global state
        userData, userDetail, userList,

        //Function
        logUser, registerUser, getAllUserAction, getCurrentUserAction, getUserAction, getUserByNameAction, logoutUser
    }
})