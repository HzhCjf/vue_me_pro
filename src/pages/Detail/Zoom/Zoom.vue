<template>
  <div class="spec-preview" @mousemove="mousemove">
    <!-- ?. 可选链,因为一开始的skuImageList是一个空数组,所以会出现一个undefined调用imgUrl的报错,等后面ajax请求完后重新渲染数据之后又重新获取了数据,因为这是响应式的数据,我们可以用可选链来解决这个假报错,当?.前面是undefined的时候直接返回一个undefined -->
    <img :src="skuImageList[nowIndex]?.imgUrl" />
    <div class="event"></div>
    <div class="big" >
      <img :src="skuImageList[nowIndex]?.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList','nowIndex'],
    methods:{
      mousemove(e){
        // x得到鼠标距离宽的距离减去蒙版一半的宽度得到蒙版距离这个事件元素的距离
        // y得到鼠标距离事件元素的距离减去蒙版一半的高度得到蒙版距离这个事件元素的距离
        const maskLocation ={
          x: e.offsetX - this.$refs.mask.offsetWidth/2,
          y:e.offsetY - this.$refs.mask.offsetHeight/2
        }

        // 设置临界值
        if(maskLocation.x <= 0){
          maskLocation.x = 0
          // 当x的距离大于事件元素的宽度减去蒙版的宽度,就直接把x设置为这个距离,因为这是蒙版要从右边快超出的时候
        } else if(maskLocation.x >= e.target.clientWidth  - this.$refs.mask.offsetWidth){
          maskLocation.x = e.target.clientWidth  - this.$refs.mask.offsetWidth
        }

        if(maskLocation.y <= 0){
          maskLocation.y = 0
        } else if(maskLocation.y >= e.target.clientHeight - this.$refs.mask.offsetHeight){
          maskLocation.y = e.target.clientHeight - this.$refs.mask.offsetHeight
        }

        this.$refs.mask.style.left = maskLocation.x + 'px'
        this.$refs.mask.style.top = maskLocation.y + 'px'

        //算出元素去除蒙版的大小后的宽或者高,来对比大图的宽和高来算出比例,然后来进行移动
        this.$refs.bigImg.style.left = -maskLocation.x*2 + 'px'
        this.$refs.bigImg.style.top = -maskLocation.y*2 + 'px'
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>