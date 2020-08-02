import {request} from "./request"

//获取所有榜单
export function getOutRank () {
  return request({
    url: '/toplist'
  })
}
//获取所有榜单内容摘要
export function getRankDateil () {
  return request({
    url: '/toplist/detail'
  })
}