import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { request } from './request'
Vue.config.productionTip = false

 const result = request.get('/api/product/getBaseCategoryList')
 console.log(result);
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
