<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.trademark">
              品牌:{{ searchParams.trademark.split(":")[1]
              }}<i @click="searchParams.trademark = ''">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              搜索:{{ searchParams.keyword }}<i @click="clearKeyword">×</i>
            </li>
            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="item"
            >
              平台属性:{{ item.split(":")[1] }}--{{ item.split(":")[2]
              }}<i @click="clearAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          :trademarkList="trademarkList"
          :attrsList="attrsList"
          @changeTrademark="changeTrademark"
          @changeAttr="changeAttr"
          @clearAttr="clearAttr"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 当order属性里面的值为1的时候就把active类名给到这个li -->
                <li
                  :class="{ active: searchParams.order.split(':')[0] === '1' }"
                  @click="order('1')"
                >
                <!-- 1.当order的值为asc的时候就用icon-manyue类名,否则用半月类名 2.当order的值为1的时候就显示,不为1就隐藏 -->
                  <a
                    >综合<span
                      class="iconfont"
                      :class="
                        searchParams.order.split(':')[1] === 'asc'
                          ? 'icon-manyue'
                          : 'icon-banyue'
                      "
                      v-show="searchParams.order.split(':')[0] === '1'"
                    ></span
                  ></a>
                </li>
                <!-- 当order属性里面的值为2的时候就把active类名给到这个li -->
                <li
                  :class="{ active: searchParams.order.split(':')[0] === '2' }"
                  @click="order('2')"
                >
                <!-- 1.当order的值为asc的时候就用icon-manyue类名,否则用半月类名 2.当order的值为1的时候就显示,不为1就隐藏 -->
                  <a
                    >价格<span
                      class="iconfont"
                      :class="
                        searchParams.order.split(':')[1] === 'asc'
                          ? 'icon-manyue'
                          : 'icon-banyue'
                      "
                      v-show="searchParams.order.split(':')[0] === '2'"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a><img :src="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a>{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { reqSearchInfo } from "@/api/search";
export default {
  name: "Search",

  components: {
    SearchSelector,
  },

  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "1:asc",
        pageNo: 1,
        pageSize: 10,
      },
      attrsList: [],
      goodsList: [],
      trademarkList: [],
    };
  },

  /*
    初期我们使用的是props拿动态路由参数,但是后期在初始化获取props的值可能有问题,所以我们可以选择一下其他的方式
  */
  /* props: [
    "keyword",
    "category1Id",
    "category2Id",
    "category3Id",
    "categoryName",
  ], */

  mounted() {
    //1.初始化搜索列表
    this.getSearchInfo();
  },

  methods: {
    //1. 获取搜索列表
    async getSearchInfo() {
      const result = await reqSearchInfo(this.searchParams);
      this.attrsList = result.attrsList;
      this.goodsList = result.goodsList;
      this.trademarkList = result.trademarkList;
    },

    //2. 子组件修改searchParams的trademark的 自定义事件函数
    changeTrademark(value) {
      this.searchParams.trademark = value;
    },

    // 请求搜索的标识,重新获取数据,并且绑定事件总线,去除掉搜索框里面的内容
    clearKeyword() {
      this.$router.push({
        name: "Search",
        query: this.$route.query,
      });
      this.$bus.$emit("clearKeyword");
    },

    // 添加平台属性的标识
    changeAttr(value) {
      if (this.searchParams.props.includes(value)) return;
      this.searchParams.props.push(value);
    },

    // 删除单个平台属性的标识
    clearAttr(index) {
      this.searchParams.props.splice(index, 1);
    },

    // 按钮排序,传入需要是什么按钮
    order(nowType){
      // 解构之前的按钮名字和排序
      const [lastType,lastOrder] = this.searchParams.order.split(':')
      // 当按钮还是同一个的时候,就只是将排序取反即可
      if(nowType === lastType){
        this.searchParams.order = `${nowType}:${lastOrder === 'desc' ? 'asc':'desc'}`
        // 当不是同一个按钮的时候,就取现在的按钮,默认为降序
      }else{
        this.searchParams.order = `${nowType}:'desc'`
      }
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler(route) {
        // console.log(this.$props, this);

        // this.searchParams.category1Id = this.category1Id;
        const { category1Id, category2Id, category3Id, categoryName } =
          route.query;
        const { keyword } = route.params;

        this.searchParams = {
          ...this.searchParams,
          category1Id,
          category2Id,
          category3Id,
          categoryName,
          keyword,
        };
      },
    },

    // 当数据发生改变的时候,重新获取数据
    searchParams: {
      deep: true,
      handler() {
        this.getSearchInfo();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
