import './assets/main.css'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createWebHistory, createRouter } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'


import Favorites from './pages/Favorites.vue'
import Home from './pages/Home.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/favorites', component: Favorites },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)


app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')

