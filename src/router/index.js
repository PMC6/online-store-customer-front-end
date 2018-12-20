import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/contents/Product'
import Index from '@/components/contents/Index'
import Login from '@/components/contents/Login'
import Register from '@/components/contents/Register'
import Home from '@/components/contents/Home'
import Cart from '@/components/contents/Cart'
import Picture from '@/components/contents/Picture'

Vue.use(Router)

export default new Router({
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
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/picture',
        name: 'Picture',
        component: Picture
    }
  ]
})
