import { get, post } from '@/axios'

export default {
  async login (data) {
    return await post('/admin/login', data)
  },
  async getUserInfo (params) {
    return await get('/admin/info', { params })
  },
  async getRoles (params) {
    return await get('/role/list', { params })
  },

  async listAll (params) {
    return await get('/role/listAll', { params })
  },
}