import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/contents/Product'
import Index from '@/components/contents/Index'
import Login from '@/components/contents/Login'
import Register from '@/components/contents/Register'
import Home from '@/components/contents/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
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
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
  ]
})
