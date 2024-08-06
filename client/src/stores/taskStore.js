import { defineStore } from "pinia";
import TaskList from "src/components/task/TaskList.vue";
import { createTask, deleteTask, getUserTask, getUserTaskByAdmin, updateTask, updateTaskStatus } from "src/requests/taskRequest";
import { reactive, ref } from "vue";

export const useTaskStore = defineStore("task", () => {
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

    const taskData = ref([])
    const taskLoading = ref(false)

    const taskList = reactive({
        total: 0,
        information: [0, 0, 0],
        partition:{
            pending: [],
            working: [],
            completed: [],
        }
    })

    const initializeTasks = () => {
        taskList.total = 0
        taskList.information = [0, 0, 0]
        taskList.partition.pending = []
        taskList.partition.working = []
        taskList.partition.completed = []
    }

    const affectTask = (tasks) => {
        initializeTasks()
        taskList.total = tasks.length

        if(taskList.total > 0) {
            tasks.map((task, index) => {
                switch (task.status) {
                    case "pending":
                        taskList.information[0]++
                        taskList.partition.pending.push(task)
                        break;
    
                    case "working on":
                        taskList.information[1]++
                        taskList.partition.working.push(task)
                        break;
    
                    case "completed":
                        taskList.information[2]++
                        taskList.partition.completed.push(task)
                        break;
                
                    default:
                        break;
                }
            })
    
            // Calculate purcentage
            taskList.information[0] = Math.floor((taskList.information[0] * 100) / taskList.total)
            taskList.information[1] = Math.floor((taskList.information[1] * 100) / taskList.total)
            taskList.information[2] = Math.floor((taskList.information[2] * 100) / taskList.total)
        }
    }

    /**
     * ALL FUNCTIONS 
     */
    const getUsertaskByAdminACtion = async (userId) => {
        const response = await getUserTaskByAdmin(userId)
        taskData.value = response.data
        affectTask(response.data)
        return response
    }

    const getUserTaskAction = async () => {
        const response = await getUserTask()
        taskData.value = response.data.tasks
        affectTask(response.data.tasks)
        return response 
    }

    const createTaskAction = async (body) => {
        const response = await createTask(body)
        taskData.value = [response.data, ...taskData.value]
        affectTask(taskData.value)
        return response
    }

    const updateTaskAction = async (body) => {
        console.log(body)
        const response = await updateTask(body, body.id)
        if(response.res) {
            const i = taskData.value.findIndex(obj => obj.id === body.id)
            taskData.value[i].name = body.name
            taskData.value[i].description = body.description
            taskData.value[i].status = body.status
            affectTask(taskData.value)
        }

        return response
    }

    const updateTaskStatusAction = async (body) => {
        const response = await updateTaskStatus(body)
        if(response.res) {
            const i = taskData.value.findIndex(obj => obj.id === body.id)
            taskData.value[i].status = body.status
            affectTask(taskData.value)
        } 

        return response
    }

    const deleteTaskAction = async (taskId) => {
        const response = await deleteTask(taskId)
        if(response.res) {
            const i = taskData.value.findIndex(obj => obj.id === taskId)
            let newTasks = taskData.value.filter((task, index) => index != i)
            taskData.value = [...newTasks]
            affectTask(taskData.value)
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
