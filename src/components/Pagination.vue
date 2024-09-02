<script setup>
defineProps({
  paginationParams: Object,
  selectPage: Function
})
</script>

<template>
  <div v-if="paginationParams.pagesList" class="pagination flex flex-row flex-wrap justify-center gap-2">
    <button class="last-buttons" @click="selectPage" :value="1">First</button>
    <button
      class="midle-buttons"
      @click="selectPage"
      v-for="page in paginationParams.pagesList"
      :key="page"
      :value="page"
    >
      {{ page }}
    </button>
    <button class="last-buttons" @click="selectPage" :value="paginationParams.totalPages">Last</button>
  </div>
</template>

<style>
.pagination > button {
  background-color: white;
  border-width: 1px;
  border-radius: 0.5rem;
}

.midle-buttons {
  width: 45px;
  height: 45px;
}

.last-buttons {
  width: 70px;
}

.pagination > button:hover {
  background-color: rgb(229 231 235);
}

/* .midle-buttons:focus {
  border-width: 2px;

  font-weight: 600;
} */
</style>
