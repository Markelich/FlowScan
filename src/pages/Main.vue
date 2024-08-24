<script setup>
import { onMounted, ref, watch } from 'vue'

import axios from 'axios'
import Diagram from '../components/Diagram.vue'
import DataTable from '../components/DataTable.vue'
import MainGraph from '@/components/MainGraph.vue'

const server = '192.168.0.66'
const port = '8000'
// const server = '80.73.69.138'

const items = ref([])
const items2 = ref([])

const queryStartListIsRuning = ref(false)
const queryDiagramIsRuning = ref(false)

const loaderState = ref({
  dataTable: false,
  diagram: false
})
const dataFlags = ref({
  dataType: 'dstip',
  startTime: '2024-08-17T15:43',
  finalTime: '2024-08-17T18:44'
})
const paginationParams = ref({
  curentPage: null,
  pagesList: null,
  itemsOnPage: null,
  totalPages: null
})

const changeStateLoaderDataTime = async () => {
  loaderState.value.dataTable = !loaderState.value.dataTable
}

const changeStateLoaderDiagram = async () => {
  loaderState.value.diagram = !loaderState.value.diagram
}

const selectStartDate = (event) => {
  dataFlags.value.startTime = event.target.value
  console.log(dataFlags.value)
}

const selectFinalDate = (event) => {
  dataFlags.value.finalTime = event.target.value
  console.log(dataFlags.value)
}

const getStartList = async () => {
  if (queryStartListIsRuning.value) {
    console.log('QUERY_IS_RUN_NOW')
  } else {
    queryStartListIsRuning.value = true

    console.log('BEGIN_START_QUERY')
    try {
      items.value = null
      const { data } = await axios.get(
        `http://${server}:${port}/${dataFlags.value.dataType}/${dataFlags.value.startTime}/${dataFlags.value.finalTime}`
      )
      items.value = data
      selectPage(event)
    } catch (err) {
      items.value = null
      console.log(err)
    }
    queryStartListIsRuning.value = false
    console.log('QUERY_COMPLETED')
  }
}

const ChangeSelect = async (event) => {
  dataFlags.value.dataType = await null
  dataFlags.value.dataType = await event.target.value
  console.log(dataFlags.value)
}

const getUserIpList = async () => {
  items2.value = await getUserStat()
  queryDiagramIsRuning.value = await false
  console.log('QUERY_COMPLETED')
  setTimeout(() => {
    items2.value.map(async (item) => await fetchData(item))
    console.log(items2.value)
  }, 1000)
}

const getUserStat = async () => {
  if (queryDiagramIsRuning.value) {
    console.log('QUERY_IS_RUN_NOW')
  } else {
    queryDiagramIsRuning.value = true
    console.log('BEGIN_START_QUERY')
    try {
      const userAddress = event.target.value
      const { data } = await axios.get(
        `http://${server}:${port}/hosts/${userAddress}/${dataFlags.value.startTime}/${dataFlags.value.finalTime}`
      )
      items2.value = data.map((item) => {
        return {
          ...item,
          domain: 'NETU BLYADЬ'
        }
      })
      // console.log(items2.value)
      return items2.value
    } catch (err) {
      items2.value = null
      console.log(err)
    }
  }
}

// const getDomainNames = async () => {
//   try {
//     domains.value = await items2.value.map(async (item) => {
//       const { response } = await axios.get(`http://${server}:${port}/domain_names/${item.srcip}`)
//       console.log(response)
//     })

//     console.log(domains, '11')
//     console.log('11', domains.value)
//     console.log(items2.value)
//   } catch (err) {
//     console.log(err)
//   }
// }

// const fetchData = async (item) => {
//   try {
//     const response = await axios.get(`http://${server}:${port}/domain_names/${item.srcip}`)
//     console.log(response.data)
//     return {
//       ...item,
//       domainName: response.data
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

const selectPage = (event) => {
  paginationParams.value.totalPages = Math.ceil(items.value.length / 10)
  if (event.target.value) {
    paginationParams.value.curentPage = Number(event.target.value)
  } else {
    paginationParams.value.curentPage = 1
  }
  paginationParams.value.itemsOnPage = items.value.slice(
    (paginationParams.value.curentPage - 1) * 10,
    paginationParams.value.curentPage * 10
  )
  if (paginationParams.value.curentPage <= 3) {
    paginationParams.value.pagesList = [1, 2, 3, 4, 5]
  } else if (paginationParams.value.curentPage >= paginationParams.value.totalPages - 2) {
    paginationParams.value.pagesList = [
      paginationParams.value.totalPages - 4,
      paginationParams.value.totalPages - 3,
      paginationParams.value.totalPages - 2,
      paginationParams.value.totalPages - 1,
      paginationParams.value.totalPages
    ]
  } else {
    paginationParams.value.pagesList = [
      paginationParams.value.curentPage - 2,
      paginationParams.value.curentPage - 1,
      paginationParams.value.curentPage,
      paginationParams.value.curentPage + 1,
      paginationParams.value.curentPage + 2
    ]
  }
  // console.log(paginationParams.value.totalPages, 'totalPages')
  // console.log(paginationParams.value.curentPage, 'curentPage')

  // console.log(paginationParams.value.pagesList, 'pagesList')
  // console.log('type curentPage', typeof paginationParams.value.curentPage)
}

onMounted(getStartList)

watch(queryStartListIsRuning, changeStateLoaderDataTime)
watch(queryDiagramIsRuning, changeStateLoaderDiagram)
</script>

<template>
  <div class="diagrams-content flex flex-row gap-3 items-start">
    <DataTable
      :items="items"
      :dataFlags="dataFlags"
      :Change-select="ChangeSelect"
      :select-start-date="selectStartDate"
      :select-final-date="selectFinalDate"
      :getStartList="getStartList"
      :get-user-ip="getUserIpList"
      :loader-state="loaderState.dataTable"
      :select-page="selectPage"
      :pagination-params="paginationParams"
    />
    <Diagram :items2="items2" :dataFlags="dataFlags" :loader-state="loaderState.diagram" />
  </div>
  <div class="graphs-content pt-6 flex flex-row gap-3 grow">
    <MainGraph />
    <!-- <MainGraph /> -->
  </div>
</template>

<style></style>
