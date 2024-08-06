<template>
    <div >
        <q-dialog 
        backdrop-filter="blur(4px) saturate(150%)"
        :model-value="props.open" 
        persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar 
                    :icon="icon" 
                    color="cyan-9" 
                    text-color="white" 
                    size="3em"
                    />
                    <span class="q-ml-sm">{{text}}</span>
                </q-card-section>
        
                <q-card-actions align="right">
                    <q-btn 
                    flat 
                    label="Cancel" 
                    color="red-5" 
                    @click="confirmLogout(false)"
                    />
                    <!-- v-close-popup=""  -->
                    
                    <!-- v-close-popup="confirmLogout(true)" -->
                    <q-btn 
                    @click="confirmLogout(true)"
                    flat
                    rounded
                    label="Confirm" 
                    color="cyan-9"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
  
<script setup>

defineOptions({
    name: "ConfirmDialog"
})
const emit = defineEmits(["callback"])
const props = defineProps({
    text: String,
    open: Boolean,
    icon: String
})


const confirmLogout = (confirmed) => {
    emit("callback", confirmed)
}


</script>
  