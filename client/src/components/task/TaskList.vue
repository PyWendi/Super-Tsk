<template>
    <div>
    
        <div class="q-pa-lg full-width row justify-between ">
            
            <!-- Pending section -->
            <div class="column justify-center items-center custom-width">
                <!-- Add button -->
                <q-btn
                style="width: 100%;"
                color="cyan-9 q-py-sm"
                dense
                unelevated
                bordered
                class="row justify-between items-center"
                >
                    <!-- font-size="40px"  -->
                    <div class="text-hoverline text-white">Add task</div>
                    <q-icon 
                    size="20px" 
                    color="white" 
                    text-color="white" 
                    name="add" />
                </q-btn>
            </div>
    
            <!-- Working On section -->
            <div class="column justify-center items-center custom-width">
                <q-btn
                style="width: 100%;"
                color="cyan-9 q-py-sm"
                dense
                unelevated
                bordered
                class="row justify-between items-center"
                >
                    <!-- font-size="40px"  -->
                    <div class="text-hoverline text-white">Add task</div>
                    <q-icon 
                    size="20px" 
                    color="white" 
                    text-color="white" 
                    name="add" />
                </q-btn>
            </div>
    
            <!-- Completed section -->
            <div class="column justify-center items-center custom-width">
                <q-btn
                style="width: 100%;"
                color="cyan-9 q-py-sm"
                dense
                unelevated
                bordered
                class="row justify-between items-center"
                >
                    <!-- font-size="40px"  -->
                    <div class="text-hoverline text-white">Add task</div>
                    <q-icon 
                    size="20px" 
                    color="white" 
                    text-color="white" 
                    name="add" />
                </q-btn>
    
            </div>

            <div class="q-pt-md full-width row justify-between items-baseline">

                <div class="q-pt-md column justify-between custom-card-width">
                    <TaskCard 
                    name="Firt Task"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A id voluptate hic maxime, vero laborum voluptates accusantium eligendi quis suscipit."
                    id="0"
                    index="0"
                    status="pending" 
                    class="full-width q-mb-md" />
                </div>


                <div class="q-pt-md f column justify-between custom-card-width">
                    <TaskCard 
                    name="Second Task"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A id voluptate hic maxime, vero laborum voluptates accusantium eligendi quis suscipit."
                    id="0"
                    index="0"
                    status="working" 
                    class="full-width q-mb-md" />

                    <TaskCard 
                    name="Second Task"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A id voluptate hic maxime, vero laborum voluptates accusantium eligendi quis suscipit."
                    id="0"
                    index="0"
                    status="working" 
                    class="full-width q-mb-md" />

                    <TaskCard 
                    name="Second Task"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A id voluptate hic maxime, vero laborum voluptates accusantium eligendi quis suscipit."
                    id="0"
                    index="0"
                    status="working" 
                    class="full-width q-mb-md" />

                    <TaskCard 
                    name="Second Task"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A id voluptate hic maxime, vero laborum voluptates accusantium eligendi quis suscipit."
                    id="0"
                    index="0"
                    status="working" 
                    class="full-width q-mb-md" />
                </div>


                <div class="q-pt-md  column justify-between custom-card-width">
                    <TaskCard 
                    name="Third Task"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A id voluptate hic maxime, vero laborum voluptates accusantium eligendi quis suscipit."
                    id="0"
                    index="0"
                    status="completed" 
                    class="full-width q-mb-md" />

                    <TaskCard 
                    name="Third Task"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A id voluptate hic maxime, vero laborum voluptates accusantium eligendi quis suscipit."
                    id="0"
                    index="0"
                    status="completed" 
                    class="full-width q-mb-md" />
                </div>


            </div>
        </div>
    </div>
</template>


<script setup>
import TaskCard from './TaskCard.vue';

defineOptions({
    name: "TaskList"
})



</script>

<style>
.custom-width{
    width: 32%;
}
.custom-card-width{
    width: 32%;
}
</style>