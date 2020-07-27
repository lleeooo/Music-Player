<template>
  <div class="recommend">
    <scroll class="content" ref="scroll">
      <recommend-swiper />
      <div class="text">热门歌单推荐</div>
      <recommend-hotlist :hotList="hostList" @HotistImgload="HotistImgload" class="hot-list" />
      <loading class="loading" v-show="!hostList.length"></loading>
    </scroll>
  </div>
</template>

<script>
//better-scroll
import scroll from "components/common/scroll/Scroll";
import loading from "components/common/loading/Loading";

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
      posY: 0
    };
  },
  components: {
    scroll,
    loading,

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
    HotistImgload() {
      this.$refs.scroll.refresh();
    },
  },
  deactivated(){
    this.posY = this.$refs.scroll.scroll.y
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.posY, 100),
    this.$refs.scroll.refresh()
  }
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.recommend {
  height: 89vh;

  .content {
    height: calc(100% - 10px);
    overflow: hidden;
    position relative

    .text {
      text-align: center;
      color: $color-theme;
      font-size: $font-size-medium;
      height: 65px;
      line-height: 65px;
    }
    .loading {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>