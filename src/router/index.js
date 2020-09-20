import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/inventories',
    name: 'Inventories',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inventories.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/new-inventory',
    name: 'New inventory',
    component: () => import(/* webpackChunkName: "about" */ '../views/New-inventory.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/inventories/:id',
    name: 'Inventory',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inventory.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('logged-as')) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
