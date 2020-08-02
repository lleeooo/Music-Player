import {request} from './request'

//热搜列表(详细)
export function getSearchHotDetail() {
  return request ({
    url: '/search/hot/detail'
  })
}

//搜索
export function search(value) {
  return request({
    url: '/search',
    params: {
      keywords: value 
    }
  })
}

//搜索
export function searchQuery(value) {
  return request({
    url: '/search/multimatch',
    params: {
      keywords: value 
    } 
  })
}
