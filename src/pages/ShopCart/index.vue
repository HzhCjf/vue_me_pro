<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="good in cartInfoList" :key="good.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="good.isChecked" @change="checkCart(good.skuId,good.isChecked)">
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl">
            <div class="item-msg">{{ good.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum(good,-1,good)">-</a>
            <input autocomplete="off" type="text" :value="good.skuNum" minnum="1" class="itxt" @change="setNum(good,$event)">
            <a href="javascript:void(0)" class="plus"  @click="changeNum(good,1,good)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.skuPrice *  good.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(good.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="bacthCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="batchDelete">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ goodsNum }}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ goodsPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
    <div class="mark" v-show="isMark"></div>
  </div>
</template>

<script>
import {reqShopCartList,reqCheckCart,reqDeleteCart,reqBatchCheckCart,reqBatchDelete,} from '@api/shopCart'
import {reqAddCartOrChangeNum} from '@api/detail'
  export default {
    name: 'ShopCart',
    data(){
      return{
        // 购物车列表数据
        cartInfoList : [],
        // loading
        isMark:false
      }
    },
    mounted(){
      this.getShopCartList()
    },
    methods:{
      // 请求购物车列表数据
      async getShopCartList(){
        this.isMark = true
         const result = await reqShopCartList()
        //  console.log(result);
        // 将列表数据放到数据中
         this.cartInfoList = result[0]? result[0].cartInfoList : []
         this.isMark = false
         this.cartInfoList.forEach(item=>{
          // 为每一个商品都添加一个isReq属性,初始值为false
          this.$set(item,'isReq',false)
         })
      },

      // 切换选中状态,需要一个skuId和它的状态值isChecked
      async checkCart(skuId,isChecked){
        try{
          // 发起切换请求,当发起请求后,把状态值给改变,如果为1改为0,如果为0改为1
          this.isMark = true
          await reqCheckCart(skuId,isChecked === 0 ? 1 : 0)
          this.$message.success('选择成功')
          
          // 重新获取购物车列表
          this.getShopCartList()
        }catch(e){
          this.$message.error('选择失败')
        }
      },
      
      // 删除商品请求,需要商品的skuId
      async deleteCart(skuId){
        try{
          // 发起请求
          this.isMark = true
          await reqDeleteCart(skuId)
          this.$message.success('删除成功')
          // 重新获取购物车列表
          this.getShopCartList()
        }catch(e){
          this.$message.error('删除失败')
        }
      },

      // 删除已选的商品
      async batchDelete(){
        const skuIdList = this.cartInfoList.reduce((p,c)=>{
            return c.isChecked === 1? [...p,c.skuId] :p
          },[])

          try{
            this.isMark = true
            await reqBatchDelete(skuIdList)
            this.$message.success('已选商品删除成功')

            this.getShopCartList()
          }catch(e){
            this.$message.error('已选商品删除失败')
          }
      },

      // 更改商品数量按钮
      async changeNum(good,num){
        const {skuNum,skuId,isReq} = good
        // 当isReq为true的时候,说明现在正在发起请求,所以直接返回
        if(isReq) return

        // 当数量小于等于1的时候就说明不能再往下减了,但是可以加,所以当是-1的时候直接返回
        if(skuNum <= 1 && num === -1) return 

        // isReq是false,说明现在是要开始发起请求,把isReq改为true
        good.isReq = true
        try{
          this.isMark = true
          await reqAddCartOrChangeNum(skuId,num)
          this.$message.success('商品数量更改成功')
          await this.getShopCartList()
          // 等请求发送完毕,再把isReq改为false,就可以继续开始更改数量了
          good.isReq = false
        }catch(e){
          this.$message.error('数量更改失败')
          //把isReq改为false,就可以继续开始更改数量了
          good.isReq = false
        }
      },

      // 输入更改数量
      async setNum(good,e){
        // 如果输入的不是数字或者小于等于0
        if(isNaN(e.target.value) || e.target.value <= 0){
          // 恢复为原来的值
          e.target.value = good.skuNum
        }

        try{
          // 请求更改数量
          this.isMark = true
          await reqAddCartOrChangeNum(good.skuId,e.target.value - good.skuNum)
          this.$message.success('数量更改成功')
          this.getShopCartList()
          
        }catch(e){
          this.$message.error('更改数量失败')
        }
      }
    },
    computed:{
      // 全选的计算属性
      bacthCheck:{
        // 当所有的商品的状态值都为1的时候就返回true,把全选选中
        get(){
          // every,当所所有的isChecked都为1的时候返回true,如果有一个不为1,则为false
          return this.cartInfoList.every(item =>{
            return item.isChecked === 1
          })
        },
        // 当修改全选的时候,接收一个新值,是当前修改后的值(true或者false)
        async set(newVal){
          // 用reduse来收集所有商品的skuId,p是当前值,为一个空数组,c为数据,直接返回展开的p数组和数据的skuId,相当于把所以的skuId都push进了p数组
          const skuIdList = this.cartInfoList.reduce((p,c)=>{
            return [...p,c.skuId]
          },[])
          // 因为全选的请求需要一个isChecked和skuIdList所有商品状态值列表
          try{
            // 把全选的状态值给用三元转换为1或者0,用skuIdList一起发起请求
            this.isMark = true
            await reqBatchCheckCart(newVal ? 1 :0,skuIdList)
            this.$message.success('全选成功')
            this.getShopCartList()
          }catch(e){
            this.$message.error('全选失败')
          }
        }
      },
      // 商品件数
      goodsNum(){
        return this.cartInfoList.reduce((p,c)=>{
            return c.isChecked === 1? p+c.skuNum :p
          },0)
      },
      // 商品总价
      goodsPrice(){
        return this.cartInfoList.reduce((p,c)=>{
            return c.isChecked === 1? p+c.skuPrice *  c.skuNum :p
          },0)
      }
    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;
    position: relative;

    .mark{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top:0;
      background:url('https://hbimg.b0.upaiyun.com/26cdedb3deada7bd52c32a1ecfdb6a2329ffe47e2851-MXP5q2_fw658') 0 0 no-repeat ;
      background-size: 100% 100%;
      opacity: .5;
    }

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>