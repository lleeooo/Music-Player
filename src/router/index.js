import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const recommend = () => import('views/recommend/Recommend')
const singer = () => import('views/singer/Singer')
const rank = () => import('views/rank/Rank')
const search = () => import('views/search/Search')

export default new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend
    },
    {
      path: '/singer',
      component: singer
    }, {
      path: '/rank',
      component: rank
    }, {
      path: '/search',
      component: search
    },
  ],
  mode: 'history',
})
