import TypeNav from "@/components/TypeNav";
import Swiper from "@/components/Swiper";
import Pagination from "@/components/Pagination";

export default function (Vue) {
    //全局注册公共组件TypeNav
    Vue.component("TypeNav", TypeNav);
    //全局注册公共组件Swiper
    Vue.component("Swiper", Swiper);
    //全局注册公共组件Pagination
    Vue.component("Pagination", Pagination);
}