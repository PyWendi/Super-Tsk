import { defineStore } from "pinia";
import { register, login, getUser, getUsersByName } from "src/requests/userRequest";
import { reactive, ref } from "vue";

export const useUserStore = defineStore("user", () => {
    /**
     * ALL GLOBAL STATE
     */
    // data of the current user
    const userData = reactive({
        name: "",
        lastname: "",
        email: "",
        isAdmin: false
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

    const getUserAction = async (id) => {
        const response = await getUser(id)
        userDetail.value = response.data
        return response
    }

    const getUserByNameAction = async (name) => {
        const response = await getUsersByName(name)
        return repsonse
    }


    return {
        // Global state
        userData, userDetail, userList,

        //Function
        logUser, registerUser, getUserAction, getUserByNameAction
    }
})