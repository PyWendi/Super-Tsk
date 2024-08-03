<template>
    <div>
        <div class="centerized">
            <q-card
            flat
            class="column justify-between items-center ">


                <div class="row justify-between mid-width max-height items-center bg-grey-1">
                    <!-- <q-card-section 
                    class="col representation justify-center">
                        <q-img
                        loading
                        src="images/Data extraction-rafiki.svg"
                        width="100%"
                        :ratio="4/3"
                        style=" height: 80vh"
                        >
                        </q-img>
                    </q-card-section> -->

                    <!-- <q-separator vertical/> -->

                    <q-card-section 
                    vertical 
                    class="col justify-center">
                        <LoginForm class="q-ma-auto"/>
                    </q-card-section>
                </div>
            </q-card>
        </div>
    </div>
</template>



<script setup>
import { onBeforeMount } from 'vue';
import LoginForm from 'src/components/login/LoginForm.vue';
import { useRouter } from 'vue-router';
import { checkUserAuth } from 'src/utils/checkUserAuth';
import { useUserStore } from 'src/stores/userStore';
import { decodedToken } from 'src/stores/tokenManagement';

/**
 * All constant functions and hooks
 */
const router = useRouter()
const store = useUserStore()

/**
 * Reactive vars declaration
 */


 /**
  * Hooks
  */
defineOptions({
    name: "LoginPage"
})


/**
 * All functions
 */

// Check if the client is already authenticate
const authCheck = async () => {
    if(checkUserAuth()){
        const decoded = await decodedToken()
        // Set user information
        const response = await store.getUserAction(decoded.userId)
        if(response.res){
            // Redirect the user according to his role
            router.push({name: (decoded.isAdmin) ? "user_management" : "home"})
        }
    }
}

onBeforeMount(() => {
    authCheck()
})





</script>



<style>


.centerized {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
}

.mid-width{
    width: 100%;
}

.max-height {
    height: 100vh;
}

.centered-img {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    z-index: 10000;

    width: 20%;
}

@media only screen and (max-width: 1368px) {
    /* For desktop: */

    .low-white{
        background-color: rgb(238, 247, 254);
        padding: 0px;
    }
}

@media only screen and (max-width: 1000px) {
    /* For mobile: */
    .centerized {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .representation{
        display: none;
    }
}

@media only screen and (max-height: 770px) {
    /* For mobile: */
    .centerized {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}

@media only screen and (max-height: 570px) {
    /* For mobile: */
    .centerized {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}


@media only screen and (max-height: 470px) {
    /* For mobile: */
    .centerized {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}
</style>