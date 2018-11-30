import 'babel-polyfill'
import Vue from 'vue'
import  VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'stylus/reset.css'
import 'stylus/index.styl'
import 'stylus/iconfont/iconfont.css'
import 'stylus/iconfont/iconfont.js'

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
//解决300毫秒延时
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
