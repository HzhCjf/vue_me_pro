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


















# 2023-6-26

### 页码静态
- 新建公共组件页码`Pagination`
- 把页码部分放入组件
- 然后在入口文件中把组件注册为公共组件
- 放在`Search`里面进行引用


### 页码组件数据控制
- `Search`
- 页码的组成需要当前页`pageNo`,总条数`total`,总页数`totalPages`想数据传入`Pagination`页码组件,当前页`pageNo`可以使用.sync修饰符来进行双向绑定

### 页码组件连续页的计算
- `Search`
- 将`continuePage`连续页传入`Pagination`页码组件里面,值可以写死
- 我们可以写一个计算属性来计算连续页值startEnd
- 初始的时候,先定义第一个值和最后一个值
- 当总页数小于连续页的长度的时候,直接把第一个赋值为1,最后一个为总页数
- 当总页数大于连续页的长度的时候,则第一个是当前页减去连续页长度-1除以2.例如:当前页(5)-(连续页(5)-1)/2 值为3,最后一个为当前页+连续页-1除以2,例如当前页(5)+(连续页(5)-1)/2 值为7,这样计算下来,连续页就为3,4,5,6,7当前页在中间
- 判断临界值:当第一个小于1的时候,直接赋值为1,最后一个为连续页长度
- 当最后一个大于总页数的时候,第一个值为总页数-连续页+1,例如:总页数(6)-连续页(5)+1 值为2,最后一个值为总页数,那么连续页就是2,3,4,5,6
- 然后一个对象里面是start和end


### 页码连续页渲染
- Pagination
- 因为连续页只要中间的那部分,所以我们渲染连续页的时候,要把得到的连续页单独拎到一个数组里面,然后再渲染


### 页码按钮的条件渲染
- Pagination
- 在上一页和下一页要用当前页pageNo进行判断是否禁用
- 第一页渲染的条件要看连续页的第一个值是否是1,不然会出现两个第一页
- 最后一页的渲染条件要看连续页的最后一个是否小于总页数
- 第一个省略要看第一个值是否大于2,只有大于2才能渲染,不然不合理,例如第一个为1,如果第一个值为2的话,中间还有一个省略就显得十分不合理
- 后面一个省略要看最后一个值是否小于总页数-1,例如总页数为8,最后一个值为8,这样就会出现有省略还有两个8的场景
- 最后一页要看最后一个值是否小于最后一页


### 页码交互及active
- Pagination
- 用.sync的事件来改变当前页的值
- 给当前页添加上active类名,当当前页与页码相等的时候


### detail-路由搭建和路由跳转并传参
- 把detail的静态组件组件方法pages里面
- 在Search里面,点击图片的时候跳转到Detail详情页,并且携带参数id
- 为Detail建立路由

### detail-请求数据和数据分析
- 新建detail.js,请求详情页数据reqGoodDetail,接口/api/item/${skuId}
- Detail
- 异步请求数据getGoodDetail
- 需要用data保存4个值:
  ```js
    // 三级分类列表的等级
      categoryView:{},
      // 购买属性
      spuSaleAttrList:[],
      skuInfo:{},
      // 轮播图
      skuImageList:[],
  ```
- 因为要用这些数据来做渲染,把请求的数据放在对应的data数据中
- 在请求的时候,因为要用到id,可以先用计算属性把路由传递的id给拿取出来



### detail-列表渲染
- 看数据渲染组件和内容


### detail-放大镜效果1
- Zoom
- 给最外层添加上鼠标移动事件mousemove
- 在移动事件里面,先用一个对象来保存蒙版的位置值
- x就为它的左右,y为上下
- 计算的时候,先是鼠标距离事件元素边距的值减去蒙版的宽的一半
- y也一样
- 判断临界值:
  * 当x小于等于0的时候,直接设置为0
  * 当x 大于等于 事件元素的宽 - 蒙版的宽,就直接把x设置为这个值
  * 当y小于等于0的时候,直接设置为0
  * 当y 大于等于 事件元素的高 - 蒙版的高,就直接把y设置为这个值

- 把x和y赋给蒙版的left和top


### detail-放大镜效果&&假报错
- Zoom
- 算出元素去除蒙版的大小后的宽或者高,来对比大图的宽和高来算出比例,然后来进行移动
- 大图的移动时小图的两倍,且方向是反的
- ?. 可选链,因为一开始的skuImageList是一个空数组,所以会出现一个undefined调用imgUrl的报错,等后面ajax请求完后重新渲染数据之后又重新获取了数据,因为这是响应式的数据,我们可以用可选链来解决这个假报错,当?.前面是undefined的时候直接返回一个undefined


