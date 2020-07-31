<template>
  <div class="player-bar" ref="playerBar" @click="clickPlayerBar">
    <div class="player-bar-content">
      <div class="player-bar-bottom" ref="playerBarBottom"></div>

      <div
        class="player-btn-wrapper"
        ref="playerBarBtn"
        @touchstart="btnTouchStart"
        @touchmove="btnTouchMove"
        @touchend="btnTouchEnd"
      >
        <div class="btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerBar",
  props: {
    person: {
      type: Number,
      default: 0,
    },
  },
  created() {
    //存储按钮的touch数据
    this.touch = {};
  },
  methods: {
    btnTouchStart(e) {
      //初始化按钮 只有touch了按钮 才判定为移动
      this.touch.init = true;
      //touch初始位置
      this.touch.starX = e.touches[0].pageX;
      //滚动条位置
      this.touch.left = this.$refs.playerBarBottom.clientWidth;
    },
    btnTouchMove(e) {
      if (!this.touch.init) return;
      //移动距离
      let deltaX = e.touches[0].pageX - this.touch.starX;
      //在按钮原本位置上+移动距离 移动不能为负值 且 不能超过总滚动条长度
      let offsetWidth = Math.min(
        this.$refs.playerBar.clientWidth - 16,
        Math.max(0, deltaX + this.touch.left)
      );

      //同时控制滚动条和按钮进行移动
      this._move(offsetWidth);
    },
    btnTouchEnd() {
      this.touch.init = false;
      
      //当移动结束 把新比例返回出去
      this._getNewPerson()
    },

    //滚动条和按钮进行移动
    _move(distance) {
      //控制导航条移动
      this.$refs.playerBarBottom.style.width = `${distance}px`;
      //控制按钮移动
      this.$refs.playerBarBtn.style.transform = `translateX(${distance}px)`;
    },

    //按钮移动后 当前位置和 总时长的新比例 
    _getNewPerson() {
      //总长
      const barWidth = this.$refs.playerBar.clientWidth - 16
      //当前移动长 因为移动时已经把滚动条移动了 所以直接取滚动条位置
      let newPerson = this.$refs.playerBarBottom.clientWidth / barWidth
      //把新比例返回出去
      return this.$emit('personChange' , newPerson)
    },

    //点击滚动条进行歌曲跳转
    clickPlayerBar(e) {
      //获取点击位置 并进行滚动条和按钮的移动
      //点击按钮时 ， 取值会取不到而发生错误
      // this._move(e.offsetX)

      //这个元素距离可视窗口左边的距离g
      let rect = this.$refs.playerBar.getBoundingClientRect()
      //点击位置减调距离 得到新的点击位置 这个点击按钮不会发生bug
      let offsetX = e.pageX - rect.left
      this._move(offsetX)
      this._getNewPerson()
    },
  },
  watch: {
    person(newVal) {
      //只有在比例为正 且 没有在拖动按钮时 按钮和滚动条才会因为person值的更新而移动
      if (newVal >= 0 && !this.touch.init) {
        const barWidth = this.$refs.playerBar.clientWidth - 16;
        const offsetWidth = barWidth * this.person;
        this._move(offsetWidth);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl';

.player-bar {
  height: 30px;
  width: 100%;

  .player-bar-content {
    position: relative;
    top: 13px;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 5px;

    .player-bar-bottom {
      position: absolute;
      height: 100%;
      background-color: #d93f30;
      border-radius: 5px;
    }

    .player-btn-wrapper {
      // display none
      position: relative;
      top: -13px;
      left: -8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;

      .btn {
        position: absolute;
        top: 7px;
        left: 7px;
        width: 16px;
        height: 16px;
        background-color: #d93f30;
        border-radius: 50%;
        border: 3px solid #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>