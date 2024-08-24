<template>
  <div class="loader-field">
    <div class="loader" />
  </div>
</template>

<style>
.loader-field {
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  display: block;
  width: fit-content;
  font-weight: bold;
  /* font-family: sans-serif; */
  font-size: 18px;
  padding-bottom: 8px;
  background: linear-gradient(currentColor 0 0) 0 100%/0% 3px no-repeat;
  animation: l2 2s linear infinite;
  color: rgb(97, 39, 131);
}
.loader:before {
  content: 'Loading...';
}
@keyframes l2 {
  to {
    background-size: 100% 3px;
  }
}
</style>
