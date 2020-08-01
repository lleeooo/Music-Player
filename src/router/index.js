import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const recommend = () => import('views/recommend/Recommend')
const singer = () => import('views/singer/Singer')
const rank = () => import('views/rank/Rank')
const search = () => import('views/search/Search')
const dateil = () => import('views/singerDateil/Dateil')
const recommendDateil = () => import('views/recommend/recommendDateil/RecommendDateil')
// const rankDateil = () => import('views/rank/rankDateil/RankDateil')
const rankDateil = () => import('views/rank/rankDateil/RankDateil')


export default new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: recommendDateil
        }
      ]
    },
    {
      path: '/singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: dateil
        }
      ]
    },
    {
      path: '/rank',
      component: rank,
      children: [
        {
          path: ':id',
          component: rankDateil
        }
      ]
    }, 
    {
      path: '/search',
      component: search
    },
  ],
  mode: 'history',
})
