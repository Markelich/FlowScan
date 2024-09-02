<script setup>
import Chart from 'chart.js/auto'
import axios from 'axios';
import { onMounted, ref } from 'vue';







</script>

<template>
  <div class="graph-wrapper flex">
    <div class="graph-content bg-white border rounded-lg overflow-auto flex flex-col grow">
      <!-- <div class="h-10 w-full bg-cyan-400"></div> -->
      <div class="w-full h-full grow">
        <canvas id="Chart"></canvas>
      </div>
    </div>
  </div>
</template>

<style>
.graph-wrapper {
  width: 50%;
}

.graph-content {
  padding: 20px 30px 20px 20px;
  /* max-height: 563px; */
  /* max-height: 800px; */
}
</style>
