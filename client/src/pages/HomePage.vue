<template>
    <div>
        <p>Hello world</p>

        <p>Here is the sub component</p>
        <div>
            <router-view/>
        </div>
    </div>
</template>



<script setup>
import { onBeforeMount } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { checkUserAuth } from 'src/utils/checkUserAuth';
import { useRouter } from 'vue-router';
import { decodedToken } from 'src/stores/tokenManagement';

/**
 * All constant functions and hoks
*/
const router = useRouter()
const userStore = useUserStore()

/**
 * Hooks
*/
onBeforeMount(() => {
    authCheck()
})

/**
 * All functions
*/
const authCheck = async () => {
    if(checkUserAuth()){
        const decoded = await decodedToken()
        // Set user information
        await userStore.getCurrentUserAction(decoded.userId)
        if(decoded.isAdmin){
            // Redirect the user according to his role
            router.push({name: "user_management"})
        }
    }else {
        router.push("/")
    }
}

</script>



<style>

</style>