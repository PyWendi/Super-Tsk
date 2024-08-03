import { defineStore } from "pinia";
import { createTask, deleteTask, getUserTask, getUserTaskByAdmin, updateTask, updateTaskStatus } from "src/requests/taskRequest";
import { reactive, ref } from "vue";

export const useUserStore = defineStore("user", () => {
    /**
     * ALL GLOBAL STATE
     */
    const taskDetail = reactive({
        id: 0,
        name: "",
        description: "",
        status: "",
        owner: 0,
    })

    const taskList = ref([])


    /**
     * ALL FUNCTIONS 
     */
    const getUsertaskByAdminACtion = async (userId) => {
        const response = await getUserTaskByAdmin(userId)
        taskList.value = response.data.tasks
        return response
    }

    const getUserTaskAction = async () => {
        const response = await getUserTask()
        taskList.value = response.data.tasks
        return response 
    }

    const createTaskAction = async (body) => {
        const response = await createTask(body)
        taskList.value = [response.data, ...taskList]
        return response
    }

    const updateTaskAction = async (index, body) => {
        const response = updateTask(body, body.taskId)
        if(response.res) {
            taskList.value[index].name = body.name
            taskList.value[index].description = body.description
            taskList.value[index].status = body.status
        }

        return response
    }

    const updateTaskStatusAction = async (body, index) => {
        const response = await updateTaskStatus(body)
        if(response.res) {
            taskList.value[index].status = body.status
        } 

        return response
    }

    const deleteTaskAction = async (taskId, index) => {
        const response = deleteTask(taskId)
        if(response.res) {
            let newTasks = []
            taskList.value.forEach((task, i) => {
                if(i != index) {
                    newTasks.push(task)
                }
            });

            taskDetail.value = [...newTasks]
        }

        return response
    }   


    return {
        // Global state
        taskDetail, taskList,

        //Function
        getUsertaskByAdminACtion, getUserTaskAction,createTaskAction,
        updateTaskAction, updateTaskStatusAction, deleteTaskAction
    }
})
