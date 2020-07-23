//这个库需要传入3个参数 url 、 option（参数对象）、 fn（fn里面为err和data ，请求成功就是data，失败就err）
import originJsonp from 'jsonp'


//对jsonp进行再次封装 增加一个data（方便调整jsonp，使能传入除了它规定的参数以外的参数）增加这个方法的灵活性
export default function(url , data , option){

  //判断传入的url里面有没有带？ 如果没有带 我们加上 ，如果有带，那我们补上剪掉的& 然后把我们自己的传入的参数处理好的url拼接到这个url上 
  url += (url.indexOf('?') !== -1 ? '&' : '?') + param(data)

  //封装成promise对象
  return new Promise((resolve , reject) => {
      originJsonp(url , option , (err , data) => {
        if(!err){
          resolve(data)
        }else{
          reject(err)
        }
      })
  })  
}

function param (data){
  let url = ''
  for(var k in data){
    let value = data[k] !==undefined ? data[k] : ''
    //将我们自己传参的参数用&进行一个拼接
    url += `&${k}=${encodeURIComponent(value)}`
  }
  //剪掉第一个& 
  return url ? url.substring(1) : ''
}