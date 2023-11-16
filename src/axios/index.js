import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5200/',
  headers: {
    'content-type': 'application/json' // // application/x-www-form-urlencoded
  },
})
instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default instance
export const get = instance.get
export const post = instance.post
