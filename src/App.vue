<template>
  <div id="app">
    <my-header class="header"></my-header>
    <main-tabbar class="tabbar"></main-tabbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MyHeader from "components/content/m-header/MyHeader";
import MainTabbar from "components/content/MainTabbar";

export default {
  name: "App",
  components: {
    MyHeader,
    MainTabbar,
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl';
@import '~assets/stylus/mixin.styl';
</style>
