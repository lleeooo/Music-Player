<template>
  <div class="singer">
    <div class="title">热搜歌手</div>
    <scroll class="content" ref="scroll">
      <singer-infolist :singerList="singerList" @singerImgLoad="singerImgLoad" @singerItemClick="singerItemClick"/>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
//组件
import scroll from "components/common/scroll/Scroll";
import SingerInfolist from "./singerChild/SingerInfolist";

//网络请求
import { getHotSingerList } from "network/singer";

//映射mutations的方法 方便调用里面的方法 而不用commit
import {mapMutations} from 'vuex'

export default {
  name: "Singer",
  data() {
    return {
      singerList: [],
      posY: 0
    };
  },
  created() {
    this._getSinger();
  },
  methods: {
    //获取歌手数据
    _getSinger() {
      getHotSingerList().then((res) => {
        // console.log(res);
        this.singerList = res.data.artists;
      });
    },

    //处理歌手图片load
    singerImgLoad() {
      let timer = null;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 200);
    },

    //点击歌手时跳转路由
    singerItemClick(item){
      this.$router.push({
        path: `/singer/${item.id}`
      })

      //把点击的歌手信息传到mutations里面的setSinger方法
      this.setSinger(item)

    },

    ...mapMutations({
      setSinger: 'setSinger'
    })

  },
  components: {
    scroll,
    SingerInfolist,
  },
  deactivated() {
    this.posY = this.$refs.scroll.scroll.y;
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.posY, 100), this.$refs.scroll.refresh();
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.singer {
  height: 89vh;
  position: relative;
  


  .content {
    height: calc(100% - 40px);
    overflow: hidden;
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
  }

  .title {
    color: $color-theme;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: $font-size-medium;
    background-color: $color-highlight-background;
  }
}
</style>