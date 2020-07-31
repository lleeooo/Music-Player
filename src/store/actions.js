import * as type from './mutation-types'
import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/util'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.songId === song.songId
  })
}

//同时操作多个mutations值取修改state里面的值
//context , payload可以直接进行解构list: 全部歌曲
export function selectPlay({ commit, state }, { list, index }) {
  commit(type.SET_SEQUENCE_LIST, list) //设置顺序播放列表

  
  //如果播放模式为随机 且点击歌曲列表
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(type.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])

  } else {
    commit(type.SET_PLAYLIST, list)//设置播放列表
  } 


  commit(type.SET_CURRENT_INDEX, index) //设置当前播放的这首歌的位置
  commit(type.SET_PLAYING, true) //设置歌曲为播放状态
  commit(type.SET_FULL_SCREEN, true) //设置为全屏播放
}




//随机播放
export function randomPlay({ commit, state }, { list }) {
  commit(type.SET_PLAY_MODE, playMode.random)
  commit(type.SET_PLAYING, true) //设置歌曲为播放状态
  commit(type.SET_FULL_SCREEN, true) //设置为全屏播放
  let randomList = shuffle(list)
  commit(type.SET_PLAYLIST, randomList) //设置播放列表
  commit(type.SET_SEQUENCE_LIST, list) //设置顺序播放列表
  commit(type.SET_CURRENT_INDEX, 0) //设置当前播放的这首歌的位置
}
