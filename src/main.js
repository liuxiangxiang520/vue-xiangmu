import Vue from 'vue'
import 'swiper/css/swiper.min.css'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import store from './store'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
import '@/mock/mockServe'
//全局注册组件，这样所有的组件都可以使用
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)
new Vue({
  // el: '#app',
  render: h => h(App),
  store,
  router, // 配置路由器  ==> 所有的组件都可以通过$router属性得到路由器对象
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
