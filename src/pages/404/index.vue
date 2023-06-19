<template>
  <div>
    <!-- <h1>
      我勒个去,你访问的是咩啊,网页咋找不到了!!
      <router-link to="/home">点我坐飞机回家</router-link>
    </h1> -->
    <!-- <div class="back"> -->
        <router-link to="/home" class="back"></router-link>
    <!-- </div> -->
    <img src="./images/404.png" id="img">
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.back{
    width: 245px;
    height: 32px;
    position: absolute;
    margin-top: 339px;
    margin-left: 829px;
}
#img{
    width: 100%;
    height: 925.9px;
}
</style>