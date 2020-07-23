<template>
  <div id="app">
    <my-header></my-header>
  </div>
</template>

<script>
import MyHeader from "components/content/m-header/MyHeader";
export default {
  name: "App",
  components: {
    MyHeader,
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl';
@import '~assets/stylus/mixin.styl';

  
</style>
