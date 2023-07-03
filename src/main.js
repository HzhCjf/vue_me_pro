import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import "swiper/css/swiper.min.css";
import "@/mock";
import store from '@/store'
import element from "@/main/element";
import components from "@/main/components";
import lazy from "@/main/lazy";
import validate from "@/main/validate";

Vue.use(element)
Vue.use(components)
Vue.use(lazy)
Vue.use(validate)

Vue.config.productionTip = false;




new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store
}).$mount("#app");
