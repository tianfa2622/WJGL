import axios from 'axios'
// import qs from 'qs'
import { hideLoading, showLoading } from './loading'
import router from '@/router/index'
import { Message } from 'element-ui'
// 根据环境变量区分接口的默认地址
switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://pm2.winvers.com/xtwjgl'
    break
  case 'test':
    axios.defaults.baseURL = 'http://192.168.1.12:8080'
    break
  default:
    axios.defaults.baseURL = '/apiB'
  // axios.defaults.baseURL = 'http://192.168.1.199:8086'
}

// 设置超时时间和跨域是否允许携带凭证
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true

// const CancelToken = axios.CancelToken
// // 使用CancelToken.source工厂函数创建一个cancel token
// const source = CancelToken.source()

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRouter.fullPath
    }
  })
}

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Message({
    message: msg,
    duration: 2000,
    type: 'error',
    showClose: true
  })
}

// // 设置post请求的请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.transformRequest = data => qs.stringify(data)

// 请求拦截器
axios.interceptors.request.use(
  config => {
    showLoading()
    const token = localStorage.getItem('token')
    // token存在
    token && (config.headers.Authorization = token)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    hideLoading()
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      // if (response.data.code === 1) {
      //   Message.success(response.data.message)
      return Promise.resolve(response)
      // }
    } else {
      return Promise.reject(response)
    }
  },
  err => {
    hideLoading()
    const { response } = err
    if (response) {
      switch (response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          tip(err.message)
          toLogin()
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 403:
          tip('登录过期，请重新登录')
          localStorage.removeItem('token')
          setTimeout(() => {
            toLogin()
          }, 1000)
          break
        // case 404:
        //   err.message = '请求错误,未找到该资源'
        //   tip(err.message)
        //   window.location.href = '/404'
        //   break
        case 405:
          err.message = '请求方法未允许'
          tip(err.message)
          break
        case 408:
          err.message = '请求超时'
          tip(err.message)
          break
        case 500:
          err.message = '服务器端出错'
          tip(err.message)
          break
        case 501:
          err.message = '网络未实现'
          tip(err.message)
          break
        case 502:
          err.message = '网络错误'
          tip(err.message)
          break
        case 503:
          err.message = '服务不可用'
          tip(err.message)
          break
        case 504:
          err.message = '网络超时'
          tip(err.message)
          break
        case 505:
          err.message = 'http版本不支持该请求'
          tip(err.message)
          break
        default:
          err.message = `连接错误${err.response.status}`
          tip(err.message)
      }
    } else {
      // 服务器连结果都没有返回
      // 断网处理
      if (!window.navigator.onLine) {
        return (window.location.href = '/dw')
      }
      // 超时处理
      if (JSON.stringify(err).includes('timeout')) {
        tip('服务器响应超时，请刷新当前页')
      }
    }
    // tip(err.message)
    return Promise.reject(err)
  }
)
export default axios

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function excelGet(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'get',
      responseType: 'blob',
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSON.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * delP方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function delP(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
