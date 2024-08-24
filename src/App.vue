<script setup>
import Header from './components/Header.vue'

//----------------------------------------------------------------------------------
</script>

<template>
  <div class="wrapper bg-gray-100">
    <Header />
    <div class="main-content min-h-screen p-8 flex flex-col justify-stretch">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style>
.main-content {
  max-width: 2560px;
  margin: 0px auto;
}
</style>
