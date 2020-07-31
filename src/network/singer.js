import { request } from 'network/request'

//请求热门歌手信息
export function getHotSingerList() {
  return request({
    url: '/artist/list',
    params: {
      limit: 50,
      type: -1,
      area: -1
    }
  })
}

//请求歌手的热门50首歌歌曲信息
export function getSingerSong(id) {
  return request({
    url: '/artist/top/song',
    params: {
      id: id
    }
  })
}


//请求某一首歌的详细信息
export function getSingerSongMessage() {
  return request({
    url: '/song/detail',
    params: {
      ids: 1407551413
    }
  })
}

//获取歌手单曲
export function getSingerDetail(singerId) {
  return request({
    url: '/artists',
    params: {
      id: singerId
    }
  })
}

//获取歌曲的播放地址

export function getMusicUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id: id
    }
  })
}

//获取歌曲歌词
export function getLyric(id) {
  return request({
    url: '/lyric',
    params: {
      id: id
    }
  })
}