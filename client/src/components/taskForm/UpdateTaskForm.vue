<template>
    <div class="full-width">
        <q-form
        @submit.prevent="validate"
        >   
            <q-input
                color="cyan-10"
                outlined
                v-model="name"
                label="Task name"
                type="text"
                :rules="[val => val != null  || 'Please insert the user firstname']"
                lazy-rules
            />

            <q-input
                color="cyan-10"
                outlined
                v-model="description"
                label="Description"
                type="textarea"
                autogrow
                :rules="[val => val != null || 'Please insert the user lastname']"
                lazy-rules
            />

            <div class="row items-center q-mb-sm">
                <div class="text-h6 text-cyan-10">Status :</div>
                <div class="q-gutter-sm ">
                    <q-radio keep-color v-model="status" val="pending" label="Pending" color="grey"/>
                    <q-radio keep-color v-model="status" val="working on" label="Working on" color="green-8"/>
                    <q-radio keep-color v-model="status" val="completed" label="Completed" color="blue-5"/>
                </div>
            </div>

            <!-- Owner -->
            <div class="row items-center justify-start q-mb-sm">
                <div class="q-mr-sm row justify-center items-center">
                    <q-avatar 
                    class=""
                    size="25px" 
                    font-size="20px" 
                    color="white" 
                    text-color="cyan-9" 
                    icon="task" />
                    <div class="text-cyan-9  text-weight-regular">
                        Affected to :
                    </div>
                </div> 
                <div class="text-grey text-uppercase text-weight-regular useComfortaa">
                    {{ user.userDetail.name }}
                </div>
            </div>


            <q-btn
            class="full-width"
            color="cyan-9" 
            type="submit"
            label="Submit"
            icon-right="send"
            :loading="isLoading"
            />
        </q-form>
    </div>
</template>


<script setup>
defineOptions({
    name: "UpdateTaskForm"
})

import { ref } from 'vue';
import { useTaskStore } from 'src/stores/taskStore';
import { useUserStore } from 'src/stores/userStore';
import { requestSuccess, requestWarning, requestError } from 'src/utils/customNotification';

const emit = defineEmits(["success"])
const props = defineProps({
    data: Object
})

console.log(props)

const store = useTaskStore()
const user = useUserStore()

const name = ref(props.data.name)
const description = ref(props.data.description)
const status = ref(props.data.status)
const isLoading = ref(false)


const validate = async () => {
    isLoading.value = true
    try {
        let body = {
            id: props.data.id,
            name: name.value,
            description: description.value,
            status: status.value,
        }

        const response = await store.updateTaskAction(body)
        if(response.res) {
            requestSuccess("Task modification done with success.")
            emit("success")
        } else {
            console.log(response)
            requestWarning(response.message)
        }
        isLoading.value = false
    } catch (error) {
        console.log(error)
        requestError("An error occured, please try again.")
        isLoading.value = false
    }
}


</script>
