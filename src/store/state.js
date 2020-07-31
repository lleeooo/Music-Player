import {playMode} from '@/common/js/config.js'
const state = {
  singer: {},

  playing: false, //播放 默认未播放
  fullScreen:false, //全屏
  playlist:[], //顺序播放列表
  sequenceList: [], //播放列表（可以变成乱序）
  mode: playMode.sequence, //播放模式 默认顺序播放
  curIndex: -1,  //当前播放的这首歌

  disc: {}  //歌单信息
}
export default state

