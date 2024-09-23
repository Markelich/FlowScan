<script setup>
import Loader from '../components/Loader.vue'
import { ref } from 'vue';
import Modal from './Modal.vue';
const modal1Visible = ref(false);
const modal2Visible = ref(false);
const setModal1Visible = open => {
  modal1Visible.value = open;
};
</script>



<template>
  <div id="components-modal-demo-position">
    <a-button class="wiew-graph-button text-indigo-500 font-medium" type="link" block @click="modal2Visible = true">View graph</a-button>
    <a-modal
    class="a-modal"
      :footer="[]"
      :closable="false"
      style="width: 60%; height: 70%;"
      v-model:open="modal2Visible"
      centered
      @ok="modal2Visible = false"
    >
      <div class="box-1"> A </div>
      <div class="box-2"> B </div>
      <div class="box-3"> C </div>

    </a-modal>
  </div>
</template>


<style>

.ant-modal-body{
  width: 100%;
  height: 100%;
  display: grid;
  gap: 20px;

  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);
}


  [class^="box-"] {
    background-color: skyblue;
    display: grid;
    place-items: center;
  }

.box-1 {
  grid-column: span 8;
  grid-row: span 2;
}
.box-2 {
  grid-column: span 4;
  grid-row: span 3;
}
.box-3 {
 grid-row: span 1;
 grid-column: span 8;
}



  .ant-modal-content {
    height: 100%;
    width: 100%;
  }
</style>
