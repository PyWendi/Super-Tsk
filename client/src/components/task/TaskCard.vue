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
                                <q-item clickable @click="openDeleteModal" class="text-red-5">
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

        <!-- Udpate form -->
        <FormDialog
        :open="updateModal"
        title="Update the task"
        @close="closeUpdateModal">
            <UpdateTaskForm 
            :data="props"
            @success="closeUpdateModal"
            />
        </FormDialog>

        <DeleteDialog
        :open="deleteModal"
        icon="delete"
        @callback="closeDeleteModal"
        :data="props"
        />

    </div>
</template>


<script setup>
defineOptions({
    name: "TaskCard"
})

import { ref, onBeforeMount } from 'vue';
import { formatDistanceToNow, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import FormDialog from '../dialogs/FormDialog.vue';
import UpdateTaskForm from '../taskForm/UpdateTaskForm.vue';
import DeleteDialog from '../dialogs/DeleteDialog.vue';

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
const deleteModal = ref(false)

onBeforeMount(() => {
    setAvatarColor()
})

const setAvatarColor = () => {
    if (props.status === "pending") avatarColor.value = "grey"
    else if (props.status === "working on") avatarColor.value = "green-8"
    else if (props.status === "completed") avatarColor.value = "blue-5"
}   

const formatTimeDifference = () => {
    const formattedDate = parseISO(props.date);
    return formatDistanceToNow(formattedDate, { locale: enUS, addSuffix: true });
};

const openUpdateModal = () => updateModal.value = true
const closeUpdateModal = () => updateModal.value = false

const openDeleteModal = () => deleteModal.value = true
const closeDeleteModal = () => deleteModal.value = false

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