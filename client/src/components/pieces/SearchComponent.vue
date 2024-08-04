<template>
    <div>
        <q-input
        class="q-mb-none q-pb-none" 
        outlined 
        bottom-slots 
        v-model="text" 
        color="cyan-8"
        dense
        label="Search users by their name" 
        maxlength="30">
            <template v-slot:append>
              <q-btn round dense flat icon="search" />
            </template>
          </q-input>
    </div>
</template>


<script setup>
defineOptions({
    name: "SearchComponent"
})

import { ref } from 'vue';

const text = ref(null)

</script>