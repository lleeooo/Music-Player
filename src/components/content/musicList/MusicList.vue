<template>
  <div class="music-list">
    <div class="black" @click="black">
      <img src="~assets/img/back.png" alt />
    </div>
    <div class="title" v-html="singerName"></div>
    <div class="bg-img" :style="bgStyle" ref="bgimg">
      <div class="play-wrapper" ref="playWrapper">
        <div class="play" v-show="songs.length != 0">
          <div class="img">
            <img src="~assets/img/play.png" alt />
          </div>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>

    <div class="bg-layer" ref="bglayer"></div>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="scrollPosition">
      <song-list class="song-list" :songs="songs" ref="songslist"></song-list>
      <div class="loding">
        <loading v-show="!songs.length" />
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from "./SongList";
import scroll from "components/common/scroll/Scroll";
import loading from "components/common/loading/Loading";

const NAV_HEIGHT = 52;
export default {
  name: "MusicList",
  props: {
    bgImg: {
      type: String,
      default: "",
    },
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    singerName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      bgimgHeight: 0, //背景图片高度
      posY: 0, //scroll滚动位置
      minTranslaterY: 0, //背景图片高度的负值减去导航栏的高度的值
    };
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImg})`;
    },
  },
  mounted() {
    this.bgimgHeight = this.$refs.bgimg.clientHeight;
    this.minTranslaterY = -this.bgimgHeight + NAV_HEIGHT;

    this.$refs.songslist.$el.style.top = `${this.bgimgHeight}px`;
    this.$refs.scroll.$el.style.top = `${this.bgimgHeight}px`;

  },
  components: {
    SongList,
    scroll,
    loading,
  },
  methods: {
    //点击返回上层路由
    black() {
      this.$router.back();
    },

    //监控scroll组件的滑动
    scrollPosition(pos) {
      this.posY = pos.y;
    },
  },
  watch: {
    //监控posy 然后给songlist的蒙层layer 进行赋值让其移动
    posY(newY) {
      
      let translateY = Math.max(this.minTranslaterY, newY);
      this.$refs.bglayer.style["transform"] = `translateY(${translateY}px)`;

      //进行判断 如果到了位置 改变背景图片大小和z轴 让其盖住划过去的歌，如果没到位置，图片就还是原来的样式
      let zIndex = 0;
      if (this.minTranslaterY > newY) {
        zIndex = 10;
        this.$refs.bgimg.style.paddingTop = 0;
        this.$refs.bgimg.style.height = `${NAV_HEIGHT}px`;

        //当滚动到顶部 随机播放按钮消失
        this.$refs.playWrapper.style.display = "none";
      } else {
        this.$refs.bgimg.style.paddingTop = "70%";
        this.$refs.bgimg.style.height = 0;

        //如果没滚动到顶部 随机播放按钮还是出现
        this.$refs.playWrapper.style.display = "block";
      }
      this.$refs.bgimg.style.zIndex = zIndex;

      //当歌曲列表往下拉 图片跟着变大
      let scale = 1; //图片默认比例为1
      const percent = Math.abs(newY / this.bgimgHeight); //算出下拉的距离和图片的比例
      //大于0 表示下拉 下拉的同时 把比例加上
      if (newY > 0) {
        scale += percent;
      }
      //进行样式赋值
      this.$refs.bgimg.style.transform = `scale(${scale})`;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.music-list {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;

  .black {
    position: absolute;
    width: 42px;
    height: 42px;
    z-index: 999;
    padding: 10px 0 0 10px;

    img {
      width: 80%;
      height: 80%;
    }
  }

  .title {
    height: 52px;
    line-height: 52px;
    width: 100%;
    font-size: $font-size-large;
    color: $color-text;
    font-weight: 550;
    text-align: center;
    position: absolute;
    z-index: 100;
  }

  .bg-img {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    background-size: cover;

    .play-wrapper {
      position: absolute;
      left: 50%;
      bottom: 10%;
      transform: translateX(-50%);
      border: 1px solid $color-theme;
      padding: 3px 5px;
      border-radius: 40px;
      font-size: $font-size-small;
      color: $color-theme;

      .play {
        display: flex;
        align-items: center;

        img {
          width: 25px;
          height: 25px;
          padding-right: 5px;

          .img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .filter {
      width: 100%;
      height: 100%;
    }
  }

  .bg-layer {
    position: relative;
    background: $color-background;
    height: 100%;
  }

  .content {
    height: calc(100% - 265px);
    position: fixed;
    // overflow hidden
    .loding {
      position fixed   
      top 50%
      left 50%
      transform translate(-50% , -50%)
    }
  }
}
</style>