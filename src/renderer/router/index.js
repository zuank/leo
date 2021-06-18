import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: require('@/pages/index').default
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
