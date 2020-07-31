<template>
  <div class="hotlist" v-if="Object.keys(hotList).length !== 0">
    <div class="hotlist-item" v-for="(item , index) in hotList" :key="index" @click="clickRecommend(item , index)">
      <div class="img">
        <img v-lazy="item.coverImgUrl" @load="HotistImgload" />
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
  data() {
    return {
      lock: 0,
    };
  },
  methods: {
    HotistImgload() {
      this.lock += 1;
      if (this.lock == this.hotList.length) {
        this.$emit("HotistImgload");
      }
    },

    //点击歌单 返回点击事件
    clickRecommend(item , index) {
      this.$emit('clickRecommend', item , index)
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

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
      padding-left: 20px;
      font-size: $font-size-medium;


      .text-name {
        padding-bottom: 20px;
        color: #fff;
        font-size $font-size-small
      }

      .text-tittle {
        color: $color-text-d;
      }
    }
  }
}
</style>