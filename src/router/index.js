import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../components/Home')
  },
  {
    path: '/my-work',
    name: 'MyWork',
    component: () => import('../components/MyWork')
  },
  {
    path: '/bio',
    name: 'Bio',
    component: () => import('../components/Bio')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../components/Contact')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
