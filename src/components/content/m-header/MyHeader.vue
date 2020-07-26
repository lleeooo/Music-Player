<template>
  <div class="my-header">
    <div class="icon"></div>
    <h1 class="text">Vue Music</h1>
  </div>
</template>

<script>
export default {
  name: "MyHeader"
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable";
@import "~assets/stylus/mixin";

  .my-header
    height 44px
    text-align center
    color $color-theme
    display flex
    justify-content center
    align-items center
    .icon
      bg-image('logo')
      width 40px
      height 32px
      background-size 40px 32px
      background-repeat no-repeat
    .text
      font-size $font-size-large
      margin-left  5px
</style>