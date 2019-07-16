// 封装axios
import axios from 'axios'
// 导入bigint包
import JSONBig from 'json-bigint'
// instance 是axios实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  //   headers: {
  //     Authorization:
  //       'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm02')).token }

  // 处理数据，更精准,在向服务器发送数据之前，修改请求数据
  transformResponse: [function (data) {
    // 将数据通过JSONBig 转换为精准数据
    return JSONBig.parse(data)
  }]

})
// JSON.parse(window.sessionStorage.getItem('hm02')).token
// 先将字符串转换为对象，JSON.parse转换为对象，.token获取到产生的token

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
//   获取token
  const user = window.sessionStorage.getItem('hm02')
  if (user) {
    config.headers = {
      // Bearer 后面要加一个空格，空格，空格
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response
}, error => {
  // 对响应错误做点什么
  // console.dir(error.response)
  // 为了更严谨
  if (error.response && error.response.status === 401) {
    // hash
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
