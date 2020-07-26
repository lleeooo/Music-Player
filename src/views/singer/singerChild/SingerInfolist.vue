<template>
  <div class="info-list" v-if="Object.keys(singerList).length !== 0">
    <div
      v-for="(item , index) in singerList"
      :key="index"
      class="singer-item"
      @click="itemClick(index)"
      :class="{active: curIndex === index}"
      ref="listGrup"
    >
      <div class="img">
        <img v-lazy="item.picUrl" alt @load="singerImgLoad" />
      </div>
      <div class="name">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SingerInfolist",
  data() {
    return {
      curIndex: 0,
    };
  },
  props: {
    singerList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    //监控图片加载
    singerImgLoad() {
      let timer = null;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        this.$emit("singerImgLoad");
      }, 100);
    },

    //点击歌手事件
    itemClick(index) {
      this.curIndex = index;
    },
  },
};
</script>


<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.info-list {
  padding: 5px 20px;

  .singer-item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    margin: 5px 0;
    color: $color-text-l;
    font-size: $font-size-medium;
    transition: background-color 0.5s linear;
    transition: color 0.5s linear;
  }

  .active {
    background-color: rgba(255, 255, 255, 0.5);
    color: rgba(0, 0, 0, 0.8);
  }

  .img {
    width: 50px;
    height: 50px;
    padding-right: 20px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
}
</style>