<template>
  <div id="app">
    <my-header class="header"></my-header>
    <main-tabbar class="tabbar"></main-tabbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MyHeader from "components/content/m-header/MyHeader";
import MainTabbar from "components/content/MainTabbar";
import Player from "views/player/Player"

export default {
  name: "App",
  components: {
    MyHeader,
    MainTabbar,
    Player
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl';
@import '~assets/stylus/mixin.styl';
</style>
