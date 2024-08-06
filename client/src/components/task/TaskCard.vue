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
            <div class="q-pt-xs useComfortaa">
                {{name}}
            </div>

            <!-- Task description -->
            <p class="text-grey-7 wrap-text wrap q-pb-none q-mb-sm">
                {{ description }}
            </p>

            <!-- updated_at -->
            <!-- <div>
                <div class="text-grey-8 text-caption text-right">
                    Updated {{updatedAt}} ago
                </div> 
            </div> -->

            <!-- Created_at -->
            <div>
                <div class="text-grey text-caption text-right">
                    Affected {{formatTimeDifference()}}
                </div> 
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
import { formatDistanceToNow, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

const props = defineProps({
    status: String,
    name: String,
    description: String,
    id: Number,
    index: Number,
    date: String
})

const avatarColor = ref("grey")
const updateModal = ref(false)
const createdAt = ref("3 days")

onBeforeMount(() => {
    setAvatarColor()
})

const setAvatarColor = () => {
    if (props.status === "pending") avatarColor.value = "grey"
    else if (props.status === "working") avatarColor.value = "green-8"
    else if (props.status === "completed") avatarColor.value = "blue-5"
}   

const formatTimeDifference = () => {
    console.log(props.date)
    const formattedDate = parseISO(props.date);
    return formatDistanceToNow(formattedDate, { locale: enUS, addSuffix: true });
};

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