import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Lottery from '@/components/pages/Lottery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/lottery',
      name: 'Lottery',
      component: Lottery
    }
  ]
})
