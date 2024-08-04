<template>
    <div class=" full-width bg-white q-px-xl q-py-lg">
        <!-- Head -->
         <div class="row justify-between items-center">
            <!-- Count of all user -->
            <div class="text-h6 text-grey-7">
                Count of all users : <span>{{store.userList.length}}</span>
            </div>

            <!-- Search user -->
            <div style="width: 350px;">
                <SearchComponent/>
            </div>
         </div>
    </div>
</template>



<script setup>
defineOptions({
    name: "UserManagementPage"
})

import { ref, onBeforeMount } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import SearchComponent from 'src/components/pieces/SearchComponent.vue';


const store = useUserStore()

onBeforeMount(() => {
    store.getAllUserAction()
})


</script>



<style>

</style>