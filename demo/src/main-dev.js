import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
// import socketio from 'socket.io-client'

// Vant
import Vant from 'vant'
import 'vant/lib/index.css'

import './plugins/element.js'
import './assets/icon/iconfont.css'

// import 'amfe-flexible'

// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式
import './assets/css/global.css'
// 导入 nprogress js css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:3001/app/'
// axios请求拦截器
// 展示Nprogress进度条 Nprogress。start()
axios.interceptors.request.use(config => {
  NProgress.start()
  // console.log(config)
  // config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在response 拦截器中，隐藏Nprogress进度条 Nprogress。done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

// vuesocketio

// Vue.use(VueSocketIO, socketio('http://localhost:3001'), store)
Vue.use(Vant)
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3001/',
  vuex: {
    // store,
    // actionPrefix: 'SOCKET_',
    // mutationPrefix: 'SOCKET_'
  }
  // options: { path: '/my-app/' } // Optional options
}))

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径来
  // next 下一步
  // 获取token
  // const email = window.sessionStorage.getItem('email')
  // const email = window.localStorage.getItem('email')
  // if (to.path === '/server_users' && !email) {
  //   return next('/login')
  // }

  // if (!email) {
  //   return next('/backstage')
  // }
  next()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
