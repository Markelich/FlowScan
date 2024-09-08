<script setup>
import Loader from './Loader.vue'
import Pagination from './Pagination.vue'

const prop = defineProps({
  items: Array,
  ChangeSelect: Function,
  dataFlags: Object,
  selectStartDate: Function,
  selectFinalDate: Function,
  getStartList: Function,
  getUserIp: Function,
  loaderState: Boolean,
  selectPage: Function,
  paginationParams: Object
})
</script>

<template>
  <div class="table-wrapper flex flex-col gap-3">
    <div class="table-content bg-white border rounded-lg overflow-hidden">
      <form class="form sticky top-0">
        <input
          type="datetime-local"
          placeholder="start"
          class="input border"
          :value="dataFlags.startTime"
          @input="selectStartDate"
        />
        <input
          type="datetime-local"
          placeholder="final"
          class="input border"
          :value="dataFlags.finalTime"
          @input="selectFinalDate"
        />
        <select @change="ChangeSelect" class="border rounded-lg outline-none">
          <option value="dstip">Клиенты</option>
          <option value="srcip">Сервера</option>
        </select>
        <button type="button" class="button-search" @click="getStartList">Search</button>
      </form>
      <div class="table-field">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs sticky top-14 text-gray-700 uppercase bg-gray-50">
            <tr>
              <th class="px-4 py-3">ID</th>
              <th class="px-4 py-3">IP</th>
              <!-- <th class="px-4 py-3">Pkts</th> -->
              <th class="px-4 py-3">Size</th>
              <th class="px-4 py-3">
                <span class="">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="tbody border whitespace-nowrap" v-if="!loaderState">
            <tr
              v-for="item in paginationParams.itemsOnPage"
              :key="item.id"
              class="table-elem border-t hover:bg-gray-100"
            >
              <td class="px-4 py-3 font-medium text-gray-900">
                {{ item[Object.keys(item)[0]] + 1 }}
              </td>
              <td class="px-4 py-3 font-medium text-gray-900">
                {{ item[Object.keys(item)[1]] }}
              </td>
              <!-- <td class="px-4 py-3 font-medium text-gray-900">
                {{ item[Object.keys(item)[2]] }}
              </td> -->
              <td class="px-4 py-3 font-medium text-gray-900">
                <span>{{ item[Object.keys(item)[3]] }} </span>
              </td>
              <td class="px-4 py-3 font-medium text-gray-900">
                <button
                  class="text-indigo-500 hover:underline"
                  :value="item[Object.keys(item)[1]]"
                  @click="getUserIp"
                >
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Loader v-if="loaderState" />
      </div>
    </div>
    <Pagination
      :pagination-params="paginationParams"
      :select-page="selectPage"
    />
  </div>
</template>

<style>
.table-wrapper {
  width: 50%;
}

.form {
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 12px;
  padding: 12px 14px;
}

.input {
  border-radius: 9px;
  padding: 3px 6px;
  font-size: 14px;
  width: 150px;
  

}

.button-search {
  background: rgb(97, 39, 131);
  color: white;
  border-radius: 9px;
  padding: 0 10px;
}

.table-field {
  height: 490px;
}

.table-elem {
  height: 45px;
}
</style>
