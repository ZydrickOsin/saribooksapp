import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: () => import('@/views/Login.vue') },
  { path: '/signup', component: () => import('@/views/Signup.vue') },
  { path: '/dashboard', component: () => import('@/views/Dashboard.vue') },
  { path: '/profile', component: () => import('@/views/Profile.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
