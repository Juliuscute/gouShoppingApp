import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin_dashboard from '../views/Admin_dashboard.vue'
import Cart from '../views/Cart.vue'
import CheckOut from '../views/CheckOut.vue'
import Product from '../views/Product.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Sell from '../views/Sell.vue'
import StudentMarketPlace from '../views/StudentMarketPlace.vue'
import StudentProduct from '../views/StudentProduct.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/admin_dashboard', name: 'admin_dashboard', component: Admin_dashboard },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/checkOut', name: 'checkOut', component: CheckOut},
  { path: '/product', name: 'product', component: Product},
  { path: '/register', name: 'register', component: Register},
  { path: '/login', name: 'login', component: Login},
  { path: '/profile', name: 'profile', component: Profile},
  { path: '/sell', name: 'sell', component: Sell},
  { path: '/studentMarketPlace', name: 'studentMarketPlace', component: StudentMarketPlace},
  { path: '/studentProduct', name: 'studentProduct', component: StudentProduct}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
