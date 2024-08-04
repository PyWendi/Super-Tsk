<template>
    <div>
        <q-layout view="hHh LpR lFr">

            <q-header bordered class="bg-grey-3 ">
                <AdminHeader />
            </q-header>
        
            <q-drawer 
            width="175"
            class="bg-white"
            show-if-above 
            v-model="leftDrawerOpen" 
            side="left" 
            behavior="desktop" 
            bordered>
                <AdminNavigation/>
            </q-drawer>

            <q-drawer 
            width="400"
            class="bg-white q-px-none"
            show-if-above 
            v-model="leftDrawerOpen" 
            side="right" 
            behavior="desktop" 
            bordered>
                <UserDrawer/>
            </q-drawer>
        
            <q-page-container class="bg-grey-3 low-front max-height">
                <router-view />
            </q-page-container>
        
        </q-layout>

    </div>
</template>



<script setup>
import { onBeforeMount } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { checkUserAuth } from 'src/utils/checkUserAuth';
import { useRouter } from 'vue-router';
import { decodedToken } from 'src/stores/tokenManagement';
import AdminHeader from 'src/components/headers/AdminHeader.vue';
import AdminNavigation from 'src/components/drawer/AdminNavigation.vue';
import { useQuasar, QSpinnerIos } from 'quasar';
import { ref } from 'vue';
import UserDrawer from 'src/components/drawer/UserDrawer.vue';

/**
 * All constant functions and hoks
*/
const router = useRouter()
const userStore = useUserStore()
const $q = useQuasar()

/**
 * All Reactive Variables
 */



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
        if(!decoded.isAdmin){
            // Redirect the user according to his role
            router.push({name: "home"})
        }
    }else { 
        router.push("/")
    }
}


</script>



<style>
.max-height {
    position: fixed;
    height: 100%;
    width: 100%;
}

.front {
    z-index: 100;
}
.low-front{
    z-index: 10;
}
</style>