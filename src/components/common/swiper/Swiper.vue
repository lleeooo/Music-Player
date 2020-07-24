<template>
  <!-- 轮播图主体 -->
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>

    <!-- 小圆点 -->
    <!-- <slot name="indicator"></slot> -->

    <div class="indicator">
      <!-- <slot name="indicator" v-if="showIndicator && slideCount>1"> -->

      <div
        v-for="(item, index) in slideCount"
        class="indi-item"
        :class="{active: index === currentIndex-1}"
        :key="index"
      ></div>

      <!-- </slot> -->
    </div>
  </div>
</template>

<script>
// import Slide from "./SwiperItem";
export default {
  name: "Swiper",
  // 用户可以自定义轮播的等待时间 和 过渡时间
  props: {
    interval: {
      type: Number,
      default: 3000,
    },
    animDuration: {
      type: Number,
      default: 300,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      slideCount: 0, //slide的个数
      swiperWidth: 0, //swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, //图片位置
      scrolling: false, // 是否正在滚动

      lock: false, //用来判断是不是离开了当前组件
    };
  },
  components: {
    // Slide
  },
  mounted() {
    //计时器记得开启  要先保证dom先建立起来 js再运行 不然小点出不来
    setTimeout(() => {
      /**
       * 创建轮播图 1.要先设置dom结构
       *            2.设置图片的移动函数
       *            3.设置自动轮播
       *            4.touch控制
       *            5.设置小圆点
       */

      // 1.操作Dom,在后面添加Slide
      this.handleDom();

      //2.开启定时器
      this.startTimer();
    }, 300);
  },
  methods: {
    /**
     * 定时器操作
     */
    startTimer() {
      this.playTimer = setInterval(() => {
        this.currentIndex++;
        //让图片进行滚动 滚动的距离是当前的照片位置*照片的宽度
        this.scrollContent(-this.currentIndex * this.swiperWidth);
      }, this.interval);
    },

    stopTimer() {
      clearInterval(this.playTimer);
    },

    /**
     * 滚动动画 先监听滚动 然后给它一个过度时间，再设置它的滚动
     */
    scrollContent(currentPosition) {
      // 0.设置正在滚动
      this.scrolling = true;

      // 1.滚动动画 先监听滚动 然后给它一个过度时间，再设置它的滚动
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      this.setTransform(currentPosition);

      //2.判断滚动的位置
      this.checkPosition();

      // 3.滚动完成
      this.scrolling = false;
    },

    /**
     * 判断图片滚动到哪了
     * 如果到了最后一张，就让他指向第一张
     * 如果是往回 就让它指向最后一张
     */
    checkPosition() {
      /**
       * 从最后一张图片跳转到跳转到第一张图片，也是使用的transfrom，所以也会有过度效果，如何取消
       *
       * 注意：最后一张转第一张是直接转的，不是经过setTransForm函数
       *
       * 思路：每一次过度完 图片会停留一段时间，此时我们用setTimeout设置300ms，保持里面的代码300ms里面不触发，使之前的过度效果生效之后，300ms之后setTimeout里面的代码实现，过渡时间变0，如果直接将过渡时间去掉，因为函数声明提升的问题，过渡时间为0会先生效，导致上一张正常要过渡的图片，不能过渡；也因为这个setTimeout （异步执行机制），有300ms的缓冲，所以设置为0之后，正常设置的过渡时间这个式子this.swiperStyle.transition = "transform " + 300 + "ms"会先先执行，变成能正常过渡；setTimeout设置的这个过渡时间为0是只针对300ms里面，发生的图片过渡，又因为最后一张转第一张是立即触发的，刚好就是这300ms里面触发的图片过渡，所以过渡效果被取消了
       *
       */
      setTimeout(() => {
        this.swiperStyle.transition = "0ms";

        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.swiperWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.swiperWidth);
        }
      }, this.animDuration);

      // 结束移动后的回调
      this.$emit("transitionEnd", this.currentIndex - 1);
    },

    /**
     * 设置滚动的位置
     */
    setTransform(position) {
      //做兼容
      this.swiperStyle.transform = "translateX(" + position + "px)";
      this.swiperStyle["-webkit-transform"] =
        "transform " + this.animDuration + "ms";
      this.swiperStyle["-ms-transform"] =
        "transform " + this.animDuration + "ms";
    },

    /**
     * 操作DOM, 在DOM前后添加Slide
     */
    handleDom() {
      // 获取dom
      let oSwiper = document.querySelector(".swiper");
      let oSlide = document.getElementsByClassName("slide");

      // 保存slide（传入的图片）的个数
      this.slideCount = oSlide.length;
      if (this.slideCount > 1) {
        //克隆照片的第一张和最后一张
        let cloneFirst = oSlide[0].cloneNode(true);
        let cloneLast = oSlide[this.slideCount - 1].cloneNode(true);

        //分别将克隆的第一张放到最后 最后一张放到最前
        oSwiper.appendChild(cloneFirst);
        oSwiper.insertBefore(cloneLast, oSlide[0]);

        //保存swiper的高度 和 样式
        this.swiperWidth = oSwiper.offsetWidth;
        this.swiperStyle = oSwiper.style;
      }

      // 让swiper元素, 默认显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.swiperWidth);
    },

    /**
     * 滑动事件处理
     */

    touchStart(e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return;

      // 2.停止定时器
      this.stopTimer();

      //3.拿到手指点击位置
      this.startX = e.touches[0].pageX;
    },
    //主要作用是做出滑动图片 图片跟着一起划的效果
    touchMove(e) {
      // 1.保留移动的最后位置，并计算出和最开始点击位置的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;

      //算出现在的位置
      let currentPosition = -this.currentIndex * this.swiperWidth;
      //然后把算出的图片位置 + 手指移动的距离 得到移动的总距离
      let moveDistance = this.distance + currentPosition;

      // 2.每次手指滑动的时候 让图片跟着一起划
      this.setTransform(moveDistance);
    },

    //主要作用是直接控制滑动后的显示
    touchEnd() {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);

      // 2.进行判断 如果是大于0（划到上一张）且滑动的距离大于百分之25的图片宽度，就表示成功滑动到上一张图片 当前图片位置减一 ；反之则相反
      if (this.distance === 0) {
        return;
      } else if (this.distance > 0 && currentMove > this.swiperWidth * 0.25) {
        this.currentIndex--;
      } else if (this.distance < 0 && currentMove > this.swiperWidth * 0.25) {
        this.currentIndex++;
      }

      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.swiperWidth);

      // 4.移动完成后重新开启定时器
      this.startTimer();
    },
    /**
     * 控制上一个, 下一个
     */
    previous() {
      this.changeItem(-1);
    },

    next() {
      this.changeItem(1);
    },

    changeItem(num) {
      // 1.移除定时器
      this.stopTimer();

      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.swiperWidth);

      // 3.添加定时器
      this.startTimer();
    },
  },

  //进入组件前 把轮播图开起来
  activated() {
    //用锁来进行状态判断 不然会出bug
    if (this.lock) {
      this.startTimer()
      this.lock = false
    }
  },

  //离开组件前 把轮播图停掉
  deactivated() {
    this.lock = true;
    this.stopTimer();
  },
};
</script>


<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}
.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  margin: 0 5px;
}
.indi-item.active {
  background-color: #d93f30;
}
</style>
