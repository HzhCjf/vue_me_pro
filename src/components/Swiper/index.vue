<template>
  <div ref="swiper" class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 为List组件和Floor组件封装的全局组件,用来搞定轮播图
import Swiper from 'swiper';
export default {
    name:'Swiper',
    props:['list'],
    watch: {
    list: {
      // 立即监听
      immediate: true,
      handler() {
        // 如果数据还没来就不进行swiper组件渲染
        if (this.list.length === 0) return;
        this.$nextTick(() => {
          new Swiper(this.$refs.swiper, {
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
        });
      },
    },
  },
};
</script>

<style>
</style>