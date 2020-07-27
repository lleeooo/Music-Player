<template>
  <transition name="slide" class="content">
    <div class="dateil">
      <music-list :bgImg="singerImg" :songs="node" :singerName="singerName"></music-list>
    </div>
  </transition>
</template>

<script>
import { createSong } from "@/common/js/song.js";
import MusicList from "components/content/musicList/MusicList";
//映射getters
import { mapGetters } from "vuex";

//网络请求
import { getSingerDetail } from "network/singer";

export default {
  name: "Dateil",
  data() {
    return {
      node: [],
    };
  },
  components: {
    MusicList,
  },
  computed: {
    //拿到歌手名字
    singerName() {
      return this.singer.name;
    },
    //拿到歌手图片
    singerImg() {
      return this.singer.picUrl;
    },

    //因为getters的singer方法是取state里面的singer 所以我们直接拿到了点击的歌手信息
    ...mapGetters(["singer"]),
  },
  created() {
    this._getDateil();
  },
  methods: {
    //获取歌手以及歌曲信息(不是单个歌曲)
    _getDateil() {
      if (!this.singer.id) {
        this.$router.push("/singer");
        return;
      }
      //请求歌手的单曲
      getSingerDetail(this.singer.id).then((res) => {
        this.node = this._normalizeSongs(res.data.hotSongs);
      });
    },

    //规范化歌曲信息数据 将需要的数据进行整合
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