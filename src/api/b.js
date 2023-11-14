import { get, post } from '@/axios'

export default {
  async getHome1 (params) {
    return await get('/abc/ccc', { params })
  },
  async getHomePost1 (data) {
    return await post('/abc/ccc', { data })
  }
}
