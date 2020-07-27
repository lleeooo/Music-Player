//规定歌曲信息模板
export default class Song {
  constructor({songId , songName, singer  , album , albumImage }){
    this.songId = songId,
    this.songName = songName,
    this.singer = singer,
    this.album = album,
    this.albumImage = albumImage
  }
}

//获取到歌手名字
function singerName(arr) {
  let name = []
  name = arr.map(item => {
    return item.name
  })
  return name.join('/')
}


//将传入来的歌曲对象 通过模板进行信息提取
export function createSong(musicData) {
  return new Song({
    songId: musicData.id,
    songName: musicData.name,
    singer: singerName(musicData.ar),
    album: musicData.al.name,
    albumImage: musicData.al.picUrl
  })
}