### detail-点击图片列表切换图片
- 当点击小图的时候切换轮播图,两个都需要用同一个下标,用下标来进行切换
- 在Detail里面给轮播图的Zoom组件里面传入控制下标的nowIndex参数,给小图组件用.sync来传入,因为是点击它来切换图片,所以需要进行双向绑定
- 把nowIndex给Zoom使用
- 在小图组件里面点击的时候,用.sync的事件来改变index


### detail-图片列表的轮播
- ImageList
- 直接使用swiper就行,需要监控skuImageList属性,毕竟它是需要请求才有,不是初始的时候就有的


### detail-销售属性排他
- Detail
- 在遍历销售属性的时候,为其添加动态类,只有isChecked为1的时候才能有active类名
- 给属性添加点击事件changeAttrValue,需要用到销售属性列表,和下标,因为要先给列表里面所有的isChecked都变成0,然后给点击的isChecked变成1


### detail-商品数量的改变
- Detail
- 把输入框的位置变成只读,然后给其双向绑定数据skuNum
- 给两个按钮添加点击事件changeSkuNum,带参数1或者-1
- 当点击时候,把skuNum累加,判断skuNum是否小于等于0,一旦小于或者等于那么就把skuNum设置为1















# 登录流程:
- 先把静态写好,然后拿到表单数据,手机号和密码,在api里面写好登录的请求,然后到vuex里面的模块的state里面先写入token,在actions里面请求登录获取到token,提交到mutations里面,然后将请求到的token赋值为state里面的token,然后在登录组件里面用辅助函数mapActions来使用表单数据来进行获取token
- 如果需要持久化token,可以创建一插件,先定义tokenKey='token',然后定义一个获取token的函数,在里面获取本地存储的tokenKey,如果没有就返回一个空字符串,再定义一个改变本地存储token的函数,改变的时候接受一个token,与键名tokenKey进行关联,还有一个删除本地存储token的函数,来删除与tokenKey相关联的数据
- 将vuex里面的token放在拦截器的请求头里面,然后写一个获取用户信息的请求,在vuex模块里面的state里面创建一个userInfo来存储用户信息,初始是一个空对象,在actions里面创建一个函数开始请求用户信息,用一个变量result接收,接着用commit提交给mutations,并且携带者result里的用户信息,mutations里面创建一个函数来接收actions里面提交过来的数据,将数据赋值给state里面用来存储用户信息的对象,再书写一个清除token的函数,将state里面的token清空,然后用插件里面删除token的函数来进行删除本地存储的token
- 以上是路由鉴权的准备阶段,将方法都准备好后开始路由鉴权,在路由文件里面创建全局前置守卫,先获取vuex里面的token,然后获取vuex里面的用户信息里面的nickName
- 判断有没有token,如果有,判断去的地方是不是登录页面,如果是,就直接跳转到首页,然后判断是否从首页过去的,如果是就把进度条给关掉,虽然进度条没什么影响,但是影响美观....然后开始判断有没有用户信息,如果有就放行,没有就用store.dispatch调用请求用户信息函数来获取,请求成功返回一个成功的promise,然后进行放行,如果没成功就进入catch,开始用store.commit调用清除vuex里面的token,然后跳转到登录页面
- 如果没有token,判断当前要去的地方在不在白名单之类,或者说需不需要权限,可以用路由配置里面的meta来设置白名单,如果需要权限就直接跳转到登录页面,不需要就放行
















# 2023-6-27

### 加入购物车成功页
- 将`AddCartSuccess`静态组件移入pages
- 给其配置路由
- 在详情组件中给和购物车有关的都添加上跳转


### 加入购物车成功页展示数据
- Detail
- 在点击加入购物车的时候为其创建一个事件函数addCart
- 先来获取销售属性的名称和值,创建一个变量saleAttrList 来接收spuSaleAttrList销售属性的值,用reduce方法来进去获取,先创建一个对象saleAttr用来保存属性名称,然后用 saleAttr.attrName保存他的名称
- 用checkedAttrValue 来接收spuSaleAttrList查找的isChecked是否是1的
- 用saleAttr.attrValue来接收checkedAttrValue 里面的值
- 把对象saleAttr放入p中,然后返回p
- 开始组装要传递给本地临时存储的数据goodData :
  ```js 
      skuImg: this.skuInfo.skuDefaultImg,
      skuName: this.skuInfo.skuName,
      skuNum: this.skuNum,
      saleAttrList: saleAttrList,
  ```
