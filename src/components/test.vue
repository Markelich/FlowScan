<script setup>
import axios from 'axios'

const server = '192.168.0.66'
const port = '8000'
const data = [
  {
    id: 1,
    srcip: '5.149.205.58'
  },
  {
    id: 2,
    srcip: '89.208.34.31'
  },
  {
    id: 3,
    srcip: '134.19.151.147'
  },
  {
    id: 4,
    srcip: '123.58.192.106'
  },
  {
    id: 5,
    srcip: '178.159.249.108'
  }
]

const fetchData = async (item) => {
  try {
    const response = await axios.get(`http://${server}:${port}/domain_names/${item.srcip}`)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

data.map((item) => fetchData(item))
</script>
