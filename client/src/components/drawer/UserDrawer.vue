<template>
    <div>
        <!-- Title -->
        <div class="useComfortaa text-h5 text-center q-py-md text-cyan-9 border-b">
            User Management
        </div>

        <div class="row justify-between items-center q-pa-md q-mb-md border-b">
            <div class="custom-size text-cyan-7">
                Count of all users : <span>{{store.userList.length}}</span>
            </div>

            <!-- Search user -->
            <div style="width: 60%;">
                <SearchComponent/>
            </div>
        </div>
        
        <!-- Add user button -->
        <div class="q-pa-md text-center">
            <!-- flat -->
            <q-btn
            style="width: 100%; margin:auto;"
            color="cyan-9"
            dense
            bordered
            class="row justify-center items-center"
            @click="openAddForm"
            >
                <!-- font-size="40px"  -->
                <div class="text-h6 text-white">Add a user</div>
                <q-icon 
                size="30px" 
                color="white" 
                text-color="white" 
                name="add" />
            </q-btn>
        </div>

        <!-- user list -->
        <div>
            <q-scroll-area 
            :thumb-style="{
                right: '4px',
                borderRadius: '5px',
                backgroundColor: '#0E7490',
                width: '5px',
                opacity: 0.75
              }"
            :bar-style="{
                right: '2px',
                borderRadius: '9px',
                backgroundColor: '#0E7490',
                width: '9px',
                opacity: 0.2
              }"
              
            style="height: 550px; width: 90%; margin: auto;">
                <div v-for="(user, index) in store.userList" :key="index" class="q-py-xs">
                    <UserCard :userData="user" :index="index" />
                </div>
            </q-scroll-area>
        </div>

        <FormDialog title="Register a new user" @close="closeAddForm" :open="addForm">
            <AddUserForm @success="closeAddForm"/>
        </FormDialog>
    </div>
</template>


<script setup>
defineOptions({
    name: "UserDrawer"
})

import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import SearchComponent from '../pieces/SearchComponent.vue';
import UserCard from '../user/UserCard.vue';
import FormDialog from '../dialogs/FormDialog.vue';
import AddUserForm from '../userForm/AddUserForm.vue';

const store = useUserStore()
const addForm = ref(false)

const openAddForm = () => {
    addForm.value = true
}

const closeAddForm = () => {
    addForm.value = false
}

</script>

<style>
.border-b{
    border-bottom: 2px dashed rgb(0, 121, 130);
}

.custom-size{
    width: 40%;
    font-size: 15px;
}

</style>
