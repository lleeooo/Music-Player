<template>
  <div class="recommend">
    <recommend-swiper></recommend-swiper>
    <div class="text">热门歌单推荐</div>
  </div>
</template>

<script>
import RecommendSwiper from './recommendChild/RecommendSwipe'


// import {getRecommend} from 'network/recommend'
import {ERR_OK} from 'network/config'



export default {
  name: "Recommend",
  components: {
    RecommendSwiper
  },
  created(){

  },
  methods: {

  }

}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"

.text
  text-align center
  color $color-theme
  font-size $font-size-medium
  height 65px
  line-height 65px


</style>