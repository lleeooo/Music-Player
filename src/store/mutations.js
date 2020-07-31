import * as type from './mutation-types'
const mutations = {
  setSinger(state, singer) {
    state.singer = singer
  },

  //设置播放
  [type.SET_PLAYING](state , flag) {
    state.playing = flag
  },

  //全屏
  [type.SET_FULL_SCREEN](state , flag) {
    state.fullScreen = flag
  },

  //播放列表
  [type.SET_PLAYLIST](state , list) {
    state.playlist = list
  },


  //顺序播放
  [type.SET_SEQUENCE_LIST](state , list) {
    state.sequenceList = list
  },


  //播放模式
  [type.SET_PLAY_MODE](state , mode) {
    state.mode = mode
  },

  //歌曲角标
  [type.SET_CURRENT_INDEX](state , index) {
    state.curIndex = index
  },


  //设置歌单信息
  [type.SET_DISC](state , disc) {
    state.disc = disc
  },

  
}
export default mutations
