import { defineStore } from "pinia";
import { register, login, getUser, getUsersByName, getAllUser, getCurrentUser, updateUser } from "src/requests/userRequest";
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

    const setUserDetail = (data) => {
        userDetail.id = data.id
        userDetail.name = data.name
        userDetail.lastname = data.lastname
        userDetail.email = data.email
        userDetail.isAdmin = data.isAdmin
    }


    const logUser = async (body) => {
        const response = await login(body)
        return response
    }

    const registerUser = async (body) => {
        try {
            const response = await register(body)
            console.log('Inside register ', response)
            if (response.res) {
                userList.value = [response.data, ...userList.value]
                return response
            } 
            return response
            
        } catch (error) {
            console.log(error)
            return {res:false, message: "Nothing good come"}
        }
    }

    const getAllUserAction = async () => {
        const response = await getAllUser()
        userList.value = response.data.rows
        console.log(userList)
        return response
    }

    const getCurrentUserAction = async (id) => {
        const response = await getCurrentUser(id)
        let data = response.data
        userData.id = data.id
        userData.name = data.name
        userData.lastname = data.lastname
        userData.email = data.email
        userData.isAdmin = data.isAdmin
        return response
    }

    const getUserAction = async (id) => {
        const response = await getUser(id)
        userDetail = response.data
        console.log("get user data" ,userDetail.value)
        return response
    }

    const updateUserAction = async (id, body, index) => {
        const response = await updateUser(id, body)
        userList.value[index].name = body.name
        userList.value[index].lastname = body.lastname
        userList.value[index].isAdmin = body.isAdmin
        return response
    }

    const getUserByNameAction = async (name) => {
        const response = await getUsersByName(name)
        userList.value = [...response.data]
        return response
    }

    const logoutUser = () => {
        return (tokenManagement.deleteJwt()) ? true : false
    }

    return {
        // Global state
        userData, userDetail, userList,

        //Function
        setUserDetail,
        logUser, registerUser, getAllUserAction, getCurrentUserAction, 
        getUserAction, updateUserAction, getUserByNameAction, logoutUser
    }
})