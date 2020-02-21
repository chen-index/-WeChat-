import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import(/* webpackChunkName: "home" */ '../components/Home')
const Login = () => import(/* webpackChunkName: "home" */ '../components/Login')
const Register = () => import(/* webpackChunkName: "home" */ '../components/Register')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  // mode: 'history',
  // base: '/opt/demo/ace/',
  routes
})

export default router
