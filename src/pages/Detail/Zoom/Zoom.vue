<template>
    <div class="spec-preview" @mousemove="mousemove">
      <img :src="skuImageList[nowIndex]?.imgUrl" />
      <div class="event"></div>
      <div class="big">
        <img ref="bigImg" :src="skuImageList[nowIndex]?.imgUrl" />
      </div>
      <div class="mask" ref="mask"></div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "Zoom",
    props: ["skuImageList", "nowIndex"],
    methods: {
      //鼠标移入事件
      mousemove(e) {
        const maskLocation = {
          x: e.offsetX - this.$refs.mask.offsetWidth / 2,
          y: e.offsetY - this.$refs.mask.offsetHeight / 2,
        };
  
        //判断临界值
        if (maskLocation.x <= 0) {
          maskLocation.x = 0;
        } else if (
          maskLocation.x >=
          e.target.clientWidth - this.$refs.mask.offsetWidth
        ) {
          maskLocation.x = e.target.clientWidth - this.$refs.mask.offsetWidth;
        }
  
        if (maskLocation.y <= 0) {
          maskLocation.y = 0;
        } else if (
          maskLocation.y >=
          e.target.clientHeight - this.$refs.mask.offsetHeight
        ) {
          maskLocation.y = e.target.clientHeight - this.$refs.mask.offsetHeight;
        }
  
        this.$refs.mask.style.left = maskLocation.x + "px";
        this.$refs.mask.style.top = maskLocation.y + "px";
  
        this.$refs.bigImg.style.left = -maskLocation.x * 2 + "px";
        this.$refs.bigImg.style.top = -maskLocation.y * 2 + "px";
      },
    },
   
  };
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
  
    .event:hover ~ .mask,
    .event:hover ~ .big {
      display: block;
    }
  }
  </style>
  