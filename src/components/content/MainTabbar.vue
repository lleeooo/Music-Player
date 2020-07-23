<template>
  <div>
    <tabbar>
      <tabbar-item path="recommend">
        <div slot="text">推荐</div>
      </tabbar-item>
      <tabbar-item path="singer">
        <div slot="text">歌手</div>
      </tabbar-item>
      <tabbar-item path="rank">
        <div slot="text">排行</div>
      </tabbar-item>
      <tabbar-item path="search">
        <div slot="text">搜索</div>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import Tabbar from "components/common/tabbar/Tabbar";
import TabbarItem from "components/common/tabbar/TabbarItem";

export default {
  name: "MainTabbar",
  components: {
    Tabbar,
    TabbarItem
  }
};
</script>

<style lang="stylus" scoped></style>