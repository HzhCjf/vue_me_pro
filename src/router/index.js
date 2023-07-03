import Vue from "vue";
import VueRouter from "vue-router";
// 进度条的第三方包
import NProgress from "nprogress";
import "nprogress/nprogress.css"
import store from "@/store";
const Home = () => import('@/pages/Home')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Search = () => import('@/pages/Search')
const NotFound = () => import('@/pages/404')
const Detail = () => import("@/pages/Detail");
const AddCartSuccess = () => import("@/pages/AddCartSuccess");
const ShopCart = () => import("@/pages/ShopCart");
const Trade = () => import("@/pages/Trade");
const Pay = () => import("@/pages/Pay");
const PaySuccess = () => import("@/pages/PaySuccess");
const Center = () => import("@/pages/Center");
const MyOrder = () => import("@/pages/Center/components/MyOrder");
const TeamOrder = () => import("@/pages/Center/components/TeamOrder");
Vue.use(VueRouter)

// 重写router的push和replace方法解决重复导航的bug
const oldPush = VueRouter.prototype.push
VueRouter.prototype.push = function (loaction, onComplate = () => { }, onAbort = () => { }) {
    oldPush.call(this, loaction, onComplate, onAbort)
}

const oldReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (loaction, onComplate = () => { }, onAbort = () => { }) {
    oldReplace.call(this, loaction, onComplate, onAbort)
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        // 默认首页
        {
            path: '/',
            redirect: '/home'
        },
        // 首页
        {
            path: '/home',
            component: Home,
            name: 'Home'
        },
        // 登录页
        {
            path: '/login',
            component: Login,
            name: 'Login',
            meta: {
                FooterIsHidden: true
            }
        },
        // 注册页
        {
            path: '/register',
            component: Register,
            name: 'Register',
            meta: {
                FooterIsHidden: true
            }
        },
        // 搜索页
        {
            path: '/search/:keyword?',
            component: Search,
            name: 'Search',
            // 把参数都传递给组件
            props($route) {
                return {
                    ...$route.params,
                    ...$route.query,
                }
            }
        },
        // 商品详情
        {
            path: "/detail/:skuId",
            component: Detail,
            name: "Detail",
            beforeEnter(to,from,next){
                if(from.name === 'Search'){
                    next()
                }else{
                    next('/Search')
                }
            },
        },
        // 加入购物车成功页
        {
            path:'/addCartSuccess',
            component:AddCartSuccess,
            name:'AddCartSuccess',
            beforeEnter(to,from,next){
                if(from.name === 'Detail'){
                    next()
                }else{
                    next('/Search')
                }
            },
        },
        // 购物车
        {
            path:'/shopCart',
            component:ShopCart,
            name:'ShopCart'
        },
        // 订单信息
        {
            path:'/trade',
            component:Trade,
            name:'Trade',
            meta:{
                isAuth:true
            },
            beforeEnter(to,from,next){
                if(from.name === 'ShopCart'){
                    next()
                }else{
                    next('/ShopCart')
                }
            },
        },
        // 支付页
        {
            path:'/pay/:orderId',
            component:Pay,
            name:'Pay',
            meta:{
                isAuth:true
            },
            beforeEnter(to,from,next){
                if(from.name === 'Trade'){
                    next()
                }else{
                    next('/ShopCart')
                }
            },
        },
        // 支付成功
        {
            path:'/paySuccess',
            component:PaySuccess,
            name:'PaySuccess',
            meta:{
                isAuth:true
            },
            beforeEnter(to,from,next){
                if(from.name === 'Pay'){
                    next()
                }else{
                    next('/ShopCart')
                }
            },
        },
        // 我的订单
        {
            path:'/center',
            component:Center,
            name:'Center',
            meta:{
                isAuth:true
            },
            redirect:'/center/myOrder',
            children:[
                {
                    path:'myOrder',
                    name:'MyOrder',
                    component:MyOrder,
                    meta:{
                        isAuth:true
                    },
                },
                {
                    path:'teamOrder',
                    name:'TeamOrder',
                    component:TeamOrder,
                    meta:{
                        isAuth:true
                    },
                },
            ]
        },
        {
            path: '*',
            component: NotFound,
            name: 'NotFound',
            meta: {
                FooterIsHidden: true
            }
        },
    ],
    scrollBehavior(){
        return {x:0,y:0}
    }
})


// 路由鉴权全过程
// 判断有没有token
//   有token
//     判断有没有用户信息
//     如果有,则说明用户刚刚拿token请求了数据,token是没有问题的,则直接放行

//     如果没有,则不确定token到底管不管用,我们需要发送一个请求,请求用户信息
//     如果请求成功,则说明token没有问题,直接放行
//     如果请求失败,则说明token可能有问题了,则清空当前的token,并跳转到login页重新登录


//   没有token
//     判断要去的页面在不在白名单中
//     如果在白名单中就放行
//     如果不在白名单中 就跳转到login页 重新登录

// 全局前置路由
router.beforeEach(async (to, from, next) => {
    // 获取到token和用户信息nickName
    const token = store.state.user.token
    const nickName = store.state.user.userInfo.nickName
    // 全局跳转路由放行之前进度条开始
    NProgress.start()
    
    // 如果有token
    if(token){
        // console.log('1');
        
        // 判断是否去的路由是否为登录
        if(to.name === 'Login'){
            // 有token就表示已经登录了,不可再去登录页,直接跳转到首页
            next('/home')
            // 如果从首页想跳转到登录页,把进度条直接结束,不结束的话虽然没什么影响,但是进度条会一直在
            if(from.name === 'Home') NProgress.done()
        }


        // 如果有token并且有用户信息,代表是正确登录
        if(nickName){
            // console.log('2');
            // 直接放行
            next()
        }else{
            // 如果有token,但是没用用户信息,可能是没获取到,也可能是token错误
            try{
                // console.log('3');
                // 用token请求用户信息,能请求到就放行
                await store.dispatch('user/getUserInfo')
                next()
            }catch(e){
                // console.log('41');
                // 如果没请求到,就把vuex里面的token清空,并且删除本地存储的token
                store.commit('user/clear_Token')
                // 然后跳转至登录页面
                next(`/login?to=${to.name}`)
            }
        }
    }else{
        // 如果没有token,那就看此路由在不在白名单之内,如果在就直接跳转到登录页
        if(to.meta.isAuth){
            // console.log('5');
            next(`/login?to=${to.name}`)
        }else{
            // console.log('6');
            // 如果不在就直接放行
            next()
        }
    }
})

// 全局后置钩子
router.afterEach(() => {
    // 放行之后进度条结束
    NProgress.done()
})

export default router