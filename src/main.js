import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Main from './pages/Main.vue'
import Settings from './pages/Settings.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'main', component: Main },
  { path: '/settings', name: 'settings', component: Settings }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.mount('#app')
