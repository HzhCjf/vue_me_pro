<template>
  <div>
    <TypeNav />
    keyword--{{ keyword }} <br />
    category1Id--{{ category1Id }} <br />
    category2Id--{{ category2Id }} <br />
    category3Id--{{ category3Id }} <br />
    categoryName--{{ categoryName }} <br />
  </div>
</template>

<script>
export default {
  name: "Search",
  // 接收路由参数
  props: [
    "keyword",
    "category1Id",
    "category2Id",
    "category3Id",
    "categoryName",
  ],
};
</script>

<style>
</style>