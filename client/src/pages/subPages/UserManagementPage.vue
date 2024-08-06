<template>
    <div 
    style="width: 100%;"
    class="">
        <!-- Head -->
        <div class="row bg-white justify-around items-center q-px-xl q-py-xs">
            <!-- Count of all user -->
            <div class="text-h6 text-grey-7">
                <DonutChart status="pending" :value="task.taskList.information[0]"/>
            </div>

            <div class="text-h6 text-grey-7">
                <DonutChart status="working" :value="task.taskList.information[1]"/>
            </div>

            <div class="text-h6 text-grey-7">
                <DonutChart status="completed" :value="task.taskList.information[2]"/>
            </div>

        </div>

        <!-- Body -->
        <div class="window-height q-px-xl q-py-xs">
            <!-- user list -->
            <TaskList/>
        </div>


    </div>
</template>



<script setup>
defineOptions({
    name: "UserManagementPage"
})

import { ref, onBeforeMount } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { useTaskStore } from 'src/stores/taskStore';
import DonutChart from 'src/components/pieces/DonutChart.vue';
import TaskList from 'src/components/task/TaskList.vue';


const store = useUserStore()
const task = useTaskStore()

onBeforeMount(() => {
    store.getAllUserAction()
})


</script>



<style>
.custom-height {
    height: 80vh;
}

</style>