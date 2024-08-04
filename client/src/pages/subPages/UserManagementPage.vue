<template>
    <div 
    style="width: 100%;"
    class="">
        <!-- Head -->
        <div class="row bg-white justify-around items-center q-px-xl q-py-xs">
            <!-- Count of all user -->
            <div class="text-h6 text-grey-7">
                <DonutChart status="pending" value="20"/>
            </div>

            <div class="text-h6 text-grey-7">
                <DonutChart status="working" value="50"/>
            </div>

            <div class="text-h6 text-grey-7">
                <DonutChart status="completed" value="30"/>
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
import DonutChart from 'src/components/pieces/DonutChart.vue';
import TaskList from 'src/components/task/TaskList.vue';


const store = useUserStore()

onBeforeMount(() => {
    store.getAllUserAction()
})


</script>



<style>
.custom-height {
    height: 80vh;
}

</style>