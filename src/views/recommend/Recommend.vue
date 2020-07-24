<template>
  <div class="recommend">
    <recommend-swiper></recommend-swiper>
    <div class="text">热门歌单推荐</div>


    <recommend-hotlist :hotList="hostList"></recommend-hotlist>



  </div>
</template>

<script>
//子组件
import RecommendSwiper from './recommendChild/RecommendSwipe'
import RecommendHotlist from './recommendChild/RecommendHotlist'


//网络请求
import {getHotList , getHotListItem} from 'network/recommend'



export default {
  name: "Recommend",
  data(){
    return{
      hostList:[]
    }
  },
  components: {
    RecommendSwiper,
    RecommendHotlist
  },
  created(){
    this._getHotList()
  },
  methods: {
    _getHotList(){
      getHotList().then(res => {
        this.hostList = res.data.playlists
      })
    }
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