import { get, post } from '@/axios'

export default {
  async orderList (params) {
    return await get('/order/list', { params })
  },
  async goodsList (params) {
     return await get('/product/list', { params })
  },
  async productCategory (params) {
     return await get('/productCategory/list', { params })
  },
  async createLink (data) {
     return await post('/product/createLink', data)
  },
  async deleteStatus (data) {
     return await post('/product/update/deleteStatus', data)
  },

}
