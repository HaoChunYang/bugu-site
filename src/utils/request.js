import axios from 'axios'

axios.defaults.baseURL = '/api'

export function post (url) {
  return function (params) {
    axios.post(url, params).then(res => {
      return res.data
    }).catch(e => {

    })
  }
}
