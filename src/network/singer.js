import {request} from 'network/request'

export function getHotSingerList(){
  return request({
    url:'/artist/list',
    params: {
      limit: 50,
      type: -1,
      area: -1
    }
  })
}