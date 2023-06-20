<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort">
        <div class="all-sort-list2" @mouseenter="isStor = true" @mouseleave="isStor = false">
          <div
            class="item"
            v-for="(Category1, index) in Category1List"
            :key="Category1.id"
            @mouseenter="mouseEneterReqCate2Throttle(Category1, index)"
            @mouseleave="isActive = -1"
            :class="{ active: isActive === index }"
          >
            <h3>
              <a href="">{{ Category1.name }}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl
                  class="fore"
                  v-for="Category2 in Category1.children"
                  :key="Category2.id"
                >
                  <dt>
                    <a href="">{{ Category2.name }}</a>
                  </dt>
                  <dd>
                    <em
                      v-for="Category3 in Category2.children"
                      :key="Category3.id"
                    >
                      <a href="">{{ Category3.name }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <h3>
            <a href="">箱包</a>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reqCategory1List,
  reqCategory2List,
  reqCategory3List,
} from "@/api/home";
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      // 1级列表数据的容器
      Category1List: [],
      // 是否添加avtive类名的
      isActive: -1,
      // 2级列表数据的容器
      Category2List: [],
      // 判断是否移出了列表
      isStor: false,
    };
  },
  // 初始化1级列表
  mounted() {
    // 初始请求1级列表
    this.getCategory1List();

    // 使用throttle来获得一个节流函数,用一个函数来进行占位
    this.mouseEneterReqCate2Throttle = throttle(this.mouseEneterReqCate2, 300, {
      //leading:让事件函数在节流开始前执行
      leading: true,
      //trailing配置项让函数在节流结束后执行最后一次
      trailing: true,
    });
  },
  
  methods: {
    // 1级列表的请求
    async getCategory1List() {
      // 异步请求
      const result = await reqCategory1List();
      // 将数据放入变量,然后去.item中遍历
      this.Category1List = result;
      // console.log(this.Category1List);
    },

    // 根据1级列表的id来请求2级列表
    async mouseEneterReqCate2(Category1, index) {
      // 看门狗,如果鼠标没移出这个列表区域,就直接返回
      if(!this.isStor) return

      // 将下标的值给到isActive,等会判断的时候,如果下标和isActive相等就把类名active给它
      this.isActive = index;

      // 如果这个1级列表对应的2级列表已经请求过了,不必再请求一遍,提高性能,减少渲染和请求的时间,因为2级列表放在1级列表数据里的children里面
      if (Category1.children) return;
      // 请求2级列表,并加上1级列表的id
      const result = await reqCategory2List(Category1.id);

      // 因为3级列表没有在2级列表里面被一起请求过去,所以要把请求的3级列表放入2级列表里面,循环2级列表的数据,
      result.forEach(async (item) => {
        // 方法2:也是把3级列表的数据方法2级列表每一项数据的children里面,需要在请求之前,先创建一个空的数组children
        // item.children = []
        // 请求3级列表
        const result = await reqCategory3List(item.id);
        //方法2: 把3级列表的数据放入2级列表数据的children里面
        // item.children = result
        //方法1:请求完数据之后,给2级列表数据的每一项都创建一个children属性,并且放入3级列表数据
        this.$set(item, "children", result);
      });

      // 在访问1级列表其中的数据的时候,给数据创建一个children属性,用来存放2级列表
      this.$set(Category1, "children", result);
    },
    // 定义为一个占位函数,把1级列表的节流赋给了它
    mouseEneterReqCate2Throttle() {},
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          &.active {
            h3 {
              background: #65cdfd;
            }
          }
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>