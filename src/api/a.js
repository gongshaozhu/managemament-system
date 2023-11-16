import { get, post } from '@/axios'

export default {
  async getHome (params) {
    return await get('/profile', { params })
  },
  async getHomePost (data) {
    return await post('/comments1', { data })
  }
}
