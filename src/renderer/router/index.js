import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * 解决报错问题：报错显示是路由重复
 * Error: Avoided redundant navigation to current location
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: require('@/pages/index').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/pages/login').default
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
