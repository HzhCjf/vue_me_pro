## 前端项目 PC

### 自动打开浏览器配置(根据个人喜爱选择)

vue.config.js 文件里面

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

### 设置 eslint

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

- 还需要在 jsconfig.json 文件里面继续进行配置,使其他书写代码的时候有提示,
  在 paths 配置项里

### less 的配置

- 下载 less-loader,然后直接在组件文件中的 style 标签里面书写 lang="less"

### 头部组件和脚部公共组件

- 书写 templa 里面的模板,还有 css,然后把 reset.css 也要引入进 index,html 里面,需要删除第一行,已经引入图片

### 路由搭建

- 下载 vue-router@3
- 创建路由组件文件,包括 router 文件需要自行书写路由表,mode 要改为 history 模式
- 路由组件包括 404(NotFount),主页(Home),登录(Login),注册(Register),搜索(Search)
- 放入 App 组件
- 头部组件的跳转要设置

### 重写 push 和 replace 解决编程式重复导航 bug

- 用一个变量接收本来的 push 方法,然后重写 push,函数接收 loaction,onComplate,onAbort 三个变量,onComplate 和 onAbort 的默认值为一个回调函数,调用接收 push 方法的变量名,用 call 改变其 this 指向,然后把参数放进去,
- replace 如上

### Footer 组件的条件渲染

- 方法 1:直接用插值语法写
- 方法 2:用计算属性
- 方法 3:用计算属性白名单
- 方法 4:路由元信息方式

### Home 组件的静态

- 在 Home 文件夹里面创建新的组件文件夹,需要把里面的静态全部创建静态文件,然后把图片和 css 全部放入

### axios 拦截器的配置

- 下载 axios
- 在 src 里面创建 request 文件夹,创建 request 文件,引入 axios,创建实例,变量 request 接收 axios.create 创建的实例,里面配置 baseURL 是目标地址,timeout 是超时时间,headers 是一个对象,是配置头部信息的
- 请求拦截器是用 interceptors 来做,然后使 request.use,里面有一个参数 config,直接返回 config 就行
- 响应拦截器也是用 interceptros 来做,然后用 response.use,有两个回调函数,一个参数是 response,一个是 error,用来返回数据和处理错误,
- 在 request 文件夹里面创建一个 index 文件,引入 request 文件,然后暴露这个实例

### 跨域的正向代理配置

- 在 vue.config.js 文件
- 在里面配置跨域客户端的代理,属于正向代理,用 proxy 配置项,用前缀,是一个对象,target 用来配置目标地址,changeOrigin 用来配置是否代理,pathRewrite 来重写前缀
- 在 request 文件中替换掉 baseURL 中写的死路径
- 在 main 文件中引入 request,用 get 发起获取数据的请求和它的地址

### 环境变量 env 配置

- 创建开发使用.env.development 文件书写接收跨域前缀的变量名,建议全大写,如 VUE_APP_API1
- 创建上线使用.env.production,内容如上
- 在拦截器实例中替换掉原来的

### 项目响应拦截器的完整配置

- 在响应拦截器中返回数据的时候,不是请求成功了,就一定是我想要的数据,之后后端返回的数据的 code 是 200 的时候才是我想要的数据,所以要进行判断,然后返回我们需要的数据,失败就返回错误的 promise

### 路由切换是进度条的配置

- 下载 nprogress 包
- 在路由配置中引入 NProgress,和"nprogress/nprogress.css",然后设置全局前置守卫和全局后置钩子,在前置里面进度条开始,后置里面结束

### 组件点击搜索跳转 search

- 为搜索按钮绑定点击事件
- 在 methods 里面为点击事件创建一个方法,用来跳转 search,需要把这个搜索框里面的数据也要传过去,可以在数据里面创建一个 keyword 来和输入框里面的数据进行绑定,然后在跳转到 search 的方法里面进行传参,可以用 params 来进行传参,需要记住的是,参数不能为空字符串,需要在 search 路由那边也要进行参数占位,因为这个参数是可选的

### 搜索的时候合并 params 和 query 参数

- 在点击搜索的时候要获取当前路由的 query 参数,然后把参数给到跳转路由
- 在点击分类列表跳转到 search 的时候要获取可能存在的 parmas 参数,然后把参数也要给到跳转路由

### 切换 TypeNav 为公共组件

