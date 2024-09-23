<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    getAllLastDataTraffic: Function,
    displayChart: Function
})


onMounted(async() => {
    console.log(12)
    console.log(13)
})
</script>


<template>
    <div class="w-full h-full grow">
        <canvas id="Chart"></canvas>
    </div>
</template>