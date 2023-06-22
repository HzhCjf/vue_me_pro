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

































### 组件点击搜索跳转search
- 为搜索按钮绑定点击事件
- 在methods里面为点击事件创建一个方法,用来跳转search,需要把这个搜索框里面的数据也要传过去,可以在数据里面创建一个keyword来和输入框里面的数据进行绑定,然后在跳转到search的方法里面进行传参,可以用params来进行传参,需要记住的是,参数不能为空字符串,需要在search路由那边也要进行参数占位,因为这个参数是可选的


### 搜索的时候合并params和query参数
- 在点击搜索的时候要获取当前路由的query参数,然后把参数给到跳转路由
- 在点击分类列表跳转到search的时候要获取可能存在的parmas参数,然后把参数也要给到跳转路由


### 切换TypeNav为公共组件
- 因为不止在首页要用到TypeNav组件,search里面也要用到,所以需要把TypeNav变成公共组件
- 直接把TypeNav组件移动到components文件夹里面
- 然后用一个div把h2和分类列表全都包裹住
- 因为在search里面的分类是需要鼠标移入到里面才能显示,所以我们需要给这个div一个鼠标移入和移出事件,用一个变量来切换,给分类列表一个v-show,并给他一个计算属性,用计算属性来确认它是否隐藏
- 在计算属性里面,先判断当前路由是否在首页home里面,如果在就永久显示,不在就把鼠标事件的变量返回,
- 做好了TypeNav组件里面的内容,还需要把组件注册为全局组件,然后给search里面也加上


### mock拦截请求的配置
- 下载mockjs
- 把request文件复制一份,然后名字后面加上Mock,在request文件夹里面的index里面引入并暴露
- 在src里面新建文件夹mock,然后再建data文件夹,在里面新建文件banner.json,里面就是轮播图的数据,在mock文件夹里面创建index,引入mock,引入数据,开始拦截请求,第一个参数是拦截的地址,随便写,第二个是发送的什么请求,第三个是模仿后端返回的数据的对象
    ```js
        {
            code: 200,
            data: banner,
            message: "成功",
            ok: true,
        }
    ```
- 在api里面请求List组件中的轮播图数据,地址就为mock里面的地址
- 然后在List组件里面开始初始化发送请求
- 注意:在分类列表跳转到search里面的时候,一跳转就要给显示的分类列表变成隐藏


### List中banner的获取及渲染&&&解决mock数据后数据内部图片问题
- 在data中创建一个数据,用来存放轮播图的数据,
- 在methods中请求轮播图数据,然后把数据放入到data数据中,在初始化里面进行请求,
- 用数据给轮播图进行遍历,把数据全部放入
- 在这时,图片是找不到的,因为我们这是假的数据,需要把图片放在public里面的images里面


### swiper的引入及使用
- 下载swiper@5
- 这是专门用来做轮播图的包
- 给List组件进行引入swiper,和`import "swiper/css/swiper.min.css"`
- 在初始化的时候直接用
    ```js
        <!-- .swiper-container是用轮播图的位置 -->
        new Swiper(".swiper-container", {
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: ".swiper-pagination",
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        });
    ```


### $nextTick的作用和使用
- 这个时候轮播图会出现一个问题,就是划不动,因为在swiper运行之后,轮播的数据还没到或者是DOM还没渲染完成,所以导致这个问题
- 我们需要使用$nextTick来解决,$nextTick:将nextTick回调函数，延迟到数据更新后，并且 DOM 更新之后执行。在修改数据之后立即使用它，然后等待 DOM 更新才会执行回调函数


### floor组件的mock数据获取及数据渲染
- 在mock里面的data里面给floor建立一个json数据文件,可以把`import "swiper/css/swiper.min.css"`在别的位置删除了,直接在入口文件里面引入
- 然后在index里面进拦截,返回数据,在api的home,书写请求
- 因为floor组件不止有一个,是多个,需要在Home里面进行发起请求,还是用一个数据来保存请求到的数据,在初始化里面请求楼层数据,在methods里面书写请求的方法
- 然后把数据给到Floor组件里面进行v-for遍历,把数据传给组件里面
- 在Floor组件里面接收数据,把数据放入模板中



### 封装swiper公共组件前 让两个swiper的组件保持一致
- 可以看到的是List组件和Floor组件都使用到了轮播图,所以我们可以把swiper进行封装组件,在这之前需要把两个组件的swiper变成一致
- 可以在components文件夹里面先创建Swiper组件,然后把模板先放入进行,还有传入的参数list,因为list就是我们接收到的轮播图的数据名
- 首先,在Floor组件中使用swiper的时候,因为我们需要封装组件,就不能用什么类名之类的了,因为可能组件会复用,多个的时候造成冲突,可以使用ref来绑定这个元素,

- 然后开始在watch里面监听这个数据,List的数据并不是直接里的毕竟,floor的数据是直接有的,所以我们需要在监听的时候先立即监听,然后在handler函数里面进行判断,如果数据的长度为0就直接返回,不进行下一步的操作
- 在进行swiper的时候都需要用$nextTick进行包裹,以防数据还没来就调用了swiper



### 封装swiper公共组件
- 把里面的watch复制到Swiper组件里面,将监听对象改为list
- 把Swiper组件注册为全局组件
- 在List组件里面把组件的轮播图模板都可以用Swiper来代替,要把轮播图的数据用list传给Swiper组件,Floor也是一样