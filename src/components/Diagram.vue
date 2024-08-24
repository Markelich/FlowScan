<script setup>
import Loader from './Loader.vue'

defineProps({
  items2: Array,
  dataFlags: Object,
  loaderState: Boolean
})
</script>

<template>
  <div class="table-wrapper flex flex-col gap-3">
    <div class="table-content bg-white border rounded-lg overflow-auto">
      <div class="info-table sticky top-0 bg-white flex-wrap">
        <div>
          <span>{{ dataFlags.startTime }} - {{ dataFlags.finalTime }}</span>
        </div>
      </div>
      <div class="table-field">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs sticky top-14 text-gray-700 uppercase bg-gray-50">
            <tr>
              <th class="px-4 py-3">sourse</th>
              <th class="px-4 py-3">domain name</th>
              <th class="px-4 py-3">destenation</th>
              <th class="px-4 py-3">pkts</th>
              <th class="px-4 py-3">size</th>
            </tr>
          </thead>
          <tbody class="tbody border-b" v-if="!loaderState">
            <tr
              v-for="itemInTable in items2"
              :key="itemInTable.domain"
              class="table-elem border-b hover:bg-gray-50"
            >
              <td class="px-4 py-3 font-medium text-gray-900">
                {{ itemInTable.srcip }}
              </td>
              <td class="px-4 py-3 font-medium text-gray-900">
                <a :href="itemInTable.srcip" target="_blank">
                  {{ itemInTable.domain }}
                </a>
              </td>
              <td class="px-4 py-3 font-medium text-gray-900">
                {{ itemInTable.dstip }}
              </td>
              <td class="px-4 py-3 font-medium text-gray-900">
                {{ itemInTable.pkts }}
              </td>
              <td class="px-4 py-3 font-medium text-gray-900">
                {{ itemInTable.octets + ' MB' }}
              </td>
            </tr>
          </tbody>
        </table>
        <Loader v-if="loaderState" />
      </div>
    </div>
  </div>
</template>

<style>
.table-wrapper {
  width: 50vw;
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

.table-field {
  height: 490px;
}

.table-elem {
  height: 45px;
}
</style>
