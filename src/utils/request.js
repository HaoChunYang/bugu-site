import axios from 'axios'

axios.defaults.baseURL = '/api'

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
