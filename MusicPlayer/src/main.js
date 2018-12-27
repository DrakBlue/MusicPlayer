import 'babel-polyfill'
import Vue from 'vue'
import  VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'stylus/reset.css'
import store from './store/index.js'
import 'stylus/index.styl'
import 'stylus/iconfont/iconfont.css'
import 'stylus/iconfont/iconfont.js'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyLoad,{
  try:3,
})
Vue.config.productionTip = false
//解决300毫秒延时
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
