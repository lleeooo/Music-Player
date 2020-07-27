<template>
  <div class="song-list">
    <ul>
      <li v-for="(item , index) in songs" :key="index">
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
  computed: {
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.song-list
  padding 15px 10px

  li
    padding 10px 
    margin-bottom 3px 
    font-size $font-size-medium
    color $color-text
    .desc
      color $color-text-l
      padding 10px 0 5px 0 


</style>