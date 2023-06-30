import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@comp/TypeNav'
import "swiper/css/swiper.min.css";
import Swiper from '@/components/Swiper'
import '@/mock'
import Pagination from '@/components/Pagination'
import store from './store';
Vue.config.productionTip = false
Vue.component('Swiper',Swiper)
Vue.component('Pagination',Pagination)


// 把TypeNav组件设置为全局组件
Vue.component('TypeNav',TypeNav)
new Vue({
  render: h => h(App),
  router,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  store
}).$mount('#app')
