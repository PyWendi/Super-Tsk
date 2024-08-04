<template>
    <div class="bg-white q-py-sm q-px-md border-custom">
        <div>
            <!-- Task status -->
            <div>
                <q-avatar size="15px" :color="avatarColor" text-color="white" />
            </div>
            
            <!-- Task name -->    
            <div class="q-pt-xs text-overline">
                {{name}}
            </div>

            <!-- Task description -->
            <div class="text-grey ">
                {{ description }}
            </div>

            <!-- Created_at -->
            <div>

            </div>
        </div>

        



        <!-- last-Updated -->
    </div>
</template>


<script setup>
defineOptions({
    name: "TaskCard"
})

import { ref, onBeforeMount } from 'vue';

const props = defineProps({
    status: String,
    name: String,
    description: String,
    id: Number,
    index: Number
})

const avatarColor = ref("grey")

onBeforeMount(() => {
    setAvatarColor()
})

const setAvatarColor = () => {
    if (props.status === "pending") avatarColor.value = "grey"
    else if (props.status === "working") avatarColor.value = "green-8"
    else if (props.status === "completed") avatarColor.value = "blue-5"
}   

</script>


<style>
.border-custom{
    border-radius: 20px;
}
</style>