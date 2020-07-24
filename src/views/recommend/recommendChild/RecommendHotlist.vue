<template>
  <div class="hotlist" v-if="Object.keys(hotList).length !== 0">
    <div class="hotlist-item" v-for="(item , index) in hotList" :key="index">
      <div class="img">
        <img :src="item.coverImgUrl" />
      </div>
      <div class="text">
        <div class="text-name">{{item.name}}</div>
        <div class="text-tittle">{{item.copywriter}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendHotlist",
  props: {
    hotList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
.hotlist {
  padding-left: 20px;

  .hotlist-item {
    display: flex;
    align-items: center;
    height: 80px;

    .img {
      width: 60px;
      height: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .text {
      padding-left 10px
      font-size $font-size-medium

      .text-name{
        padding-bottom 20px
        color #fff
      }
      .text-tittle {
        color $color-text-d
      }
    }
  }
}
</style>