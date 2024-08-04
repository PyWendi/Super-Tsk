<template>
    <div 
    style="width: 100%;"
    class="border q-mx-auto q-pa-md row justify-between items-center">
        <!-- avatart -->
        <div 
        style="width: 70%;"
        class="row items-center">
            <q-avatar 
            size="40px" 
            font-size="25px" 
            color="grey" 
            text-color="white" 
            icon="person" />
            <!-- User name and lastname -->
            <div class="q-ml-xs"
            
            >
                <!-- name -->
                <div class="text-uppercase text-caption useComfortaa">
                    Rakotondranaivo
                </div>

                <!-- lastname -->
                 <div class="text-caption useComfortaa">
                    Joyaux Wendi Anderson
                 </div>
            </div>
        </div>

        <!-- Button for crud -->
        <div
        style="width: 30%;">
            <q-btn-dropdown 
            outline
            bordered
            dense
            color="cyan-10" 
            label="Actions">
                <q-list>
                    <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                        <q-item-label>Update</q-item-label>
                        </q-item-section>
                    </q-item>
            
                    <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                        <q-item-label>Delete</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
        </div>
    </div>
</template>

<script setup>
defineOptions({
    name: "UserCard"
})


</script>


<style>
.border {
    border: 1px solid rgb(209, 209, 209);
    border-radius: 5px;
}

.custom-size {
    font-size: 10px!;
}
</style>