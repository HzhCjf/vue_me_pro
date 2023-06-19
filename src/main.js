import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { request } from './request'
Vue.config.productionTip = false
Vue.prototype.productionTip = false

request.get('/api/product/getBaseCategoryList')
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
