<template>
  <div class="suggest">
    <div class="singer" v-show="querySinger.length !== 0">
      <div
        class="singer-item"
        v-for="(item , index) in querySinger"
        :key="index"
        @click="clickQuerySinger(item)"
      >
        <div class="singer-img">
          <img src="~assets/img/people.png" alt />
        </div>
        <div class="singer-name">{{item.name}}</div>
      </div>
    </div>
    <div class="songs" v-show="querySongs.length !== 0">
      <div
        class="songs-item"
        v-for="(item,index) in querySongs"
        :key="index"
        @click="clickSong(item)"
      >
        <div class="song-img">
          <img src="~assets/img/music.png" alt />
        </div>
        <div class="song-name">{{item.name}}-{{getName(item)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerSongMessage } from "network/singer";
import { mapMutations, mapActions } from "vuex";
import { createSong } from "@/common/js/song.js";

export default {
  name: "Suggest",
  props: {
    querySinger: {
      type: Array,
      default() {
        return [];
      },
    },
    querySongs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    //拼接多个歌手名字
    getName(item) {
      let name = [];
      name = item.artists.map((ele) => {
        return ele.name;
      });
      return name.join("/");
    },

    //点击搜索到的歌手 跳转到歌手详情
    //注意： 一定是在自己的search路由基础上 绑定歌手路由 进行跳转 ，不然在black的时候，跳转singger路由没有清除 导致新歌手无法载入
    clickQuerySinger(item) {
      this.$router.push({
        path: `/search/${item.id}`,
      });
      //把点击的歌手信息传到mutations里面的setSinger方法
      this.setSinger(item);
    },

    //点击歌曲触发事件
    clickSong(item) {
      let song = [];
      getSingerSongMessage(item.id).then((res) => {
        song = this._normalizeSongs(res.data.songs);
        console.log(song);
      });
      setTimeout(() => {
        this.selectPlay({
          list: song,
          index: 0,
        });
      }, 500);
    },
    //规范化歌曲信息数据 将需要的数据进行整合
    _normalizeSongs(item) {
      let ret = [];
      item.forEach((ele) => {
        ret.push(createSong(ele));
      });
      return ret;
    },
    ...mapActions(["selectPlay"]),
    ...mapMutations({
      setSinger: "setSinger",
    }),
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.suggest {
  background: #222;
  padding: 0 20px;
  color: $color-text-l;
  font-size: $font-size-small;

  .singer {
    .singer-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      // border 1px solid #333
      border-radius: 5px;
      justify-content: center;

      .singer-img {
        width: 25px;
        height: 25px;
        padding-right: 10px;
        opacity: 0.4;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .songs {
    .songs-item {
      display: flex;
      align-items: center;
      padding: 15px 0 10px 10px;

      .song-img {
        width: 25px;
        height: 25px;
        opacity: 0.4;
        padding-right: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>