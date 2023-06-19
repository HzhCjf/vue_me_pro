## 前端项目PC

### 自动打开浏览器配置(根据个人喜爱选择)
vue.config.js文件里面
```js
    //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
  //不过，对所有的依赖都进行转译可能会降低构建速度
  transpileDependencies: false,

  //服务器配置
  devServer: {
    //自动打开浏览器
    open: true,
    //主机地址(1. localhost 2. 127.0.0.1  3.本地ip)
    host: "192.168.16.189",
    //端口号(0----65535,1-1023系统端口号,1024-5000属于应用端口)
    port: 8888,
  },
```


### 设置eslint
- eslint:
    ```js
        // 关闭eslint里面的组件名需要两个单词的规则
        "vue/multi-word-component-names": 0,
        // 关闭在template里必须写的规则
        'vue/valid-template-root':0
    ```

-因为头部和脚部有很多组件都是在复用这个,所以可以先写头部和脚部,并且是在普通组件里面

### 路径别名的配置
- vue.config.js
 ```js
    //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
    configureWebpack: {
        resolve: {
        //路径别名配置(需要在jsconfig中额外再配置就会有代码书写时的提示)
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@comp": "@/components",
            "@api": "@/api",
        },
        },
    },
```
- 还需要在jsconfig.json文件里面继续进行配置,使其他书写代码的时候有提示,
在paths配置项里


### less的配置
- 下载less-loader,然后直接在组件文件中的style标签里面书写lang="less"


### 头部组件和脚部公共组件
- 书写templa里面的模板,还有css,然后把reset.css也要引入进index,html里面,需要删除第一行,已经引入图片

### 路由搭建
- 下载vue-router@3
- 创建路由组件文件,包括router文件需要自行书写路由表,mode要改为history模式
- 路由组件包括404(NotFount),主页(Home),登录(Login),注册(Register),搜索(Search)
- 放入App组件
- 头部组件的跳转要设置

### 重写push和replace解决编程式重复导航bug
- 用一个变量接收本来的push方法,然后重写push,函数接收loaction,onComplate,onAbort三个变量,onComplate和onAbort的默认值为一个回调函数,调用接收push方法的变量名,用call改变其this指向,然后把参数放进去,
- replace如上


### Footer组件的条件渲染
- 方法1:直接用插值语法写
- 方法2:用计算属性
- 方法3:用计算属性白名单
- 方法4:路由元信息方式

### Home组件的静态
- 在Home文件夹里面创建新的组件文件夹,需要把里面的静态全部创建静态文件,然后把图片和css全部放入

### axios拦截器的配置
- 下载axios
- 在src里面创建request文件夹,创建request文件,引入axios,创建实例,变量request接收axios.create创建的实例,里面配置baseURL是目标地址,timeout是超时时间,headers是一个对象,是配置头部信息的
- 请求拦截器是用interceptors来做,然后使request.use,里面有一个参数config,直接返回config就行
- 响应拦截器也是用interceptros来做,然后用response.use,有两个回调函数,一个参数是response,一个是error,用来返回数据和处理错误,
- 在request文件夹里面创建一个index文件,引入request文件,然后暴露这个实例

### 跨域的正向代理配置
- 在vue.config.js文件
- 在里面配置跨域客户端的代理,属于正向代理,用proxy配置项,用前缀,是一个对象,target用来配置目标地址,changeOrigin用来配置是否代理,pathRewrite来重写前缀
- 在request文件中替换掉baseURL中写的死路径
- 在main文件中引入request,用get发起获取数据的请求和它的地址


### 环境变量env配置
- 创建开发使用.env.development文件书写接收跨域前缀的变量名,建议全大写,如VUE_APP_API1
- 创建上线使用.env.production,内容如上
- 在拦截器实例中替换掉原来的

### 项目响应拦截器的完整配置
- 在响应拦截器中返回数据的时候,不是请求成功了,就一定是我想要的数据,之后后端返回的数据的code是200的时候才是我想要的数据,所以要进行判断,然后返回我们需要的数据,失败就返回错误的promise

### 路由切换是进度条的配置
- 下载nprogress包
- 在路由配置中引入NProgress,和"nprogress/nprogress.css",然后设置全局前置守卫和全局后置钩子,在前置里面进度条开始,后置里面结束