<template>
  <transition name="slide">
    <div class="play-list">
      <scroll class="list" ref="scroll">
        <div class="list-item" v-for="(item, index) in playlist" :key="index" @click="clickListItem(index)">
          <!--  -->
          <div class="play" v-show="curIndex == index">
            <img src="~assets/img/play.png" alt />
          </div>
          <div class="songname" :class="{active:curIndex == index}">{{item.songName}}</div>
        </div>
      </scroll>
      <div class="close" @click="clickClose">关闭</div>
    </div>
  </transition>
</template>

<script>
import scroll from "components/common/scroll/Scroll";

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "PlayList",
  computed: {
    ...mapGetters(["playlist", "curIndex", "playlistStatus"]),
  },
  components: {
    scroll,
  },
  methods: {
    //关闭歌曲列表
    clickClose() {
      this.setPlaylistStatus(false);
    },
    //点击列表歌单 切换歌曲
    clickListItem(index) {
      this.setCurIndex(index)
    },
    ...mapMutations({
      setPlaylistStatus: "SET_PLAYLIST_STATUS",
      setCurIndex: 'SET_CURRENT_INDEX'
    }),
  },
  watch: {
    playlistStatus(newVal) {
      //监控playlistStatus状态 如果为true 刷新scroll高度
      if (newVal) {
        this.$refs.scroll.refresh();
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.play-list {
  width: 100%;
  height: 50%;
  opacity: 1;

  // animation: run 0.5s linear;
  .list {
    height: 100%;
    overflow: hidden;
    border-radius: 10px;

    .list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.8);
      padding: 15px;
      color: $color-text-ll;
      font-size: $font-size-medium;

      .play {
        width: 25px;
        height: 25px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .songname {
        padding-left: 10px;
      }
    }
  }

  .close {
    width: 100%;
    height: 50px;
    background-color: $color-background;
    line-height: 50px;
    text-align: center;
    color: $color-text-l;
  }

  .active {
    color: $color-theme;
  }
}

.slide-enter-active {
  transition: all .8s ease;
}

.slide-leave-active {
  transition: all .8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter, .slide-leave-to {
  transform: translateY(500px);
  opacity: 0;
}
</style>