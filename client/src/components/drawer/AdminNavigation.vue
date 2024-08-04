<template>
    <div class="q-mt-lg">

        <!-- User information -->
        <div class="q-mb-lg q-pb-md bordered">
            <!-- Avatar -->
             <div class="row justify-center">
                <q-avatar size="50px" font-size="30px" color="grey" text-color="white" icon="group" />
             </div>

            <!-- name -->
             <div class="q-px-sm q-pt-sm text-center">
                <div class="q-mb-sm text-h6">
                    {{ store.userData.name }}   
                </div>
                 
                <!-- lastname -->
                <div class="text-h6">
                    {{ store.userData.lastname }}
                </div>
             </div>
        </div>

        <div class="column justify-center items-center">
            <!-- User management navigation -->
            <div
            v-for="(elem, index) in navigation"
            @click="setActive(index)"
            :key="index"
            :class="[elem.isActive ? 'text-cyan-8' : 'text-grey-7', 'column justify-center items-center q-mb-lg show-hover']"
            flat
            >
                <q-icon 
                :color="elem.isActive ? 'cyan-8' : 'grey-7'"
                size="3em" 
                style="font-weight: 400;" 
                :name="elem.iconName" />

                <span class="text-h5 text-uppercase text-center">
                    {{ elem.text }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineOptions({
    name: "AdminNavigation"
})

import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/userStore';

const router = useRouter()
const store = useUserStore()

const navigation = ref([
    {
        isActive: true,
        iconName: "group",
        text: "Users",
        pathName : "user_management"
    },
    {
        isActive: false,
        iconName: "list",
        text: "Tasks",
        pathName: "task_management"
    }
])

const setActive = (index) => {
    let path = null
    navigation.value.map((elem, i) => {
        if (i === index) {
            navigation.value[i].isActive = true
            path = navigation.value[i].pathName
        } else {
            navigation.value[i].isActive = false
        }
    })

    router.push({name: path})
}

onBeforeMount(() => {
    store.getCurrentUserAction()
    console.log(store.userData)
})


</script>

<style>
.show-hover{
    border: 1px solid white;
    padding-right: 10px;
    padding-left: 10px;
    cursor: pointer;
    transition: 0.3s;
}

.show-hover:hover {
    border: 1px solid rgb(3, 163, 163);
    border-radius: 5px;
    transition: 0.2s;
}

.bordered {
    border-bottom: 2px dashed grey;
}

</style>