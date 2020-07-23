<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {};
  },

  methods: {
    itemClick() {
      console.log();
    },
  },
};
</script>


<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.tabbar {
  display: flex;
  justify-content: space-around;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  color $color-text-l  
}
</style>