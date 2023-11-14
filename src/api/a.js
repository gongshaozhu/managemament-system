import { get, post } from '@/axios'

export default {
  async getHome (params) {
    return await get('/abc/ccc', { params })
  },
  async getHomePost (data) {
    return await post('/abc/ccc', { data })
  }
}
