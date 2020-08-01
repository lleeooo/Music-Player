<template>
  <div class="song-list">
    <ul>
      <li v-for="(item , index) in songs" :key="index" @click="select(item , index)">
        <div class="rank">{{index + 1}}</div>
        <div class="content">
          <h2 class="name">{{item.songName}}</h2>
          <p class="desc">{{item.singer + '-' + item.album}}</p>
        </div>
      </li>
    </ul>
  </div>  
</template>

<script>
export default {
  name: "SongList",
  props: {
    songs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    select(item , index) {
      this.$emit('select',item,index)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.song-list
  padding 15px 10px

  li
    display flex
    padding 10px 
    margin-bottom 3px 
    font-size $font-size-medium
    color $color-text
    align-items center
    .rank 
      font-size $font-size-large-x
      color $color-theme
      padding-right 20px
    .desc
      color $color-text-l
      padding 10px 0 5px 0 
  

</style>