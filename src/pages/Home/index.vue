<template>
  <div>
    <TypeNav/>
    <List/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor/>
    <Floor/>
    <Brand/>
  </div>
</template>

<script>
import TypeNav from "@/pages/Home/components/TypeNav";
import List from "@/pages/Home/components/List";
import Recommend from "@/pages/Home/components/Recommend";
import Rank from "@/pages/Home/components/Rank";
import Like from "@/pages/Home/components/Like";
import Floor from "@/pages/Home/components/Floor";
import Brand from "@/pages/Home/components/Brand";
export default {
  name: "Home",
  components: {
    TypeNav,
    List,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style>
</style>