import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import User from '@/views/user/User.vue'
import CategoryFrist from '@/views/category/CategoryFrist.vue'
import CategorySecond from '@/views/category/CategorySecond.vue'
import Product from '@/views/product/Product.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'defualt',
      component: Login,
      redirect: {name: 'Login'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'user',
          name: 'User',
          component: User
        },
        {
          path: 'categoryfrist',
          name: 'CategoryFrist',
          component: CategoryFrist
        },
        {
          path: 'categorysecond',
          name: 'CategorySecond',
          component: CategorySecond
        },
        {
          path: 'product',
          name: 'Product',
          component: Product
        }
      ]
    }
  ]
})
