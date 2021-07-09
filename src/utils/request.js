import axios from 'axios'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

axios.defaults.baseURL = '/api'

axios.interceptors.request.use(
  config => {
    // NProgress.start()
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  }
)

axios.interceptors.response.use(
  response => {
    // NProgress.done()
    return response
  },
  error => {
    ElMessage.error(`${error.response.status} ${error.response.statusText}`)
    return Promise.reject(error)
  }
)

export function post (url) {
  return function (params) {
    return axios.post(url, params).then(res => {
      return res.data
    }).catch(e => {

    })
  }
}

export function get (url) {
  return function (params = {}) {
    params.timestamp = new Date()
    return axios.get(url, { params }).then(res => {
      return res.data
    }).catch(e => { })
  }
}
