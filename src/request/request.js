import Axios from 'axios'
import router from '@/router/index'
import NProgress from 'nprogress'
import { Message } from 'element-ui'

const axios = Axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
  timeout: process.env.NODE_ENV === 'development' ? 60 * 1000 : 10 * 1000 // 设置超时时间
})

const toLogin = () => {
  router.push({
    query: {
      // 把当前的路由传递过去 登录成功后从哪来返回哪去
      backRouter: router.currentRoute.fullPath
    }
  })
}
// 拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  // 发送请求前执行
  // 判断用户有没有登录
  // console.log('config:', config)  // 本次请求的信息
  // const token = localStorage.getItem('token')
  // if (token) {
  //   // 携带登录凭证发起请求
  //   config.headers['x-Nideshop-Token'] = token
  // }

  // config.headers = { // 设置请求头
  //   'content-type': 'application/x-www-form-urlencoded' // 默认application/json  不需要处理
  // }
  // if (config.url !== "login") {
  //   // 创建token
  //   // Cookies.set("token", "aaaaaaaaaaaaaaaaaaaa");
  //   // config.headers.token = Cookies.get("token"); // 获取token
  //   // 删除token
  //   // Cookies.remove("token");
  // }
  config.transformRequest = [ // 对应 application/x-www-form-urlencoded 请求头中请求参数处理
    function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => {
  NProgress.done()
  // 接收到响应之前，在执行then方法之前
  // console.log('res:',res)  // 本次服务器响应的一些信息
  // return res.data // 返回的res 被then方法的res形参接收了
  if (res.status === 200) {
    Message({
      type: 'success',
      message: res.data.message,
      showClose: true,
      duration: 2000
    })
    return res.data
  } else {
    Message({
      type: 'error',
      message: res.data.message,
      showClose: true,
      duration: 2000
    })
    console.log('请求失败', res)
  }
}, error => {
  const index = error.message.indexOf('timeout')
  if (index > -1) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('请求超时了，请重试！')
  }
  const statusCode = error.response.status
  if (statusCode) {
    switch (statusCode) {
      case 401:
        Message({
          type: 'error',
          message: '暂无权限，请先登录哦！',
          showClose: true,
          duration: 2000
        })
        toLogin()
        break
      case 403:
        Message({
          type: 'error',
          message: '登录过期，请重新登录哦！',
          showClose: true,
          duration: 2000
        })
        localStorage.removeItem('token')
        toLogin()
        break
      case 500:
        Message({
          type: 'error',
          message: '服务器异常！',
          showClose: true,
          duration: 2000
        })
        break
      default:
        console.log(error.code)
        break
    }
  }
  // return Promise.reject(error)
})

export default axios
