import {request} from "./request"

export function getOutRank () {
  return request({
    url: '/toplist'
  })
}

export function getRankDateil () {
  return request({
    url: '/toplist/detail'
  })
}