<template>
  <div class="rank">
    <scroll ref="scroll" class="content">
      <div class="rank-list">
        <div
          class="list-item"
          v-for="(item , index) in rankList"
          :key="index"
          @click="clickRankList(item , index)"
        >
          <div class="item-l">
            <div class="img">
              <img :src="item.coverImgUrl" />
            </div>
          </div>
          <div class="item-r">
            <div class="name">{{item.name}}</div>
            <div class="desc">{{item.description}}</div>
          </div>
        </div>
      </div>
    </scroll>

    <router-view></router-view>
  </div>
</template>

<script>
//组件
import scroll from "components/common/scroll/Scroll";

//网络请求
import { getOutRank } from "network/rank";
import { changeScrollHeight } from "@/common/js/changeScrollHeight";

//vuex
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Rank",
  data() {
    return {
      rankList: [], //保存排行榜歌单信息
    };
  },
  components: {
    scroll,
  },
  created() {
    this._getOutRank();
  },
  methods: {
    //获取全部榜单
    _getOutRank() {
      getOutRank().then((res) => {
        console.log(res);
        this.rankList = res.data.list;
      });
    },

    //点击排行榜歌单
    clickRankList(item, index) {
      console.log(item);
      this.$router.push({
        path: `/rank/${item.id}`,
      });

      this.setDisc(item);
    },

    ...mapMutations({
      setDisc: "SET_DISC",
    }),
  },

  computed: {
    ...mapGetters(["playlist", "disc"]),
  },
  watch: {
    playlist() {
      if (this.playlist.length > 0) {
        changeScrollHeight(
          this.playlist,
          this.$refs.scroll.$el,
          this.$refs.scroll,
          60
        );
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.rank {
  height: 89vh;

  .content {
    height: 100%;
    overflow: hidden;

    .rank-list {
      padding: 0 20px 20px;
      font-size: $font-size-small;
      color: $color-text-l;

      .list-item {
        margin-top: 20px;
        display: flex;
        background: $color-highlight-background;
        border-radius: 5px;
        align-items: center;

        .item-l {
          .img {
            width: 100px;
            height: 100px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 5px;
            }
          }
        }

        .item-r {
          padding-left: 20px;

          .name {
            font-size: $font-size-medium;
            padding-bottom: 10px;
            color: $color-text;
          }

          .desc {
            line-height: 1.2;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>