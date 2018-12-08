import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/contents/Product'
import Home from '@/components/contents/Home'
import Login from '@/components/contents/Login'
import Register from '@/components/contents/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
