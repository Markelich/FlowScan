<script setup>
import Chart from 'chart.js/auto'
import { onMounted } from 'vue'

const displayMainChart = () => {
  const ctx = document.getElementById('Chart')
  const cfg = {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }
      ]
    },
    options: {
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }

  const mainChart = new Chart(ctx, cfg)
}

onMounted(displayMainChart)
onMounted(displayMainChart)
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
  /* max-height: 563px; */
  /* max-height: 800px; */
}
</style>
