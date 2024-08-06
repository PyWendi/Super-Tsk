<template>
    <div >
        <q-dialog 
        backdrop-filter="blur(4px) saturate(150%)"
        :model-value="props.open" 
        persistent>
            <q-card>
                <q-card-section class="row justify-start items-center">
                    <div style="width: 10%;">
                        <q-avatar
                        :icon="icon" 
                        color="red-5" 
                        text-color="white" 
                        size="3em"
                        />
                    </div>
                    <div style="width: 90%">
                        Are you sure to delete the task named 
                        <span class="text-red-6">{{data.name}}</span>, which is 
                        affected to the user
                        <span class="text-grey-6 useComfortaa">
                            {{user.userDetail.name}} {{user.userDetail.lastname}}
                        </span>
                    </div>
                </q-card-section>
        
                <q-card-actions align="right">
                    <q-btn 
                    flat 
                    label="Cancel" 
                    color="red-5" 
                    @click="cancelDelete()"
                    />
                    <!-- v-close-popup=""  -->
                    
                    <!-- v-close-popup="confirmDelete(true)" -->
                    <q-btn 
                    @click="confirmDelete()"
                    flat
                    rounded
                    :loading="isLoading"
                    label="Confirm" 
                    color="cyan-9"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
  
<script setup>
defineOptions({
    name: "DeleteDialog"
})

import { useUserStore } from 'src/stores/userStore';
import { useTaskStore } from 'src/stores/taskStore';
import { requestSuccess, requestWarning, requestError } from 'src/utils/customNotification';
import { ref } from 'vue';

const emit = defineEmits(["callback"])
const props = defineProps({
    open: Boolean,
    icon: String,
    data: Object
})

const store = useTaskStore()
const user = useUserStore()

const isLoading = ref(false)

const cancelDelete = () => emit("callback")

const confirmDelete = async () => {
    isLoading.value = true
    try {
        const response = await store.deleteTaskAction(props.data.id)
        if(response.res) {
            console.log(props)
            requestSuccess("The task have been deleted with success.")
            emit("callback")
        } else {
            requestWarning(response.message)
        }
        isLoading.value = false

    } catch (error) {
        console.log(error)
        requestError("An error occured, please check your connectivity and try again.")
        isLoading.value = false
    }
}


</script>
  