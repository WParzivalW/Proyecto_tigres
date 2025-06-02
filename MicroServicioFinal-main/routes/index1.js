import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/Login.vue'
import RegisterPage from '../pages/Register.vue'
import HomePage from '../pages/Home.vue'
import DashboardPage from '../pages/Dashboard.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/home', component: HomePage },
  { path: '/dashboard', component: DashboardPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
