import axios from 'axios'
import { Notification } from 'element-ui'
import router from '@/router'
const instance = axios.create({
  // baseURL: '/order-admin/',
  baseURL: 'http://192.168.1.79/order-admin',
  timeout: 10000,
  headers: {
    'content-type': 'application/json' // application/x-www-form-urlencoded multipart/form-data
  },
})
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  // Authorization
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  if (response.data.code === 500) {
    Notification({
      title: 'error',
      message: `${response.data.message}(500)`
    })
  }
  if (response.data.code === 403) {
    router.push('/')
    Notification({
      title: 'error',
      message: `${response.data.message}(403)`
    })
  }
  if (response.data.code === 401) {
    // router.push('/login')'
    if (window.location.href.indexOf('/login') === -1) {
      window.location.href = '/'
    }
    Notification({
      title: 'error',
      message: `${response.data.message}(401)`
    })
    localStorage.removeItem('token')
  }
  return response.data.data
}, function (error) {
  Notification({
    title: 'error',
    message: error.message
  })
  return Promise.reject(error)
})

export default instance
export const get = instance.get
export const post = instance.post
