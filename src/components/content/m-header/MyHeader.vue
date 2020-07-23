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
      width 30px
      height 32px
      background-size 30px 32px
    .text
      font-size $font-size-large
      margin-left  5px
</style>