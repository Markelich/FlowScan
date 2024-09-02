<script setup>
import { onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'
import axios from 'axios'
import Diagram from '../components/Diagram.vue'
import DataTable from '../components/DataTable.vue'
import MainGraph from '@/components/MainGraph.vue'

const server = '192.168.0.66'
const port = '8000'
// const server = '80.73.69.138'

const items = ref([])
const items2 = ref([])
const MainGraphData = ref([])

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
  startTable: {
    curentPage: null,
    pagesList: null,
    itemsOnPage: null,
    totalPages: null
  }, 
  secondTable: {
    curentPage: null,
    pagesList: null,
    itemsOnPage: null,
    totalPages: null
  }
}
  )




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
      items2.value = data
    } catch (err) {
      items2.value = null
      console.log(err)
    }
    queryDiagramIsRuning.value = await false
    console.log('QUERY_COMPLETED')

      Promise.all(items2.value.map(obj => getDomainName(obj)))
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        }); 

  }
}

const getDomainName = (obj) => {
  return new Promise((resolve, reject) => {
        axios.get(`http://${server}:${port}/domain_names/${obj.srcip}`)
            .then(response => {
                const domainName = response.data;
                obj.domainName = domainName;
                resolve(obj);
            })
            .catch(error => {
                reject(error);
            });
    });

}


const selectPage = (event) => {
  paginationParams.value.startTable.totalPages = Math.ceil(items.value.length / 10)
  if (event.target.value) {
    paginationParams.value.startTable.curentPage = Number(event.target.value)
  } else {
    paginationParams.value.startTable.curentPage = 1
  }
  paginationParams.value.startTable.itemsOnPage = items.value.slice(
    (paginationParams.value.startTable.curentPage - 1) * 10,
    paginationParams.value.startTable.curentPage * 10
  )
  if (paginationParams.value.startTable.curentPage <= 3) {
    paginationParams.value.startTable.pagesList = [1, 2, 3, 4, 5]
  } else if (paginationParams.value.startTable.curentPage >= paginationParams.value.startTable.totalPages - 2) {
    paginationParams.value.startTable.pagesList = [
      paginationParams.value.startTable.totalPages - 4,
      paginationParams.value.startTable.totalPages - 3,
      paginationParams.value.startTable.totalPages - 2,
      paginationParams.value.startTable.totalPages - 1,
      paginationParams.value.startTable.totalPages
    ]
  } else {
    paginationParams.value.startTable.pagesList = [
      paginationParams.value.startTable.curentPage - 2,
      paginationParams.value.startTable.curentPage - 1,
      paginationParams.value.startTable.curentPage,
      paginationParams.value.startTable.curentPage + 1,
      paginationParams.value.startTable.curentPage + 2
    ]
  }
  // console.log(paginationParams.value.totalPages, 'totalPages')
  // console.log(paginationParams.value.curentPage, 'curentPage')

  // console.log(paginationParams.value.pagesList, 'pagesList')
  // console.log('type curentPage', typeof paginationParams.value.curentPage)
}



const getAllLastDataTraffic = async () => {
  try {
    const { data } = await axios.get(`http://${server}:${port}/curentData`)
    MainGraphData.value = data
    
  } catch (err){
    MainGraphData.value = null
    console.log(err)
  }
} 

const displayMainChart = () => {
  const ctx = document.getElementById('Chart').getContext('2d')
  const cfg = {
    type: 'line',
    data: {
      labels: MainGraphData.value.map((item) => {
        return item.timestemp
      }),
      datasets: [
        { 
          label: 'gbdff',
          data: MainGraphData.value.map((item) => {
            return item.octets
          }),
          borderWidth: 1,
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 1)'
        }
      ]
    },
    options: {
      // parsing: false,
      interaction: {
        mode: 'nearest',
        // axis: 'x',
        intersect: false,
      },
      pointRadius: 0,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear',
          beginAtZero: true
        },
        x: {
          // type: 'linear',
          display: false,
        }
      },
      plugins: {
        decimation: {
          enabled: true,
          algorithm: 'lttb',
          samples: 50
        },
      }
    }
  }

  const mainChart = new Chart(ctx, cfg)
  // console.log(14)
}

onMounted(async() => {
  changeStateLoaderDataTime()
  await getAllLastDataTraffic()
  await displayMainChart()
  await changeStateLoaderDataTime()
  await getStartList()
  

})


// onMounted(getStartList)


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
      :get-user-ip="getUserStat"
      :loader-state="loaderState.dataTable"
      :select-page="selectPage"
      :pagination-params="paginationParams.startTable"
    />
    <Diagram :items2="items2" :dataFlags="dataFlags" :loader-state="loaderState.diagram" />
  </div>
  <div class="graphs-content pt-6 flex flex-row gap-3 ">
    <div class="graph-wrapper flex">
    <div class="graph-content bg-white border rounded-lg overflow-auto flex flex-col grow">
      <!-- <div class="h-10 w-full bg-cyan-400"></div> -->
      <div class="w-full h-full grow">
        <canvas id="Chart"></canvas>
      </div>
    </div>
  </div>
    <!-- <MainGraph :server="server" :port="port"/> -->
    <!-- <MainGraph /> -->
  </div>
</template>

<style>
.graphs-content {

  height: 644px;
}

.graph-wrapper {
  width: 50%;
}

.graph-content {
  padding: 20px 30px 20px 20px;
  /* max-height: 563px; */
  /* max-height: 800px; */
}

</style>
