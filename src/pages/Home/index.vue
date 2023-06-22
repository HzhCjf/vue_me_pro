<template>
  <div>
    <TypeNav/>
    <List/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
    <Brand/>
  </div>
</template>

<script>
import List from "@/pages/Home/components/List";
import Recommend from "@/pages/Home/components/Recommend";
import Rank from "@/pages/Home/components/Rank";
import Like from "@/pages/Home/components/Like";
import Floor from "@/pages/Home/components/Floor";
import Brand from "@/pages/Home/components/Brand";
import {reqFloorList} from '@api/home'
export default {
  name: "Home",
  components: {
    List,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  data(){
    return {
      floorList:[]
    }
  },
  mounted(){
    this.getFloorList()
  },
  methods:{
    async getFloorList(){
      const result = await reqFloorList()
      this.floorList = result
    }
  }
  
};
</script>

<style>
</style>