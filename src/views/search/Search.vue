<template>
  <div class="search">
    <div class="searchbox-wrapper">
      <search-box :placeholder="placeholder" @query="query" ref="searchBox" />
    </div>
    <search-rank
      :hotSearchKey="hotSearchKey"
      @clickRankItem="clickRankItem"
      v-show="!songs.length && !singer.length"
    />
    <scroll ref="scroll" class="content" v-show="songs.length || singer.length">
      <suggest :querySinger="singer" :querySongs="songs" class="suggest" />
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
//组件
import SearchBox from "./searchChild/SearchBox";
import SearchRank from "./searchChild/SearchRank";
import Suggest from "components/content/suggest/Suggest";
import scroll from "components/common/scroll/Scroll";

//网络请求
import { getSearchHotDetail, searchQuery, search } from "network/search";

//方法
import { debounce } from "@/common/js/util";
import { changeScrollHeight } from "@/common/js/changeScrollHeight";
import { mapGetters } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      placeholder: "搜索歌手、歌曲", //搜索框占位符
      hotSearchKey: [], //热门搜索内容
      keyWord: "", //搜索内容
      songs: [],
      singer: [],
    };
  },
  components: {
    SearchBox,
    SearchRank,
    Suggest,
    scroll,
  },
  computed: {
    ...mapGetters(["playlist"]),
  },
  created() {
    this._getSearchHotDetail();
  },
  methods: {
    //获取用户输入的值
    query(newQuery) {
      this.keyWord = newQuery;
    },

    //热榜点击事件
    clickRankItem(item) {
      //把点击的值放到搜索栏里
      this.$refs.searchBox.setQuery(item.searchWord);
    },

    //请求热搜列表
    _getSearchHotDetail() {
      getSearchHotDetail().then((res) => {
        this.hotSearchKey = res.data.data.slice(0, 10);
      });
    },

    //搜索 歌曲
    _search(keyword) {
      search(keyword).then((res) => {
        this.songs = res.data.result.songs;
      });
    },

    //搜索 歌手
    _searchQuery(keyword) {
      searchQuery(keyword).then((res) => {
        this.singer = res.data.result.artist;
      });
    },
  },
  watch: {
    //监控搜索值的改变
    keyWord(newVal) {
      if (newVal) {
        this._search(newVal);
        this._searchQuery(newVal);
      } else {
        this.songs = [];
        this.singer = [];
      }
      changeScrollHeight(
        this.playlist,
        this.$refs.scroll.$el,
        this.$refs.scroll,
        120
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.search {
  height: 89vh;
  position: relative;

  .searchbox-wrapper {
    padding-top: 20px;
  }

  .content {
    height: calc(100% - 60px);
    overflow: hidden;

    .suggest {
    }
  }
}


</style>