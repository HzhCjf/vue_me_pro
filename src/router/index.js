import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import NotFound from '@/pages/404'
// 进度条的第三方包
import NProgress  from "nprogress";
import "nprogress/nprogress.css"
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


// 全局前置路由
router.beforeEach((to,from,next)=>{
    // 全局跳转路由放行之前进度条开始
    NProgress.start()
    next()
})

// 全局后置钩子
router.afterEach(()=>{
    // 放行之后进度条结束
    NProgress.done()
})

export default router