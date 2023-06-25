import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@comp/TypeNav'
import "swiper/css/swiper.min.css";
import Swiper from '@/components/Swiper'
import '@/mock'
Vue.config.productionTip = false
Vue.component('Swiper',Swiper)


// 把TypeNav组件设置为全局组件
Vue.component('TypeNav',TypeNav)
new Vue({
  render: h => h(App),
  router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
