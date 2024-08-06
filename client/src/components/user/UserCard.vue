<template>
    <div
    style="width: 100%;"
    class="border q-mx-auto q-pa-md row justify-between items-center">
        <!-- avatart -->
        <div 
        style="width: 70%;"
        class="row items-center">
            <q-avatar 
            size="40px" 
            font-size="25px" 
            color="grey" 
            text-color="white" 
            icon="person" >
                <q-badge color="yellow-8" floating v-if="userData.isAdmin">
                    <q-icon name="https"></q-icon>
                </q-badge>
            </q-avatar>
            <!-- User name and lastname -->
            <div class="q-ml-sm"
            
            >
                <!-- name -->
                <div class="text-uppercase text-caption useComfortaa row items-center">
                    <div>{{ userData.name }}</div> 
                    <!-- <div class=" q-pl-sm" v-if="userData.isAdmin">
                        <q-icon 
                        name="star" 
                        color="yellow-7" size="20px"/>
                    </div> -->
                </div>

                <!-- lastname -->
                 <div class="text-caption useComfortaa">
                    {{ userData.lastname }}
                 </div>
            </div>
        </div>

        <!-- Button for crud -->
        <div
        style="width: 13%;">

            <q-btn
            flat
            style="width: 90%;"
            icon="more_vert"
            rounded
            >
                <q-menu auto-close>
                    <q-list>
                        <q-item clickable @click="openUpdateModal">
                            <q-list-section>Update</q-list-section>
                        </q-item>
                        <q-item clickable v-if="!userData.isAdmin" @click="getTasks">
                            <q-list-section>Tasks</q-list-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
            
        </div>

        <FormDialog 
        title="Update user information"
        :open="openUpdate" 
        @close="closeUpdateModal">
            <UpdateForm 
            @success="closeUpdateModal"
            :index="props.index"/>
        </FormDialog>

    </div>
</template>

<script setup>
defineOptions({
    name: "UserCard"
})

import { ref } from 'vue';
import FormDialog from '../dialogs/FormDialog.vue';
import UpdateForm from '../userForm/UpdateForm.vue';
import { useTaskStore } from 'src/stores/taskStore';
import { useUserStore } from 'src/stores/userStore';

const props = defineProps({
    userData: Object,
    index: Number
})

const store = useTaskStore()
const user = useUserStore()

const openUpdate = ref(false)

const openUpdateModal = () => {
    openUpdate.value = true
}

const closeUpdateModal = () => {
    openUpdate.value = false
}

const getTasks = async () => {
    const response = await store.getUsertaskByAdminACtion(props.userData.id)
    user.setUserDetail(props.userData)
} 


</script>


<style>
.border {
    border: 1px solid rgb(209, 209, 209);
    border-radius: 5px;
}

.custom-size {
    font-size: 10px!;
}
</style>