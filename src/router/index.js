import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const recommend = () => import('views/recommend/Recommend')
const singer = () => import('views/singer/Singer')
const rank = () => import('views/rank/Rank')
const search = () => import('views/search/Search')
const dateil = () => import('views/singerDateil/Dateil')
const recommendDetail = () => import('views/recommend/recommendDetail/RecommendDetail')

const rankDetail = () => import('views/rank/rankDetail/RankDetail')


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
          component: recommendDetail
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
          component: rankDetail
        }
      ]
    }, 
    {
      path: '/search',
      component: search,
      children: [
        {
          path: ':id',
          component: dateil
        }
      ]
    },
  ],
  // mode: 'history',
})
