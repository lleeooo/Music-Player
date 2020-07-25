<template>
  <div class="loading">
    <img src="~assets/img/recommend/loading.gif" alt="">
    <p>正在加载</p>
  </div>  
</template>

<script>
export default {
  name: "Loading"
}
</script>

<style lang="stylus" scoped>
.loading
  text-align center

  img
    width 25px
    height 25px
  p
    font-size 10px
    padding-top 5px


</style>