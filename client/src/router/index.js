import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Tasks from '../views/Tasks.vue'

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: Tasks
  },
  {
    path: '/new',
    name: 'New',
    component: () => import('../views/New')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('../views/Edit')
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: () => import('../views/Task')
  },
  {
    path: '/change/:id',
    name: 'Change',
    component: () => import('../views/ChangeOne')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

export default router