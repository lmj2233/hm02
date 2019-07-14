// 封装axios
import axios from 'axios'
// instance 是axios实例
var instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
//   headers: {
//     Authorization:
//       'Bearer' + JSON.parse(window.sessionStorage.getItem('hm02')).token }
})
// JSON.parse(window.sessionStorage.getItem('hm02')).token
// 先将字符串转换为对象，JSON.parse转换为对象，.token获取到产生的token

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
//   获取token
  const user = window.sessionStorage.getItem('hm02')
  if (user) {
    //   设置headers
    // config.headers = { Authorization:
    // 'Bearer' + JSON.parse(user).token }
  }
  console.log(config)
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response
}, (error) => {
  // 对响应错误做点什么
  console.dir(error.response)
  if (error.response.status === 401) {
    // hash
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
