import axios from 'axios'
import { message } from 'ant-design-vue'

//创建axios实例
const myAxios = axios.create({
  baseURL: 'http://localhost:8123',
  // 如果请求时间超过 `timeout` 的值，则请求会被中断， 默认值是 `0` (永不超时)
  timeout: 60000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true,
})

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    const { data } = response

    //未登录
    if (data.code === 40100) {
      // 当前页面不需要获取用户信息以及用户已经在登录页时，不需要重新进入登录页
      if(!response.request.responseURL.includes('/user/get/login') && !window.location.pathname.includes('/user/login')) {
        message.warning('请先登录');
        window.location.href = `/user/login?redirect=${window.location.href}`
      }
    }


    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

export default myAxios
