<template>
    <div>
        <div class="q-px-lg q-pt-sm full-width row justify-between ">
            <!-- Add button -->
            <div 
            v-for="n in 3" :key="n"
            class="column justify-center items-center custom-width">
                <q-btn
                v-if="user.userDetail.id !== 0 "
                style="width: 75%;"
                color="cyan-9 q-py-sm"
                dense
                rounded
                unelevated
                bordered
                class="row justify-between items-center"
                @click="openModal"
                >
                    <q-icon 
                    size="20px" 
                    color="white" 
                    text-color="white" 
                    name="add" />
                </q-btn>
            </div>
    

            <div class="q-pt-md full-width row justify-between items-baseline">
                
                <q-scroll-area
                :thumb-style="{
                    right: '4px',
                    borderRadius: '5px',
                    backgroundColor: '#0E7490',
                    width: '5px',
                    opacity: 0.75
                }"
                :bar-style="{
                    right: '2px',
                    borderRadius: '9px',
                    backgroundColor: '#0E7490',
                    width: '9px',
                    opacity: 0.2
                }"
                
                style="height: 60vh; "
                class=" column justify-between custom-card-width"
                >
                    <NoCardFound v-if="store.taskList.partition.pending.length === 0"
                    status="pending" />

                    <TaskCard v-else
                    v-for="(task, index) in store.taskList.partition.pending" :key="index"
                    :name="task.name"
                    :description="task.description"
                    :id="task.id"
                    :index="index"
                    :status="task.status"
                    :date="task.created_at" 
                    class="full-width q-mb-md" />
                </q-scroll-area>


                <q-scroll-area 
                :thumb-style="{
                    right: '4px',
                    borderRadius: '5px',
                    backgroundColor: '#0E7490',
                    width: '5px',
                    opacity: 0.75
                }"
                :bar-style="{
                    right: '2px',
                    borderRadius: '9px',
                    backgroundColor: '#0E7490',
                    width: '9px',
                    opacity: 0.2
                }"
                
                style="height: 60vh; "
                class=" column justify-between custom-card-width"
                >
                    <NoCardFound v-if="store.taskList.partition.working.length === 0"
                    status="working on" />

                    <TaskCard v-else
                    v-for="(task, index) in store.taskList.partition.working" :key="index"
                    :name="task.name"
                    :description="task.description"
                    :id="task.id"
                    :index="index"
                    :status="task.status"
                    :date="task.created_at" 
                    class="full-width q-mb-md" />
                </q-scroll-area>


                <q-scroll-area 
                :thumb-style="{
                    right: '4px',
                    borderRadius: '5px',
                    backgroundColor: '#0E7490',
                    width: '5px',
                    opacity: 0.75
                }"
                :bar-style="{
                    right: '2px',
                    borderRadius: '9px',
                    backgroundColor: '#0E7490',
                    width: '9px',
                    opacity: 0.2
                }"
                
                style="height: 60vh; "
                class=" column justify-between custom-card-width"
                >
                    <NoCardFound v-if="store.taskList.partition.completed.length === 0"
                    status="completed" />

                    <TaskCard v-else
                    v-for="(task, index) in store.taskList.partition.completed" :key="index"
                    :name="task.name"
                    :description="task.description"
                    :id="task.id"
                    :index="index"
                    :status="task.status"
                    :date="task.updated_at" 
                    class="full-width q-mb-md" />
                </q-scroll-area>


            </div>
        </div>

        <!-- Add form -->
        <FormDialog 
        :open="addModal" 
        title="Add a task to the user" 
        @close="handleClose">
            <AddTaskForm @success="handleClose"/>
        </FormDialog>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useTaskStore } from 'src/stores/taskStore';
import { useUserStore } from 'src/stores/userStore';
import NoCardFound from './NoCardFound.vue';
import TaskCard from './TaskCard.vue';
import FormDialog from '../dialogs/FormDialog.vue';
import AddTaskForm from '../taskForm/AddTaskForm.vue';

defineOptions({
    name: "TaskList"
})

const store = useTaskStore()
const user = useUserStore()

const addModal = ref(false)

const openModal = () => {
    addModal.value = true
}

const handleClose = () => {
    addModal.value = false
}


</script>

<style>
.custom-width{
    width: 32%;
}
.custom-card-width{
    width: 32%;
    text-wrap: pretty;
    line-break: normal;
}
</style>