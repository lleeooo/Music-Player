<template>
  <transition name="slide" class="content">
    <div class="dateil">
      <music-list :songs="node" :bgImg="discImg" :singerName="discName"></music-list>
    </div>
  </transition>
</template>

<script>
import { createSong } from "@/common/js/song.js";
import MusicList from "components/content/musicListRank/MusicList";
//映射getters
import { mapGetters } from "vuex";

// //网络请求
import { getHotRecommendItem } from "network/recommend";
import { getSingerSongMessage } from "network/singer";

export default {
  name: "Dateil",
  data() {
    return {
      songListIdStr: [], //歌单歌曲idstr
      node: [] //歌曲信息
    };
  },
  components: {
    MusicList,
  },
  created() {
    this._getHotRecommendItem(this.disc.id);

    this._getSingerSongMessage();
  },
  computed: {
    discName() {
      return this.disc.name;
    },
    discImg() {
      return this.disc.coverImgUrl;
    },
    ...mapGetters(["disc"]),
  },
  methods: {
    //获取歌单里歌曲的id信息
    _getHotRecommendItem(id) {
      if(!this.disc.id){
        this.$router.push('/rank')
        return
      }

      getHotRecommendItem(id).then((res) => {
        //获取歌单歌曲id  不能直接再data设置数组 不然vue会监控数组 导致无法枚举
        let songListId = [];
        res.data.playlist.trackIds.forEach((ele) => {
          songListId.push(ele.id);
        });

        //将id用逗号进行拼接
        this.songListIdStr = songListId.toString();
      });
    },

    //获取歌单里面的歌曲详细信息
    _getSingerSongMessage() {
      //一定要加定时器 不然songListIdStr里可能没有值
      setTimeout(() => {
        getSingerSongMessage(this.songListIdStr).then((res) => {
          this.node = this._normalizeSongs(res.data.songs)
        });
      }, 700);
    },

    //规范歌曲信息数据
    _normalizeSongs(item) {
      let ret = [];
      item.forEach((ele) => {
        ret.push(createSong(ele));
      });
      return ret;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

@keyframes run {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.dateil {
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: $color-background;
  animation: run 0.3s;
}

.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}
</style>