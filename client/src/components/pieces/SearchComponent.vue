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
              <q-btn 
			  round 
			  dense 
			  flat 
			  icon="search" 
			  :loading="loading"
			  @click="search" />
            </template>
          </q-input>
    </div>
</template>


<script setup>
defineOptions({
    name: "SearchComponent"
})

import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';

const store = useUserStore()

const text = ref(null)
const loading = ref(false)

const search = async () => {
	loading.value = true
	try {
	
		if(text.value === null || text.value.length === 0) {
			await store.getAllUserAction()
		} else {
			await store.getUserByNameAction(text.value)
		}
	
		loading.value = false
	
	} catch (error) {
		console.error(error)
		loading.value = false
	}
}

</script>