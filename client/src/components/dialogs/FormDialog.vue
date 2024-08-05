<template>
    <div>
        <q-dialog
        backdrop-filter="blur(0px) saturate(150%)"
        :model-value="props.open" 
        persistent>
            <q-card
            class="q-px-lg full-width q-py-xl"
            >
                <q-card-section class="row items-center">
                    <div class="full-width text-uppercase text-cyan-9 text-h5 text-center bottom-border-dashed">
                        {{ props.title }}
                    </div>
                </q-card-section>

                <!-- Formular emplacement -->
                <q-card-section>
                    <div class="full-width">
                        <slot></slot>
                    </div>
                </q-card-section>


                <!-- Close modal button -->
                <!-- <q-card-section> -->
                    <div class="row justify-center">
                        <q-btn
                        style="width: 94%;"
                        outline
                        label="CLose form"
                        color="red-8"
                        @click="closeModal"
                        />
                    </div>
                <!-- </q-card-section> -->

            </q-card>
        </q-dialog>        
    </div>
</template>


<script setup>
defineOptions({
    name: "FormDialog"
})


const props = defineProps({
    open: Boolean,
    title: String
})

const emit = defineEmits(['close'])

const closeModal = () => {
    emit("close")
}


</script>


<style>
.bottom-border-dashed {
    border-bottom: 2px dashed rgb(1, 102, 102);
    padding-bottom: 0.5rem;
}
</style>