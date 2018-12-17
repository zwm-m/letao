// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/store.js'
import {checkLogin} from '@/api'
Vue.use(ElementUI)

Vue.config.productionTip = false
// 添加导航守卫
router.beforeEach((to, from, next) => {
  checkLogin().then(res => {
    if (res.data.success === true || to.path === '/login') {
      next()
    } else {
      next({path: '/login'})
    }
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
