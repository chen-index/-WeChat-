import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import(/* webpackChunkName: "home" */ '../components/Home')
const Login = () => import(/* webpackChunkName: "home" */ '../components/Login')
const Register = () => import(/* webpackChunkName: "home" */ '../components/Register')
const Wechat = () => import(/* webpackChunkName: "home" */ '../components/Wechat/Wechat')
const News = () => import(/* webpackChunkName: "page" */ '../components/News/News')
const Address = () => import(/* webpackChunkName: "page" */ '../components/Address/Address')
const Find = () => import(/* webpackChunkName: "page" */ '../components/Find/Find')
const Me = () => import(/* webpackChunkName: "page" */ '../components/Me/Me')
const MeData = () => import(/* webpackChunkName: "page" */ '../components/Me/MeData/MeData')
const ChangeName = () => import(/* webpackChunkName: "page" */ '../components/Me/MeData/ChangeName')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/medata', component: MeData },
  { path: '/changename', component: ChangeName },
  { path: '/wechat',
    component: Wechat,
    redirect: '/news',
    children: [
      { path: '/news', component: News },
      { path: '/address', component: Address },
      { path: '/find', component: Find },
      { path: '/me', component: Me }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: '/opt/demo/ace/',
  routes
})

export default router
