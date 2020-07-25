<template>
  <div class="recommend">

    <scroll class="content" ref="scroll">
      <recommend-swiper />
      <div class="text">热门歌单推荐</div>
      <recommend-hotlist :hotList="hostList" @HotistImgload="HotistImgload"/>
    </scroll>

  </div>
</template>

<script>
//better-scroll
import scroll from "components/common/scroll/Scroll";

//子组件
import RecommendSwiper from "./recommendChild/RecommendSwipe";
import RecommendHotlist from "./recommendChild/RecommendHotlist";

//网络请求
import { getHotList, getHotListItem } from "network/recommend";

export default {
  name: "Recommend",
  data() {
    return {
      hostList: [],
    };
  },
  components: {
    scroll,

    RecommendSwiper,
    RecommendHotlist,
  },
  created() {
    this._getHotList();
  },
  methods: {
    //网络请求相关方法
    _getHotList() {
      getHotList().then((res) => {
        this.hostList = res.data.playlists;
      });
    },

    //获取数据相关方法
    //每一次获取到照片 就刷新一次scroll的高度
    HotistImgload(){
      this.$refs.scroll.refresh()
      console.log(1)
    }

  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.recommend {
  height: 100vh;

  .content {
    height: calc(100% - 88px);
    overflow: hidden;
  }

  .text {
    text-align: center;
    color: $color-theme;
    font-size: $font-size-medium;
    height: 65px;
    line-height: 65px;
  }
}
</style>