import VueLazyload from "vue-lazyload";
import loading from '@/assets/images/loading.gif'

export default function (Vue) {
    Vue.use(VueLazyload, {
        loading
    })
}