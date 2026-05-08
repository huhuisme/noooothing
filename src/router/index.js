import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/map-pick/:agent',  // 使用 params 参数接收特工名
        name: 'MapPick',
        component: () => import('../views/MapPickPage.vue')
    },
    {
        path: '/points/:agent/:map',  // 使用 params 参数接收特工名和地图名
        name: 'Points',
        component: () => import('../views/PointsPage.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router