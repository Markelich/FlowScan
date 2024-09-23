<script setup>
defineProps({
    changeStateModal: Function
})

</script>

<template>
    <div class="fixed flex justify-center items-center h-full w-full z-20">  
        <div class="absolute h-full w-full bg-black opacity-45"></div>
        <div class="flex modal-field relative bg-white z-10">
            <div class="modal-field-info">
                <div class="h-8 w-8 bg-black" @click="changeStateModal"></div>
            </div>
        </div>
    </div>
</template>

<style>
.modal-field {
    width: 70%;
    border-radius: 15px;
    padding-top: 40%;
}

.modal-field-info {

    position: absolute;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    top: 10px;
    left: 10px;
    background-color: rgb(55, 133, 201);
}
</style>