import { createRouter, createWebHistory } from 'vue-router'
import KalathrasLolweapon from '../views/KalathrasLolweapon.vue'
import KalathrasLolweapon_user from '../views/KalathrasLolweapon_user.vue'
import Endnatsu from '../views/Endnatsu.vue'
import Endnatsu_user from '../views/Endnatsu_user.vue'
import Piero_fn from '../views/Piero_fn.vue'
import Piero_fn_user from '../views/Piero_fn_user.vue'

const routes = [
  {
    path: '/',
    redirect: '/KalathrasLolweapon',
  },
  {
    path: '/KalathrasLolweapon',
    name: 'KalathrasLolweapon',
    component: KalathrasLolweapon
  },
  {
    path: '/KalathrasLolweapon/:user',
    name: 'KalathrasLolweapon_user',
    component: KalathrasLolweapon_user
  },
  {
    path: '/Endnatsu',
    name: 'Endnatsu',
    component: Endnatsu
  },
  {
    path: '/Endnatsu/:user',
    name: 'Endnatsu_user',
    component: Endnatsu_user
  },
  {
    path: '/Piero_fn',
    name: 'Piero_fn',
    component: Piero_fn
  },
  {
    path: '/Piero_fn/:user',
    name: 'Piero_fn_user',
    component: Piero_fn_user
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
