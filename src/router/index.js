import { createRouter, createWebHistory } from 'vue-router'
import Channel from '../views/Channel.vue'
import User from '../views/User.vue'

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
    path: '/:channel/user/:user',
    name: 'user',
    component: User
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
