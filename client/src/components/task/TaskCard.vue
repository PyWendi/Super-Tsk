<template>
    <div class="bg-white q-py-sm q-px-md border-custom">
        <div>
            <!-- Task status -->
            <div class="row justify-between items-center">
                <q-avatar size="15px" :color="avatarColor" text-color="white" />
                <div>
                    <q-btn
                    flat
                    style="width: 90%;"
                    icon="more_vert"
                    rounded
                    >
                        <q-menu auto-close>
                            <q-list>
                                <q-item clickable @click="openUpdateModal">
                                    <q-list-section>Update</q-list-section>
                                </q-item>
                                <q-item clickable class="text-red-5">
                                    <q-list-section>Delete</q-list-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
            </div>
            
            <!-- Task name -->    
            <div class="q-pt-xs text-overline">
                {{name}}
            </div>

            <!-- Task description -->
            <p class="text-grey wrap-text wrap">
                {{ description }}
            </p>

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
const updateModal = ref(false)

onBeforeMount(() => {
    setAvatarColor()
})

const setAvatarColor = () => {
    if (props.status === "pending") avatarColor.value = "grey"
    else if (props.status === "working") avatarColor.value = "green-8"
    else if (props.status === "completed") avatarColor.value = "blue-5"
}   

const openUpdateModal = () => updateModal.value = true

</script>


<style>
.border-custom{
    border-radius: 20px;
}

.wrap-text {
    overflow-wrap: break-word;
    text-overflow: ellipsis;
}
</style>