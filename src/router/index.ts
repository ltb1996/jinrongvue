import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import type {RouteRecordRaw} from "vue-router"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue'),
  },
  {
    path: '/knowledge',
    name: 'knowledge',
    component: () => import('../views/knowledge.vue'),
  },
  {
    path: '/projectindex',
    name: 'projectindex',
    component: () => import('../views/projectindex.vue'),
  },
  {
    path: '/teachvue',
    redirect: '/teachvue/1',
  },
  {
    path: '/teachvue/:id',
    name: 'teachvue',
    component: () => import('../views/teachvue.vue'),
  },
  {
    path: '/basicoperate',
    name: 'basicoperate',
    component: () => import('../views/basicoperate.vue'),
  },
  {
    path: '/lab/:id',
    name: 'lab',
    component: () => import('../views/lab.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index/index.vue'),
      }
    ]
  },
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  next();
})

export default router
