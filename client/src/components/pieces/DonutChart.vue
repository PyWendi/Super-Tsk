<template>
    <div>
        <div class="">
            <q-circular-progress
            show-value
            font-size="25px"
            :value="value"
            size="100px"
            :thickness="0.22"
            :color="color"
            track-color="grey-3"
            class="q-ma-md"
            >
                {{value}}%
            </q-circular-progress>
        </div>

        <div class="text-center text-overline"
        :class="'text-' + color"
        >
            {{ textStatus }}
        </div>
    </div>
</template>


<script setup>
defineOptions({
    name: "DonutChart"
})

import { ref, onBeforeMount } from 'vue';
import { useUserStore } from 'src/stores/userStore';

const props = defineProps({
    status: String,
    value: Number
})

const store = useUserStore()

const color = ref("grey")
const textStatus = ref("pending")

onBeforeMount(() => {
    checkColor()
    checkStatus()
})

const checkColor = () => {
    if (props.status === "pending") color.value = "grey"
    else if (props.status === "working") color.value = "green-8"
    else if (props.status === "completed") color.value = "blue-5"
}

const checkStatus = () => {
    if (props.status === "pending") textStatus.value = "Pending"
    else if (props.status === "working") textStatus.value = "Working on"
    else if (props.status === "completed") textStatus.value = "Completed"
}


</script>

<style>
.border {
    border: 2px solid rgb(230, 230, 230);
    border-radius: 10px;
}
</style>