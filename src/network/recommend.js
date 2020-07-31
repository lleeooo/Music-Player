import {request} from './request'

//1.获取的精品歌单
export function getHotList(){
  return request({
    url: '/top/playlist/highquality',
    params:{
      limit: 30,
    }
  })
}

//2.获取歌单里面歌曲 需要提供歌单id
export function getHotRecommendItem(id){
  return request({
    url: '/playlist/detail',
    // method: 'post'
    params: {
      id: id
    }
  })
}
