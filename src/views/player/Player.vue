<template>
  <div class="player" v-show="playlist.length != 0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img :src="currentSong.albumImage" width="100%" height="100%" />
        </div>

        <div class="top">
          <div class="black" @click="black">
            <img src="~assets/img/back.png" alt />
          </div>
          <div class="text">
            <h1 class="title" v-html="currentSong.songName"></h1>
            <h2 class="subtitle" v-html="currentSong.singer"></h2>
          </div>
          <div class="occupying"></div>
        </div>

        <div class="middle" @click="clickCd">
          <div class="middle-l" :class="{active: isLyricShow == false}">
            <div class="cd-wrapper" :class="{isRotate : playing === false}">
              <div class="cd">
                <img :src="currentSong.albumImage" />
              </div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyricList" :class="{active: isLyricShow == true}">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  class="text"
                  v-for="(item,index) in currentLyric.lines"
                  :key="index"
                  ref="lyricLine"
                  :class="{heightLight:currentLineNum === index}"
                >{{item.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>

        <div class="bottom">
          <div class="progress-wrapper">
            <div class="position-wrapper">
              <span class="time time-l">{{formatTime(currentTime)}}</span>
              <div class="progress-bar-wrapper">
                <player-bar :person="person" @personChange="personChange" />
              </div>
              <span class="time time-r">{{formatTime(duration)}}</span>
            </div>
          </div>

          <div class="operators">
            <div class="i-left icon" @click="changeMode">
              <img src="~assets/img/sequence.png" alt class="i-sequence" v-show="mode == 0" />
              <img src="~assets/img/loop.png" alt class="i-loop" v-show="mode == 1" />
              <img src="~assets/img/random.png" alt class="i-random" v-show="mode == 2" />
            </div>

            <div class="i-left icon" @click="clickPrev">
              <img src="~assets/img/pre.png" alt class="i-prev" />
            </div>

            <div class="icon i-center" @click="clickPlaying">
              <img src="~assets/img/play.png" v-show="playing === false" class="i-pause" />
              <img src="~assets/img/play-active.png" v-show="playing" class="i-playing" />
            </div>

            <div class="i-right icon" @click="clickNext">
              <img src="~assets/img/next.png" alt class="i-next" />
            </div>
            <div class="i-right icon">
              <img src="~assets/img/love.png" alt class="i-favorite" />
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="mini-left">
          <div class="cd-bg" :class="{isRotate : playing === false}">
            <img :src="currentSong.albumImage" />
          </div>
          <div class="text">
            <h2 class="song-name" v-html="currentSong.songName"></h2>
            <p class="singer-name" v-html="currentSong.singer"></p>
          </div>
        </div>

        <div class="mini-right">
          <div class="control" @click.stop="clickPlaying">
            <img src="~assets/img/play.png" v-show="playing === false" />
            <img src="~assets/img/play-active.png" v-show="playing" />
          </div>
          <div class="control">
            <img src="~assets/img/play-list.png" class="play-list" />
          </div>
        </div>
      </div>
    </transition>

    <audio
      ref="audio"
      autoplay
      @canplay="ready"
      @error="error"
      @timeupdate="updataTime"
      @ended="ended"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import PlayerBar from "./playerChild/PlayerBar";
import scroll from "components/common/scroll/Scroll";
import { playMode } from "@/common/js/config";
import { shuffle } from "@/common/js/util";
import Lyric from "lyric-parser";
//网络请求
import { getMusicUrl, getLyric } from "network/singer";

export default {
  name: "Player",
  data() {
    return {
      url: "", //歌曲url
      songReady: false,
      currentTime: 0, //歌曲播放时间戳
      duration: 0, //歌曲总时长
      currentLyric: null, //歌词对象
      currentLineNum: 0, //当前歌词所在的行
      isLyricShow: false,
    };
  },
  components: {
    PlayerBar,
    scroll,
  },

  computed: {
    //计算当前播放和总时长的比例
    person() {
      return this.currentTime / this.duration;
    },

    //获取state里面的东西
    ...mapGetters([
      "playlist",
      "fullScreen",
      "currentSong",
      "playing",
      "curIndex",
      "mode",
      "sequenceList",
    ]),
  },

  methods: {
    //点击播放页面返回
    black() {
      this.setFullScreen(false);
    },

    //点击小播放器返回播放页面
    open() {
      this.setFullScreen(true);
    },

    //获取歌曲的播放地址
    _getMusicUrl(id) {
      return getMusicUrl(id).then((res) => {
        this.url = res.data.data[0].url;
      });
    },

    //点击播放暂停 进行歌曲的控制 (通过vuex状态去判断歌曲的停不停)
    clickPlaying() {
      //通过mutation去改变state里面playing的状态
      this.setPlaying(!this.playing);

      //当我们点击暂停时 歌词也进行暂停
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },

    //播放上一首歌
    clickPrev() {
      //如果歌曲没有准备好 不能点击
      if (!this.songReady) return;

      if (this.playlist.length === 1) {
        this.loop();
      } else {
        //如果是第一首歌需要上一首 就让其到最后一首
        let index = this.curIndex - 1;
        if (index == -1) {
          //列表长度要减去1 因为length是从1开始 而设置则是从0开始
          index = this.playlist.length - 1;
        }
        this.setCurIndex(index);
        //每一次上一首都把歌曲的播放状态改为true（也是位置重置播放图标）
        this.setPlaying(true);
      }

      this.songReady = false;
    },

    //播放下一首
    clickNext() {
      //如果歌曲没有准备好 不能点击
      if (!this.songReady) return;

      //当列表只有一首歌 点击的时候 让它循环
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.curIndex + 1;
        //这里之所以是= 是因为歌曲列表length的长度是50 但是设置的index的时候是从0开始 所以当index是49时 就是列表的第50首歌 ，所以当等于50时，其实index已经超出歌曲列表长度，我们要重置为0
        if (index == this.playlist.length) {
          index = 0;
        }
        this.setCurIndex(index);
        //每一次下一首都把歌曲的播放状态改为true
        this.setPlaying(true);
      }
      this.songReady = false;
    },

    /**
     * 播放器事件
     */
    //audio的canplay事件 一旦进入到这个状态表示歌曲已经准备好
    ready() {
      this.songReady = true;
    },
    //audio的err事件 歌曲不能播放触发这个事件
    error() {
      //防止歌曲错误加载不了 导致不能点击上下首歌
      this.songReady = true;
    },
    //当播放器播放时触发 获取歌曲当前时间
    updataTime(e) {
      this.currentTime = e.target.currentTime;
      this.duration = e.target.duration;
    },

    //格式化时间 将获得的播放时间转成我们想要的类型
    formatTime(time) {
      let m = (time / 60) | 0; //向下取整
      let s = this._pad(time % 60 | 0, 2);
      return `${m}:${s}`;
    },

    //在数字前补0,补到几位
    _pad(num, len) {
      let length = num.toString().length;
      while (length < len) {
        num = "0" + num;
        length++;
      }
      return num;
    },

    //获得拖动按钮之后 新的歌曲比例 设置新时间
    personChange(newPerson) {
      const newTime = newPerson * this.duration;
      this.$refs.audio.currentTime = newTime;
      this.$refs.audio.play(); //暂停拖动后自动播放
      this.setPlaying(true); //播放图标也更上一起变化

      //当滚动条拖动 歌词也进行相应的改变
      if (this.currentLyric) {
        //currentLyric这个插件以毫秒为单位 直接偏移到对应位置
        this.currentLyric.seek(newTime * 1000);
      }
    },

    //切换播放模式
    changeMode() {
      //在0-2之间取值 也相互映射
      let mode = (this.mode + 1) % 3;
      this.setMode(mode);

      let list = null;
      //如果是随机则进行随机排序 不然就顺序列表
      if (mode === playMode.random) {
        //shuffle里面做了一个剪切 防止直接更改sequenceList导致所有数据都发生改变
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      //切换成随机歌曲列表 但是当前播放歌曲不直接切掉
      this.keepCurrentIndex(list);
      this.setPlaylist(list);
    },

    //保持当前播放歌曲在列表中的一个选中状态
    keepCurrentIndex(list) {
      //找到正在播放的歌曲位置（index）
      let index = list.findIndex((item) => {
        return item.songId === this.currentSong.songId;
      });
      //把他在新歌单中选中
      this.setCurIndex(index);
    },

    //播放结束之后触发 循环
    ended() {
      console.log(1);
      //判断是不是在单曲循环
      if (this.mode == playMode.loop) {
        this.loop();
      } else {
        this.clickNext();
      }
    },

    //循环
    loop() {
      //循环 将其播放的时间重置为0
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();

      //如果是循环 将歌词重置到最开始位置
      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
    },

    /**
     * 歌词
     */
    //歌词获取
    _getLyric(id) {
      getLyric(id)
        .then((res) => {
          //生成歌词对象
          /**
           * 插件使用
           * 第一个参数 需要解析的歌词
           * 第二 每一句歌词的回调函数
           */
          this.currentLyric = new Lyric(res.data.lrc.lyric, this.lyricCallBack);

          //控制歌词播放
          if (this.playing) {
            this.currentLyric.play();
          }
        })
        .catch((err) => {
          //如果没有歌词
          this.currentLyric = null;
          this.currentLineNum = 0;
        });
    },

    //歌词回调函数 1.歌词定位index 2.歌词text
    lyricCallBack({ lineNum, txt }) {
      this.currentLineNum = lineNum;

      //让个歌词居中 逻辑是过五行 然后定位到之后的第一行 然后一直让导航指向这个一行
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.elementTo(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    },

    //点击背景图切换歌词
    clickCd() {
      this.isLyricShow = !this.isLyricShow;
    },

    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlaying: "SET_PLAYING",
      setCurIndex: "SET_CURRENT_INDEX",
      setMode: "SET_PLAY_MODE",
      setPlaylist: "SET_PLAYLIST",
    }),
  },
  watch: {
    //监控currentSong，每次点击单曲currentSong会定位到对应位置
    currentSong(newVla, oldVal) {
      if (!newVla.songId) return;
      if (newVla.songId === oldVal.songId) return;

      //在切换歌时 把上一首歌的歌词定时器清掉 让下一首歌的歌词正常
      if (this.currentLyric) {
        this.currentLyric.stop();
      }

      //点击对应单曲时 获取它的播放地址
      this._getMusicUrl(newVla.songId);
    },

    //监控url变化
    url(newUrl) {
      //播放地址发送改变获取歌曲歌词
      this._getLyric(this.currentSong.songId);
      //一旦播放地址发送改变 就把新地址给audio
      this.$refs.audio.src = newUrl;
    },

    //监控playing的状态
    playing(newPlaying) {
      const audio = this.$refs.audio;
      //如果state里面Playing是true就播放 否则就暂停
      newPlaying ? audio.play() : audio.pause();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';
@import '~assets/stylus/mixin';

.player {
  .normal-player {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: $color-background;

    .background {
      position: absolute;
      left: -50%;
      top: -50%;
      width: 300%;
      height: 300%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(15px);
    }

    .top {
      position: relative;
      display: flex;
      align-items: center;
      text-align: center;

      .black {
        width: 42px;
        height: 42px;
        padding: 10px 0 0 10px;
        z-index: 999;

        img {
          width: 80%;
          height: 80%;
          transform: rotate(-90deg);
        }
      }

      .text {
        margin: 0 auto;
        padding-top: 20px;
        width: 250px;

        .title {
          font-size: $font-size-large;
          margin-bottom: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .subtitle {
          font-size: $font-size-medium;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .occupying {
        width: 52px;
        height: 52px;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 150px;

      .middle-l {
        position: relative;
        width: 100%;
        padding-top: 80%;
        height: 0;
        opacity: 0;
        transition: opacity 1s;

        .cd-wrapper {
          position: absolute;
          width: 80%;
          height: 100%;
          top: 0;
          left: 10%;
          animation: rotate 20s linear infinite;

          .cd {
            border: 10px solid rgba(255, 255, 255, 0.1);
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-sizing: border-box;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }

        .isRotate {
          animation-play-state: paused;
        }
      }

      .middle-r {
        position: fixed;
        top: 10%;
        bottom: 400px;
        display: inline-block;
        width: 100%;
        height: 70%;
        overflow: hidden;
        opacity: 0;
        transition: opacity 1s;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }

          .heightLight {
            color: $color-text;
            font-weight: bold;
          }
        }
      }

      .active {
        opacity: 1;
        animation: switch 1s;
      }
    }
  }

  .bottom {
    position: fixed;
    bottom: 50px;
    width: 100%;

    .progress-wrapper {
      display: flex;
      justify-content: center;
      position: relative;
      bottom: 20px;

      .position-wrapper {
        display: flex;
        align-items: center;
        justify-items: center;
        width: 300px;

        .progress-bar-wrapper {
          width: 100%;
          margin: 0 7px;
        }
      }
    }

    .operators {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon {
        width: 50px;

        // height 50px
        .i-random {
          width: 75%;
          height: 75%;
          padding-left: 10px;
        }

        .i-sequence {
          width: 90%;
          height: 90%;
          padding-left: 10px;
        }

        .i-loop {
          padding-left: 10px;
        }

        img {
          width: 100%;
          height: 100%;
        }

        .i-favorite {
          width: 80%;
          height: 80%;
        }
      }
    }
  }
}

.mini-player {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 60px;
  background: $color-highlight-background;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 0;
  box-sizing: border-box;

  .mini-left {
    display: flex;
    align-items: center;
    padding-left: 20px;

    .cd-bg {
      width: 40px;
      height: 40px;
      animation: rotate 20s linear infinite;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .isRotate {
      animation-play-state: paused;
    }

    .text {
      font-size: $font-size-medium;
      padding-left: 10px;

      .singer-name {
        padding-top: 5px;
        font-size: $font-size-small;
        color: $color-text-l;
      }
    }
  }

  .mini-right {
    display: flex;
    align-items: center;
    padding-right: 20px;

    .control {
      width: 30px;
      height: 30px;
      padding-left: 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

// 全屏播放器动画
.normal-enter-active, .normal-leave-active {
  transition: all 0.4s, ;

  .top, .bottom {
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }
}

.normal-enter, .normal-leave-to {
  opacity: 0;

  .top {
    transform: translate3d(0, -100px, 0);
  }

  .bottom {
    transform: translate3d(0, 100px, 0);
  }
}

// 小播放器动画
.mini-enter-active, .mini-leave-active {
  transition: all 0.4s;
}

.mini-enter, .mini-leave-to {
  opacity: 0;
}

// 歌词动画
@keyframes switch {
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

// cd背景图的旋转
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>