- 临时存储:sessionStorage.setItem来进行存储,第一个值为名称,第二个为数据,要转成json格式的
- 跳转到购物车完成页
- AddCartSuccess
- 在data中创建一个状态来接收本地临时存储的值
- 把数据放在模板中渲染


### 发送加入购物车请求
- 在detail.js中请求添加购物车和修改购物车数量reqAddCartOrChangeNum 
- 接口:/api/cart/addToCart/${skuId}/${skuNum} post
- Detail
- 在加入购物车的时候发起请求,没有返回值



### 购物车-静态
- 将ShopCart组件移入pages里面,为其配置路由
- Hearder点击购物车的时候进行跳转,还有购物完成页的结算也要进行跳转


### 购物车-购物车列表请求
- 创建shopCart.js,发起请求购物车列表reqShopCartList ,接口:/api/cart/cartList get
- ShopCart
- 请求购物车getShopCartList


### 购物车-初始化vuex
- 安装vuex@3
- 创建store文件夹,在里面创建modules模块文件,创建user.js,需要给用户创建一个临时id,因为还没登录,但是可以用购物车,用户体验更好,在state里面创建临时id:userTempId
- 在store里面的index里面引入模块
- 在入口文件中注入store


### 购物车-在vuex中保存用户临时id
- 下载nanoid
- 先在utils文件夹中,创建插件userTempId
- 先引入nanoid,在定义本地存储的key,userTempId='userTempId',直接暴露函数getUserTempId,先判断本地存储中是否存在临时id,如果有就获取这个临时id,没有就在本地存储中设置临时id,然后返回id
- 在user.js中引入,然后给到state中的临时id


### 购物车-请求时配置用户临时ID
- 在请求拦截器的时候在头部加入userTempId,在vuex里面获取

### 购物车-列表渲染
- ShopCart
- 在data中创建状态cartInfoList来接收请求到的购物车列表,然后渲染模板
- this.cartInfoList = result[0] ? result[0].cartInfoList : [];


### 购物车-切换商品选中状态
- shopCart.js
- 请求切换商品选中状态reqCheckCart ,接口:/api/cart/checkCart/${skuID}/${isChecked} get
- ShopCart
- 请求切换商品选中状态,当isChecked为0的时候改为1,反之为0,在切换选框里面为添家change事件函数checkCart
- 每次改变了数据,都需要再请求一边购物车列表数据
### 购物车-删除购物车商品
- shopCart.js
- 请求删除购物车商品reqDeleteCart ,接口/api/cart/deleteCart/${skuId}  delete
- ShopCart
- 在删除那里添加点击事件deleteCart,请求删除购物车商品,重新请求购物车列表数据

### 购物车-购物车的全选按钮
- shopCart.js
- 请求批量选中购物车商品reqBatchCheckCart  ,接口/api/cart/batchCheckCart/${isChecked}`, skuIdList  post ,,skuIdList是所有商品id组成的数组
- 为全选绑定一个计算属性bacthCheck
- 在计算属性的get里面判断购物车列表中的所有商品是否全选,用every来根据isChecked来判断
- 在set中,接收一个newVal,newVal就是全选改变后的值,用变量skuIdList来接收在购物车列表中用reduce累加出来的id,可以用[...p,c.skuId],这样每一次循环都是把之前循环的id展开,然后添加上现在被循环的id
- 请求批量选中购物车商品,请求的时候当newVal为true的时候变成1,反之为0,重新请求购物车列表数据


### 购物车-删除选中商品
- shopCart.js
- 请求删除所有选中的商品reqBatchDelete 接口:/api/cart/batchDeleteCart`, skuIdList ,,post请求
- 给删除选中的商品添加点击事件函数batchDelete
- 还是跟全选中一样的方式获取所有商品的id
- 然后发起请求,重新请求购物车列表数据

### 购物车-其他计算
- 为已选择多少件商品创建计算属性goodsNum
- 用reduce来累加,当isChecked为1的时候就进行累加
- 为总价创建计算属性goodsPrice 
- 用reduce来进行累加,当isChecked为1的时候,累加单价*数量,否则只是返回p


### 购物车-商品数量的点击累加和累减
- 为减号和加号添加上点击事件函数changeNum,需要用到id和num-1或者1,还要数量skuNum
- 当数量为1并且num为-1的时候直接返回,不然就要减到负数或者0了
- 发起加入购物车的请求,引入detail中的reqAddCartOrChangeNum,需要用id和num,重新获取购物车列表数据