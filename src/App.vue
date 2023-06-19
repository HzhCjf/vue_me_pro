<template>
  <div>
    <Header v-if="$route.name!=='NotFound'" />
    <router-view></router-view>
    <!-- 根据路由判断Footer组件条件渲染的第一种方法:直接一个个判断写 -->
    <!-- <Footer v-if="$route.name !== 'Login' && $route.name!=='Register' && $route.name!=='NotFound'" /> -->
    <Footer v-if="FooterisShow" />
  </div>
</template>

<script>
import Header from '@comp/Header'
import Footer from '@comp/Footer'
export default {
  name:'App',
  components:{
    Footer,
    Header
  },
  data(){
    return{
      // FooterisShowList:['Login','Register']
    }
  },
  computed:{
    // 根据路由判断Footer组件是否渲染
    FooterisShow(){
      //第二种方法: Footer组件条件渲染的第二种写法:用计算属性来返回是否渲染
      // return this.$route.name !== 'Login' && this.$route.name!=='Register' && this.$route.name!=='NotFound'

      // 第三种方法:用白名单的方式来判断是否渲染Footer组件
      // return !this.FooterisShowList.includes(this.$route.name)

      // 第四种方法:用路由中元信息meta来判断是否渲染
      return !this.$route.meta.FooterIsHidden

    }
  }
}
</script>

<style lang="less">

</style>