<script setup>
import Loader from './Loader.vue'
import Pagination from './Pagination.vue'

defineProps({
  items2: Array,
  dataFlags: Object,
  loaderState: Boolean,
  selectPage2: Function,
  paginationParams: Object
})
</script>

<template>
  <div class="table-wrapper flex flex-col gap-3">
    <div class="table-content bg-white border rounded-lg overflow-hidden">
      <div class="info-table sticky top-0 bg-white flex-wrap">
        <div>
          <span>{{ dataFlags.startTime }} - {{ dataFlags.finalTime }}</span>
        </div>
      </div>
      <div class="table-field2">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs sticky top-14 text-gray-700 uppercase bg-gray-50 whitespace-nowrap">
            <tr>
              <th class="px-4 py-3">ID</th>
              <th class="px-4 py-3">sourse</th>
              <th class="px-4 py-3">domain name</th>
              <th class="px-4 py-3">destenation</th>
              <!-- <th class="px-4 py-3">pkts</th> -->
              <th class="px-4 py-3">size</th>
            </tr>
          </thead>
          <tbody class="tbody border-b whitespace-nowrap" v-if="!loaderState">
            <tr
              v-for="itemInTable in paginationParams.itemsOnPage"
              :key="itemInTable.id"
              class="table-elem2 border-b hover:bg-gray-50"
            >
              <td class="px-4 py-3 font-medium text-gray-900 ">
                {{ itemInTable.index + 1 }}
              </td>
              <td class="px-4 py-3 font-medium text-gray-900">
                {{ itemInTable.srcip }}
              </td>
              <td class="px-4 font-medium text-gray-900 relative">
                <a class="domain-table absolute top-1/4 overflow-hidden text-ellipsis w-full" :href="itemInTable.srcip" target="_blank">
                  {{ itemInTable.domainName }}
                </a>
              </td>
              <td class="px-4 py-3 font-medium text-gray-900">
                {{ itemInTable.dstip }}
              </td>
              <!-- <td class="px-4 py-3 font-medium text-gray-900">
                {{ itemInTable.pkts }}
              </td> -->
              <td class="px-4 py-3 font-medium text-gray-900">
                {{ itemInTable.octets + ' MB' }}
              </td>
            </tr>
          </tbody>
        </table>
        <Loader v-if="loaderState" />
      </div>
    </div>
    <Pagination
      :pagination-params="paginationParams"
      :select-page="selectPage2"
      />
  </div>
</template>

<style>
.table-wrapper {
  width: 50%;
}

.info-table {
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
  padding: 18px;
}

.table-field2 {
  height: 490px;
}

.table-elem2 {
  height: 45px;
}

.domain-table {
  width: calc(100% - 16px);
}
</style>
