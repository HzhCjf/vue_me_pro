import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import NotFound from '@/pages/404'
Vue.use(VueRouter)

// 重写router的push和replace方法解决重复导航的bug
const oldPush = VueRouter.prototype.push
VueRouter.prototype.push = function(loaction, onComplate=()=>{}, onAbort=()=>{}){
    oldPush.call(this,loaction,onComplate,onAbort)
}

const oldReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function(loaction, onComplate=()=>{}, onAbort=()=>{}){
    oldReplace.call(this,loaction,onComplate,onAbort)
}

const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            component:Home,
            name:'Home'
        },
        {
            path:'/login',
            component:Login,
            name:'Login',
            meta:{
                FooterIsHidden:true
            }
        },
        {
            path:'/register',
            component:Register,
            name:'Register',
            meta:{
                FooterIsHidden:true
            }
        },
        {
            path:'/search',
            component:Search,
            name:'Search'
        },
        {
            path:'*',
            component:NotFound,
            name:'NotFound',
            meta:{
                FooterIsHidden:true
            }
        },
    ]
})

export default router