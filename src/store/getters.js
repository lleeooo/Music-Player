// import {}

import state from "./state"

export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const curIndex = state => state.curIndex

export const disc = state => state.disc


//获取播放列表中 正在播放的歌
export const currentSong = (state) => {
  return state.playlist[state.curIndex] || {}
}