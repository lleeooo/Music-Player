<template>
  <div class="search-box">
    <div class="wrapper">
      <div class="search-icon">
        <img src="~assets/img/search.png" alt />
      </div>
      <input type="text" class="box" :placeholder="placeholder" v-model="query"/>

      <div class="dismiss-icon" v-show="query" @click="clickClean">
        <img src="~assets/img/clean.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/common/js/util";

export default {
  name: "SearchBox",
  data() {
    return {
      query: '' //用户输入的值
    }
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    //点击清除搜索框内容
    clickClean() {
      this.query = ''
    },

    //设置搜索值
    setQuery(newQuery) {
      this.query = newQuery
    }
  },
  created() {
    //利用watch监控用户输入的值 并传出
    this.$watch('query' , debounce((newQuery) => {
      this.$emit('query' , newQuery)
    } , 200))
  }
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.search-box {
  display flex 
  justify-content center
  font-size $font-size-medium
  
  .wrapper {
    display: flex;
    height: 40px;
    width: 90%;
    justify-content: center;
    align-items: center;
    background: $color-highlight-background;
    border-radius: 5px;
    box-sizing border-box

    .search-icon {
      width: 25px;
      height: 25px;
      margin-left 10px 

      img {
        width: 100%;
        height: 100%;
      }
    }

    .box {
      width: calc(100% - 50px);
      height: 25px;
      background: $color-highlight-background;
      margin 0 5px
      color #fff
    }

    .box:focus {
      outline 0
      color #fff
    }

    .dismiss-icon {
      width: 25px;
      height: 25px;
      margin-right 10px 


      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>