import Vue from 'vue'
import 'swiper/css/swiper.min.css'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import store from './store'
import Carousel from './components/Carousel'

import '@/mock/mockServe'
//全局注册组件，这样所有的组件都可以使用
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
new Vue({
  // el: '#app',
  render: h => h(App),
  store,
  router, // 配置路由器  ==> 所有的组件都可以通过$router属性得到路由器对象
}).$mount('#app')
