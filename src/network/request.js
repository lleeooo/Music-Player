import axios from 'axios'
import qs from 'qs'

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    withCredentials: true
  })
  // instance.defaults.withCredentials = true

  //2.axios拦截器
  instance.interceptors.request.use(config => {
    console.log("发出请求")
    if (config.meth === 'post' && !(config.data instanceof FormData)) {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
    }
    return config
  }, err => {
    console.log(err)
  })

  instance.interceptors.response.use(res => {
    console.log("收到响应")
    return res
  }, err => {
    console.log(err)
  })


  //3.发送真正的网络请求
  return instance(config)
}
