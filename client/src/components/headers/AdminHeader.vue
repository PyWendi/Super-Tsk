<template>
    <div 
    style="width: 100%;"
    >
        <div class="bg-cyan-10 q-px-lg q-pb-sm row justify-between items-center">
            <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->
            <LogoHeaderComponent />
                    
            <q-btn 
            @click="openLogout=true"
            flat 
            bordered 
            color="white text-h5 text-capitalize q-hoverable">
                <div>Logout</div>
                <q-icon right size="1.2em" style="font-weight: 400;" name="logout" />
            </q-btn>


        </div>
        <!-- Dialog Section -->
        <ConfirmDialog 
        @callback="confirmLogout" 
        text="Are you sure you want to logout ?" 
        icon="logout"
        :open="openLogout"/>
    </div>
</template>

<script setup>

defineOptions({
    name: "AdminHeader"
})

import { ref } from 'vue';
import ConfirmDialog from '../dialogs/ConfirmDialog.vue';
import { useRouter } from 'vue-router';
import { useQuasar, QSpinnerIos } from 'quasar';
import LogoHeaderComponent from '../pieces/LogoHeaderComponent.vue';
import { useUserStore } from 'src/stores/userStore';

const $q = useQuasar()
const router = useRouter()
const store = useUserStore()

const openLogout = ref(false)




const confirmLogout = async (confirmed) => {
    openLogout.value = false
    $q.loading.show({
        spinner: QSpinnerIos,
        spinnerColor: "white",
        message: "Logout processing, please wait...",
        messageColor: "white"
    })

    if(confirmed){
        if(store.logoutUser()) {
            $q.loading.hide  
            router.push("/")
        }
    
        $q.loading.hide()
    }
    $q.loading.hide()
}

</script>