<template>
    <div class="bg-white q-py-sm q-px-md border-custom">
        
        <div class="text-uppercase text-center q-pa-lg">
            NO {{ status }} task found.
        </div>
        
    </div>
</template>


<script setup>
defineOptions({
    name: "NoCardFound"
})

const props = defineProps({
    status: String,
})


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