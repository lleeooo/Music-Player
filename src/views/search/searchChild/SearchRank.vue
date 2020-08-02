<template>
  <div class="shortcut-wrapper" v-if="Object.keys(hotSearchKey).length !== 0">
    <div>
      <ul class="shortcut">
        <li v-for="(item , index) in hotSearchKey" :key="index" class="shortcut-item" @click="clickRankItem(item)">
          <div class="num">{{index + 1}}</div>
          <div class="desc">
            <div class="data">
              <div class="top">
                <div class="name">{{item.searchWord}}</div>
                <div class="img" v-if="item.iconUrl">
                  <img :src="item.iconUrl" />
                </div>
              </div>
              <div class="title">{{item.content}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchRank",
  props: {
    hotSearchKey: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    //热榜点击事件
    clickRankItem(item) {
      this.$emit('clickRankItem' , item)
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.shortcut-wrapper {
  font-size: $font-size-small;

  .shortcut {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 15px;
    padding: 10px 10px 20px 10px;
    border-radius: 10px;
    background-color: $color-highlight-background;

    .shortcut-item {
      display: flex;
      align-items: center;
      width: 50%;
      height: 40px;
      padding: 20px 0;

      .num {
        margin-right: 10px;
        font-size: $font-size-medium-x;
      }

      .desc {
        .data {
          .top {
            padding-bottom: 8px;
            display: flex;

            .name {
              font-size: $font-size-medium;
              padding-right: 5px;
            }

            .img {
              width: 20px;
              height: 20px;
              position: relative;
              bottom: 5px;

              img {
                width: 100%;
                height: 100%;
              }
            }
          }

          .title {
            width: 90%;
            color: $color-text-l;
          }
        }
      }
    }

    .shortcut-item:nth-child(1) {
      .num {
        color: #FB3939;
      }
    }

    .shortcut-item:nth-child(2) {
      .num {
        color: #FB3939;
      }
    }

    .shortcut-item:nth-child(3) {
      .num {
        color: #FB3939;
      }
    }

    .shortcut-item:nth-child(4) {
      .num {
        color: #FB3939;
      }
    }
  }
}
</style>