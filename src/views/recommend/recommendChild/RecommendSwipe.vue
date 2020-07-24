<template>
  <Swiper>
    <swiper-item v-for="(item , index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.img" alt="">
      </a>
    </swiper-item>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "RecommendSwiper",
  data() {
    return {
      banner: [
        { id: 1, img: "https://i.loli.net/2020/07/24/LQFXlTiPOdE4bUo.jpg", link: "https://music.163.com/#/song?id=1463437482"},
        { id: 2, img: "https://i.loli.net/2020/07/24/DvX7yp8OuZTLJV4.jpg", link: "https://music.163.com/#/album?id=92747828"},
        { id: 3, img: "https://i.loli.net/2020/07/24/IRs1PyMtuLFSNVi.jpg", link: "https://music.163.com/#/song?id=1464725320" },
        { id: 4, img: "https://i.loli.net/2020/07/24/lILJzif49Q2OyCE.jpg", link: "https://music.163.com/store/newalbum/detail?id=92761770"},
        { id: 5, img: "https://i.loli.net/2020/07/24/bKi5jkWzveo9scm.jpg", link: "https://music.163.com/#/song?id=1465222233"},
        { id: 6, img: "https://i.loli.net/2020/07/24/XMx64DNyf851HpB.jpg", link: "https://music.163.com/#/song?id=1465257670"}
      ],
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style lang="stylus" scoped></style>