- 因为不止在首页要用到 TypeNav 组件,search 里面也要用到,所以需要把 TypeNav 变成公共组件
- 直接把 TypeNav 组件移动到 components 文件夹里面
- 然后用一个 div 把 h2 和分类列表全都包裹住
- 因为在 search 里面的分类是需要鼠标移入到里面才能显示,所以我们需要给这个 div 一个鼠标移入和移出事件,用一个变量来切换,给分类列表一个 v-show,并给他一个计算属性,用计算属性来确认它是否隐藏
- 在计算属性里面,先判断当前路由是否在首页 home 里面,如果在就永久显示,不在就把鼠标事件的变量返回,
- 做好了 TypeNav 组件里面的内容,还需要把组件注册为全局组件,然后给 search 里面也加上

### mock 拦截请求的配置

- 下载 mockjs
- 把 request 文件复制一份,然后名字后面加上 Mock,在 request 文件夹里面的 index 里面引入并暴露
- 在 src 里面新建文件夹 mock,然后再建 data 文件夹,在里面新建文件 banner.json,里面就是轮播图的数据,在 mock 文件夹里面创建 index,引入 mock,引入数据,开始拦截请求,第一个参数是拦截的地址,随便写,第二个是发送的什么请求,第三个是模仿后端返回的数据的对象
  ```js
      {
          code: 200,
          data: banner,
          message: "成功",
          ok: true,
      }
  ```
- 在 api 里面请求 List 组件中的轮播图数据,地址就为 mock 里面的地址
- 然后在 List 组件里面开始初始化发送请求
- 注意:在分类列表跳转到 search 里面的时候,一跳转就要给显示的分类列表变成隐藏

### List 中 banner 的获取及渲染&&&解决 mock 数据后数据内部图片问题

- 在 data 中创建一个数据,用来存放轮播图的数据,
- 在 methods 中请求轮播图数据,然后把数据放入到 data 数据中,在初始化里面进行请求,
- 用数据给轮播图进行遍历,把数据全部放入
- 在这时,图片是找不到的,因为我们这是假的数据,需要把图片放在 public 里面的 images 里面

### swiper 的引入及使用

- 下载 swiper@5
- 这是专门用来做轮播图的包
- 给 List 组件进行引入 swiper,和`import "swiper/css/swiper.min.css"`
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

### $nextTick 的作用和使用

- 这个时候轮播图会出现一个问题,就是划不动,因为在 swiper 运行之后,轮播的数据还没到或者是 DOM 还没渲染完成,所以导致这个问题
- 我们需要使用$nextTick来解决,$nextTick:将 nextTick 回调函数，延迟到数据更新后，并且 DOM 更新之后执行。在修改数据之后立即使用它，然后等待 DOM 更新才会执行回调函数

### floor 组件的 mock 数据获取及数据渲染

- 在 mock 里面的 data 里面给 floor 建立一个 json 数据文件,可以把`import "swiper/css/swiper.min.css"`在别的位置删除了,直接在入口文件里面引入
- 然后在 index 里面进拦截,返回数据,在 api 的 home,书写请求
- 因为 floor 组件不止有一个,是多个,需要在 Home 里面进行发起请求,还是用一个数据来保存请求到的数据,在初始化里面请求楼层数据,在 methods 里面书写请求的方法
- 然后把数据给到 Floor 组件里面进行 v-for 遍历,把数据传给组件里面
- 在 Floor 组件里面接收数据,把数据放入模板中

### 封装 swiper 公共组件前 让两个 swiper 的组件保持一致

- 可以看到的是 List 组件和 Floor 组件都使用到了轮播图,所以我们可以把 swiper 进行封装组件,在这之前需要把两个组件的 swiper 变成一致
- 可以在 components 文件夹里面先创建 Swiper 组件,然后把模板先放入进行,还有传入的参数 list,因为 list 就是我们接收到的轮播图的数据名
- 首先,在 Floor 组件中使用 swiper 的时候,因为我们需要封装组件,就不能用什么类名之类的了,因为可能组件会复用,多个的时候造成冲突,可以使用 ref 来绑定这个元素,

- 然后开始在 watch 里面监听这个数据,List 的数据并不是直接里的毕竟,floor 的数据是直接有的,所以我们需要在监听的时候先立即监听,然后在 handler 函数里面进行判断,如果数据的长度为 0 就直接返回,不进行下一步的操作
- 在进行 swiper 的时候都需要用$nextTick 进行包裹,以防数据还没来就调用了 swiper

### 封装 swiper 公共组件

- 把里面的 watch 复制到 Swiper 组件里面,将监听对象改为 list
- 把 Swiper 组件注册为全局组件
- 在 List 组件里面把组件的轮播图模板都可以用 Swiper 来代替,要把轮播图的数据用 list 传给 Swiper 组件,Floor 也是一样

