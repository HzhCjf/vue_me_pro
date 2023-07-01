import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import "swiper/css/swiper.min.css";
import "@/mock";
import store from '@/store'




import Element from "@/main/Element";
import validate from "@/main/validate";
import compontens from "@/main/compontens";
import lazy from "@/main/lazy";
Vue.use(Element)
Vue.use(validate)
Vue.use(compontens)
Vue.use(lazy)


Vue.config.productionTip = false;




new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store
}).$mount("#app");
