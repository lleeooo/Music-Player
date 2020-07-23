<template>
  <div class="tabbar-item" @click="itemClick" :class="{active: isActive}">
    <div class="text">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabbarItem",
  props: {
    path: {
      type: String,
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.text {
  padding-bottom: 5px;
  color $color-text-l  
}

.active {
  color: $color-theme;
  border-bottom: 2px solid $color-theme;
}
</style>