### 在组件中拿到动态路由参数

- search 组件初始化的时候请求 api 封装:/api/list,传递一个参数 data
- 在组件中定义一个数据 searchParams:
  ```js
     searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "",
        pageNo: 1,
        pageSize: 10,
      },
      attrsList: [],
      goodsList: [],
      trademarkList: [],
  ```
- 在初始化请求的时候把参数传入
- 每次我们点击分类列表请求的数据的时候,就要重新获取数据,所以我们需要监听路由,并且是立即监听一次,在监听的时候,参数为route,然后解构query参数和params参数,然后把searchParams重写
- 在methods里面获取搜索列表,然后在初始化生命周期里面初始化就行,把参数全部都需要传入
- 路由里面的是一定要props传参的


### 页数据的列表渲染
- 渲染子组件里面的trademarkList,这是品牌
- 渲染子组件里面的attrsList,这是平台属性
- 需要把数据传递给子组件,然后子组件接收
- 然后父组件里面也需要渲染的内容goodsList
- 监听searchParams,每次数据改变,都需要重新获取数据,因为里面有数据或者对象的,需要深度获取deep


### 点击修改品牌并发送请求
- 属于父组件操作子组件
- 定义一个自定义事件,接收一个参数,是这个品牌的id:name
- 然后在事件函数里面把这个品牌trademark的值修改的参数
- 给子组件绑定这个自定义事件,在子组件里面的品牌里面绑定自定义事件,然后传递参数


### search标识
- 在标识里面只留一个li就行,因为剩下的都需要自己来操作,不需要循环写
- 首先得给这个来一个什么时候渲染,当有这个trademark有的时候渲染
- 里面的字,自己随意编写,例如:品牌:品牌名称
- 当点击x的时候把值清空


### 搜索标识和删除标识
- 这属于是兄弟之间的传递操作
- 需要使用$bus来进行解决传递或者操作
- 在入口文件里面在初始化之前,定义一个$bus
- 在search组件里面定义一个自定义事件clearKeyword事件,先清空地址栏中parmas参数,重新跳转路由即可,也就是在跳转的时候不传params参数即可,重新获取数据后,也需要清空搜索框,直接调用clearKeyword事件函数通知兄弟组件
- 在兄弟组件Header里面初始化绑定传来的自定义事件,第一个参数为事件名,第二个为回调函数,直接清空已经双向绑定的keyword属性即可
- 在search组件里面为其添加标识,如何判断什么时候开始渲染标识,当searchParams里面的keyword存在的时候就开始渲染,然后点击x的时候直接调用自定义事件clearKeyword




### 平台属性的标识展示和删除
- 在父组件search里面创建一个自定义事件changeAttr,接收一个参数,是平台属性的id:value:name,因为每点击一次这个属性就要把这个属性添加到props数组里面,所以要先判断当前数组里面是否有这个值,如果有直接返回,没有则直接添加
- 给子组件绑定自定义事件
- 在子组件里面为平台属性那里绑定点击事件,里面调用自定义事件,第一个参数为事件名,第二个为传递给事件的值
- 开始为平台属性添加标识,直接循环数组props里面的数据,中间的字随便编写,例如:name和value,自己来截断里面的值,然后给x添加一个点击事件,因为这次不是清空里面的值,而是去除数组中的其中一个的值,可以用下标来进确认清除的值,在点击事件clearAttr里面接收下标,然后用splice清除这个值,第一个参数为下标,第二个参数为清除几个


### search-iconfont图标
- 用阿里巴巴里面的iconfont即可,自行使用,然后在排序按钮那里开始进行使用,记得需要在index.html里面进入引入,我们一般不会下载这些,都是直接引入


### 排序按钮的动态样式
- 首先需要给order属性里面添加一个默认值:1:asc,1代表的是组合,如果为2就代表价格,asc代表的是升序,desc代表降序
- 首先在综合和价格按钮排序里面,需要考虑的是当这个值为1或者2的时候,适当的时机添加active类名
- 其次在这个值为asc的时候添加什么样子的icon类名,所以需要用到动态类
- 还有就是当这个值1或者2的时候,另一个是否进行隐藏


### 按钮排序逻辑
- 为其添加一个点击事件order,传递一个参数,为1或者2,把属于自己的按钮类型进行传入
- 事件接收参数,为现在的按钮类型nowType,解构之前的按钮类型和排序方法
- 判断:如果旧的按钮类型一致,则直接对排序进行取反就可以了,如果不一致,则直接把现在的类型给到order,然后默认排序为降序
