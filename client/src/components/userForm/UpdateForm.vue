<template>
    <div class="full-width">
        <q-form
        @submit.prevent="validate"
        >   
            <div class="row justify-between items-center">
                <q-input
                style="width: 48%;"
                    color="cyan-10"
                    outlined
                    v-model="name"
                    label="Firstname"
                    typt="text"
                    :rules="[val => val != null  || 'Please insert the user firstname']"
                    lazy-rules
                />
    
                <q-input
                    style="width: 48% ;"
                    color="cyan-10"
                    outlined
                    v-model="lastname"
                    label="Lastname"
                    typt="text"
                    :rules="[val => val != null || 'Please insert the user lastname']"
                    lazy-rules
                />
            </div>

            <q-toggle
                :label="userType"
                color="cyan-9"
                false-value="Simple user"
                true-value="Administrator"
                v-model="userType"
            />

            <q-btn
            class="full-width"
            color="cyan-9" 
            type="submit"
            label="Update"
            icon-right="send"
            :loading="isLoading"
            />
        </q-form>
    </div>
</template>


<script setup>
defineOptions({
    name: "UpdateserForm"
})

import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { requestSuccess, requestWarning, requestError } from 'src/utils/customNotification';

const emit = defineEmits(["success"])
const props = defineProps({index:Number})

const store = useUserStore()

const name = ref(store.userList[props.index].name)
const lastname = ref(store.userList[props.index].lastname)
const userType = ref((store.userList[props.index].isAdmin) ? "Administrator" : "Simple user")

const isLoading = ref(false)


const validate = async () => {
    isLoading.value = true
    try {
        let body = {
            name: name.value,
            lastname: lastname.value,
            isAdmin: (userType.value === "Administrator") ? true : false
        }
        
        const response = await store.updateUserAction(store.userList[props.index].id, body, props.index)
        if(response.res) {
            requestSuccess("The user has been updated with success.")
            emit("success")
        } else {
            console.log(response)
            requestWarning(response.message.message)
        }
        isLoading.value = false
    } catch (error) {
        console.log(error)
        requestError("An error occured, please try again.")
        isLoading.value = false
    }
}


</script>
