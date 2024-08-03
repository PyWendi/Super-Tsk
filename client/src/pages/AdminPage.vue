<template>
    <div>
        <q-layout view="hHh LpR lFr">

            <q-header bordered class="bg-cyan-10 text-indigo-2 q-pa-lg row justify-between items-center">
                <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->
                <LogoHeaderComponent />
                
                <q-btn 
                @click="openLogout=true"
                flat 
                bordered 
                color="white text-h5">
                    <div>Logout</div>
                    <q-icon right size="1.2em" style="font-weight: 400;" name="logout" />
                </q-btn>
            </q-header>
        
            <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
              <!-- drawer content -->
            </q-drawer>
        
            <q-page-container>
                <router-view />
            </q-page-container>
        
        </q-layout>

        <!-- Dialog Section -->
        <ConfirmDialog 
        @callback="confirmLogout" 
        text="Are you sure you want to logout ?" 
        :open="openLogout"/>
    </div>
</template>



<script setup>
import { onBeforeMount } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { checkUserAuth } from 'src/utils/checkUserAuth';
import { useRouter } from 'vue-router';
import { decodedToken } from 'src/stores/tokenManagement';
import LogoHeaderComponent from 'src/components/pieces/LogoHeaderComponent.vue';
import { useQuasar, QSpinnerIos } from 'quasar';
import ConfirmDialog from 'src/components/dialogs/ConfirmDialog.vue';
import { ref } from 'vue';

/**
 * All constant functions and hoks
*/
const router = useRouter()
const userStore = useUserStore()
const $q = useQuasar()

/**
 * All Reactive Variables
 */
const openLogout = ref(false)


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
        await userStore.getUserAction(decoded.userId)
        if(!decoded.isAdmin){
            // Redirect the user according to his role
            router.push({name: "home"})
        }
    }else { 
        router.push("/")
    }
}

const confirmLogout = async (confirmed) => {
    openLogout.value = false
    $q.loading.show({
        spinner: QSpinnerIos,
        spinnerColor: "cyan",
        message: "Logout processing, please wait...",
        messageColor: "white"
    })

    if(confirmed){
        if(userStore.logoutUser()) {
            $q.loading.hide  
            router.push("/")
        }
    
        $q.loading.hide()
    }
    $q.loading.hide()
}

</script>



<style>

</style>