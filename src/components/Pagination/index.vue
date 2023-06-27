<template>
    <div class="pagination">
      <button
        :disabled="pageNo === 1"
        @click="$emit('update:pageNo', pageNo - 1)"
      >
        上一页
      </button>
      <button v-if="startEnd.start > 1" @click="$emit('update:pageNo', 1)">
        1
      </button>
  
      <button v-if="startEnd.start > 2">···</button>
  
      <button
        v-for="page in pages"
        :key="page"
        @click="$emit('update:pageNo', page)"
        :class="{ active: pageNo === page }"
      >
        {{ page }}
      </button>
  
      <button v-if="startEnd.end < totalPages - 1">···</button>
      <button
        v-if="startEnd.end < totalPages"
        @click="$emit('update:pageNo', totalPages)"
      >
        {{ totalPages }}
      </button>
      <button
        :disabled="pageNo === totalPages"
        @click="$emit('update:pageNo', pageNo + 1)"
      >
        下一页
      </button>
  
      <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
  </template>
  
  <script>
  /* 
    Pagination组件需要接受的props
      1. pageNo:当前页 支持.sync
      2. total:数据总条数
      3. totalPages:总页数
      4. continuePage:连续页长度
  
  */
  export default {
    name: "Pagination",
    props: ["pageNo", "total", "totalPages", "continuePage"],
    computed: {
      startEnd() {
        const { pageNo, totalPages, continuePage } = this;
        let start = 0,
          end = 0;
        //如果总页数小于连续页长度,则没有计算的必要,直接把start赋值为1 end赋值为总页数即可
        if (totalPages <= continuePage) {
          start = 1;
          end = totalPages;
        } else {
          //如果总页数大于连续页长度,则计算start和end
          start = pageNo - (continuePage - 1) / 2;
          end = pageNo + (continuePage - 1) / 2;
  
          //判断临界值
          if (start < 1) {
            start = 1;
            end = continuePage;
          }
  
          if (end > totalPages) {
            end = totalPages;
            start = totalPages - continuePage + 1;
          }
        }
        return { start, end };
      },
      pages() {
        const arr = [];
        for (let i = this.startEnd.start; i <= this.startEnd.end; i++) {
          arr.push(i);
        }
        return arr;
      },
    },
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
  