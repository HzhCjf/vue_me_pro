<template>
    <div class="pagination">
      <!-- 当前页为1的时候禁用上一页,用.sync进行传值可以直接使用自定义事件update:xxx,返回的值 -->
      <button :disabled="pageNo === 1" @click="$emit('update:pageNo',pageNo-1)">上一页</button>
      <!-- 当连续页的开头页小于1的时候就隐藏,点击直接跳转到第一页 -->
      <button v-if="startEnd.start>1" @click="$emit('update:pageNo',1)">1</button>
      <!-- 当连续页的开头页大于2的时候就隐藏,因为如果连续页开头为1,那么这就算显示出来也表示不合理,因为省略号你最起码要省略一个吧 -->
      <button v-if="startEnd.start>2">···</button>
      <!-- 遍历连续页的数组,点击就是当前页码 -->
      <button v-for="page in pages" :key="page" @click="$emit('update:pageNo',page)" :class="{active:pageNo === page}">{{ page }}</button>
      <!-- 当连续页的页尾小于总页数-1进行隐藏 -->
      <button v-if="startEnd.end < totalPages-1">···</button>
      <button v-if="startEnd.end < totalPages" @click="$emit('update:pageNo',totalPages)">{{ totalPages }}</button>
      <button :disabled="pageNo === totalPages" @click="$emit('update:pageNo',pageNo+1)">下一页</button>
  
      <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "Pagination",
    /*
        一个页码组件最起码要有三个数据:
            1.当前页:pageNo,可以使用.sync
            2.数据总条数:total
            3.总页数:totalPages
            4.连续页:continuePage
    */
    props:['pageNo','total','totalPages','continuePage'],
    computed:{
      // 页码逻辑
        startEnd(){
            const {pageNo,totalPages,continuePage} = this;
            let start = 0,end = 0;
            // 当总页数小于等于连续页的时候,开始页直接为1,最后一页为总页数
            if(totalPages <= continuePage){
                start = 1;
                end = totalPages
            }else{
                // 当总页数大于连续页的时候,开始页为当前页减去连续页-1/2,也就是2,开始页为当前页加上连续页-1/2,也就是2
                start = pageNo - (continuePage-1)/2
                end = pageNo + (continuePage-1)/2

                // 当开始页小于1的时候,直接把开始页设置为1,最后页设置为连续页
                if(start < 1){
                    start = 1
                    end = continuePage
                }
                // 当最后页大于总页数的时候,开始页为总页数-连续页+1,最后页为总页数.
                //例如:7是当前页,8是总页数,那么9就是最后页,但是最后页大于了总页数,所以开始被设置为8-5+1,就是为4,最后为4,5,6,7,8
                if(end > totalPages){
                    start = totalPages - continuePage + 1
                    end = totalPages
                }
            }
            return {start,end}
        },
        // 得到的连续页数组
        pages(){
            let arr =[]
            for(let i = this.startEnd.start;i <= this.startEnd.end;i++){
                arr.push(i)
            }
            return arr
        }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;
  
      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }
  
      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  </style>
  