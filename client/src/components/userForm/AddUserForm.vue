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

            <q-input
                color="cyan-10"
                outlined
                v-model="email"
                label="Your email addess"
                type="email"
                :rules="[emailValidationRule]"
                lazy-rules
            />

            <q-toggle
                :label="userType"
                color="cyan-9"
                false-value="Simple user"
                true-value="Administrator"
                v-model="userType"
            />

            <q-input
            color="cyan-10"
            outlined
            v-model="password"
            label="Insert your password"
            :type=" isPass ? 'password' : 'text'"
            :rules="[ val => val && val.length > 8 || 'Password length should exceed 8 characters']"
            lazy-rules>
                <template v-slot:append>
                    <q-icon
                    :name="isPass ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPass = !isPass"
                    />
                </template>
            </q-input>

            <q-input
            color="cyan-10"
            outlined
            v-model="password2"
            label="Insert your password"
            :type=" isPass2 ? 'password' : 'text'"
            :rules="[ 
                val => val && val.length > 8 || 'Password length should exceed 8 characters',
                val => val === password || 'The passowrds doesn\'t match.'
            ]"
            lazy-rules>
                <template v-slot:append>
                    <q-icon
                    :name="isPass2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPass2 = !isPass2"
                    />
                </template>
            </q-input>

            <q-btn
            class="full-width"
            color="cyan-9" 
            type="submit"
            label="Submit"
            icon-right="send"
            :loading="isLoading"
            />
        </q-form>

        <!-- New user's password check -->
        <q-dialog v-model="checkPass" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <div>
                        <q-avatar
                        icon="done"
                        color="cyan-9"
                        text-color="white"
                        size="40px"
                        class="q-mr-md"
                        />
                    </div>
                    <div class="text-h6"><span class="text-cyan-10">User creation done.</span></div>
                </q-card-section>
        
                <q-card-section class="q-pt-none">
                    The new user's password is "<span class="text-cyan-10 text-h6">{{ password }}</span>". Take note of it somewhere, it will not appear a second time.
                </q-card-section>
        
                <q-card-actions align="right">
                    <q-btn flat label="OK" color="cyan-9" @click="passwordCheckDone" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </div>
</template>


<script setup>
defineOptions({
    name: "AddUserForm"
})

import { ref } from 'vue';
import { emailValidatorRule } from 'src/utils/emailValidation';
import { useUserStore } from 'src/stores/userStore';
import { requestSuccess, requestWarning, requestError } from 'src/utils/customNotification';
import { Loading } from 'quasar';

const emit = defineEmits(["success"])

const store = useUserStore()

const name = ref(null)
const lastname = ref(null)
const email = ref(null)
const userType = ref("Simple user")
const password = ref(null)
const password2 = ref(null)


const isPass = ref(true)
const isPass2 = ref(true)
const checkPass = ref(false)
const isLoading = ref(false)


const emailValidationRule = () => {
    return emailValidatorRule(email.value)
}

const passwordCheckDone = () => {
    checkPass.value = false
    emit("success")
}

const validate = async () => {
    isLoading.value = true
    try {
        let body = {
            name: name.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            isAdmin: (userType.value === "Administrator") ? true : false
        }
    
        const response = await store.registerUser(body)
        if(response.res) {
            requestSuccess("The user is create with success.")
            checkPass.value = true
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
