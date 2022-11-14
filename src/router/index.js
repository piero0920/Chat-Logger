import { createRouter, createWebHistory } from 'vue-router'
import Channel from '../views/Channel2.vue'
import User from '../views/User2.vue'

const routes = [
  {
    path: '/',
    redirect: '/KalathrasLolweapon',
  },
  {
    path: '/:channel',
    name: 'channel',
    component: Channel
  },
  {
    path: '/:channel/u/:user',
    name: 'user',
    component: User
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
