<template>
    <div>
        <q-card flat bordered round class="card-specs">
            <div class="centerised">

                <LogoComponent />
                
                <div class="text-h5 q-mt-md text-center text-cyan-10">
                    Welcome Back
                </div>
    
                <div class="q-mt-md q-px-xl">
                    <q-form
                    @submit.prevent="validate"
                    @reset="reset"
                    >
                        <q-input
                            class="width"
                            v-model="email"
                            label="Your email addess"
                            type="email"
                            :dense="true"
                            :rules="[emailValidator]"
                            lazy-rules
                        />
    
                        <q-input
                        class="width"
                        v-model="password"
                        label="Insert your password"
                        :type=" isPass ? 'password' : 'text'"
                        :dense="true"
                        :rules="[ val => val && val.length > 8 || 'la longueur du mot de passe doit dépassé les 8 caractères.']"
                        lazy-rules>
                            <template v-slot:append>
                                <q-icon
                                :name="isPass ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPass = !isPass"
                                />
                            </template>
                        </q-input>
    
                        <div class="row justify-between">
                            <q-btn 
                            style="width:48%;" 
                            label="Submit" 
                            type="submit" 
                            color="cyan-9"/>
                            
                            <q-btn 
                            outline 
                            style="width:48%;" 
                            label="Clear"  
                            type="reset" 
                            color="cyan-9" />
                        </div>
    
                        <br>
                        <hr class="text-indigo-1" style="width:100%;  border:dashed;">
                        <br>
    
                    </q-form>
    
                </div>

            </div>

            <!-- Wave -->
            <div class="absolute-bottom">
                <q-img
                    Loading
                    src="images/wave.svg"
                    width="100%"
                    :ratio="4/3"
                    style=" height: 15vh"
                />
            </div>
        </q-card>
    </div>
</template>


<script setup>
import {  ref } from 'vue'
import { useQuasar } from 'quasar';
import { useUserStore } from 'src/stores/userStore';
import { useRouter } from 'vue-router';
import { emailValidatorRule } from 'src/utils/emailValidation';
import { decodedToken } from 'src/stores/tokenManagement';
import LogoComponent from 'src/components/pieces/LogoComponent.vue';

defineOptions({
    name: "LoginForm",
})

const $q = useQuasar()
const router = useRouter()
const store = useUserStore()

const isPass = ref(true)
const email = ref(null)
const password = ref(null)

function sendPositive(text) {
    $q.notify({
        color: 'white',
        textColor: 'black',
        icon: 'cloud_done',
        iconColor: 'indigo-9',
        message: text,
        position:'bottom',
    })
}
function sendWarning(text) {
    $q.notify({
        color: 'orange-4',
        textColor: 'white',
        icon: 'warning',
        message: text
    })
}
function sendNegative(text) {
    $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: text
    })
}

function reset() {
    email.value = null
    password.value = null
}

function emailValidator() {
    return emailValidatorRule(email.value)
}

async function validate() {
    const loginData = {
        email: email.value,
        password: password.value
    }

    try {
        const logResponse = await store.logUser(loginData)

        if (logResponse.res) {
            sendPositive("You are signin successfully, you will be redirected...")
            const decoded = await decodedToken()
            setTimeout(() => {
                (decoded.isAdmin) ? router.push({name: "user_management"}) : router.push({name: "home"})
            },2000)
        } else {
            console.log(logResponse)
            sendWarning(logResponse.message)
            reset()
        }
    } catch (error) {
        sendNegative('Une erreur est survenue')
    }
}
</script>


<style>
    .width{
        width: 100%;
    }

    .card-specs {
        width: 30%;
        height: 70vh;
        margin: auto;
    }

    .centerised {
        width: 90%;
        position: absolute;
        top: 47%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @media only screen and (max-width: 1000px) {
        /* For mobile: */
        .card-specs{
            width: 90%;
        }
    }
</style>
