module.exports = {
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         require('postcss-pxtorem')({ // 把px单位换算成rem单位
  //           rootValue: 75, // 换算的基数(设计图750的根字体为75)
  //           // selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
  //           propList: ['*']
  //         })
  //       ]
  //     }
  //   }
  // },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        nprogress: 'NProgress'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },
  devServer: {
    // open: false, //是否自动弹出浏览器页面
    // host: "localhost",
    port: '8086',
    https: false,
    hotOnly: false
    // proxy: {
    //   '/users': {
    //     target: 'http://localhost:3001'
    //   },
    //   '/users/*': {
    //     target: 'http://localhost:3001'
    //   },
    //   '/article': {
    //     target: 'http://localhost:3001'
    //   },
    //   '/article/*': {
    //     target: 'http://localhost:3001'
    //   },
    //   '/message': {
    //     target: 'http://localhost:3001'
    //   },
    //   '/message/*': {
    //     target: 'http://localhost:3001'
    //   },
    //   '/home': {
    //     target: 'http://localhost:3001'
    //   },
    //   '/home/*': {
    //     target: 'http://localhost:3001'
    //   }
    // }
  },
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? './'
  //   : '/'
  publicPath: './'
  // assetsDir: './'
  // outputDir: 'dist',
  // assetsDir: 'static',
}
