<template>
  <div class="wrapper">
    <div class="search-form">
      <el-form label-width="80px" label-position="left" :inline="true" ref="searchForm" :model="searchData" class="demo-form-inline">
        <el-form-item label="姓名/昵称">
          <el-input v-model="searchData.keyword" clearable placeholder="姓名/微信昵称"></el-input>
        </el-form-item>
<!--        <el-form-item label="姓名">
          <el-input v-model="searchData.user" clearable placeholder="商品名称"></el-input>
        </el-form-item>-->
        <el-form-item label="商品名称">
          <el-input v-model="searchData.productName" clearable placeholder="商品名称"></el-input>
        </el-form-item>
<!--        <el-form-item label="销售员">
          <el-input v-model="searchData.user" clearable placeholder="商品名称"></el-input>
        </el-form-item>-->
<!--        <el-form-item label="用户状态">
          <el-select style="width: 215px" v-model="searchData.status" clearable placeholder="用户状态">
            <el-option v-for="v in userStatus" :key="v.name" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="支付状态">
          <el-select style="width: 215px" v-model="searchData.status" clearable placeholder="用户状态">
            <el-option v-for="v in payStatus" :key="v.name" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="商品类目">
          <el-select style="width: 215px" v-model="searchData.productCategoryId" clearable placeholder="商品类目">
            <el-option v-for="v in goodsCategory" :key="v.name" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="下单时间">
          <el-date-picker
            v-model="searchData.date1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付时间">
          <el-date-picker
            v-model="searchData.date2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-content">
      <el-table
        :max-height="tableHeight"
        border
        v-loading="loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="payAmount"
          label="实收金额">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="下单客户微信昵称">
        </el-table-column>
<!--        <el-table-column
          prop="address"
          label="用户状态">
        </el-table-column>-->
        <el-table-column
          prop="status"
          label="支付状态">
          <template slot-scope="scope">
            <span>
              {{
                scope.row.status === 0 ? '待付款' :
                  scope.row.status === 1 ? '已完成' : ''
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="paymentTime"
          label="下单时间">
        </el-table-column>
        <el-table-column
            prop="payType"
            label="支付方式">
          <template slot-scope="scope">
            <span>
              {{
                scope.row.payType === 0 ? '未支付' :
                    scope.row.payType === 1 ? '支付宝' :
                        scope.row.payType === 2 ? '微信' : ''
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="销售员">
        </el-table-column>
        <el-table-column
            prop="op"
            label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pg">
        <el-pagination
          :disabled="loading"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="searchData.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

import tableHeight from '@/mixins/tableHeight'
import moment from 'moment'
export default {
  name: 'MyOrder',
  data() {
    return {
      userStatus: [{
        name: '全部',
        id: '',
      },{
        name: '待付款',
        id: 0,
      },{
        name: '已完成',
        id: 1,
      },],
      payStatus: [{
        name: '全部',
        id: '',
      },{
        name: '待付款',
        id: 0,
      },{
        name: '已完成',
        id: 1,
      },],
      /*goodsCategory: [{
        name: '全部',
        id: '',
      }],*/
      searchData: {
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        productName: '',
        status: '',
        date1: '',
        date2: '',
        /*keyword: '',
        productCategoryId: '',*/
      },
      tableData: [],
      currentPage: 1,
      loading: false,
      total: 0,
    }
  },
  mixins: [ tableHeight ],
  async mounted() {
    this.handleList()
    /*const res = await this.$api.order.productCategory({
      pageNum: 1,
      pageSize: 10000,
    })
    this.goodsCategory = [...this.goodsCategory, ...res.list]*/
  },
  methods: {
    handleSearch() {
      this.handleList()
    },
    async handleList() {
      try {
        if (this.loading) return
        this.loading = true
        const newData = { ...this.searchData }
        if (newData.date1) {
          newData.createStartTime = moment(newData.date1[0]).format('YYYY-MM-DD')
          newData.createEndTime = moment(newData.date1[1]).format('YYYY-MM-DD')
        }
        if (newData.date2) {
          newData.payStartTime = moment(newData.date2[0]).format('YYYY-MM-DD')
          newData.payEndTime = moment(newData.date2[1]).format('YYYY-MM-DD')
        }
        delete newData.date1
        delete newData.date2
        console.log(newData)
        const res = await this.$api.order.orderList(newData)
        this.loading = false
        this.total = Number(res.total)
        this.tableData = res.list
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    handleReset() {
      this.searchData = {
        pageNum: 1,
        pageSize: 10,
        payStatus: '',
      }
      this.total = 0
      this.handleList()
    },
    handleCurrentChange(v) {
      this.searchData.pageNum = v
      this.handleList()
    },
    handleSizeChange(v) {
      this.searchData.pageSize = v
      this.handleSearch()
    },
    async handleDetail (v) {
      try {
        const res = await this.$api.order.orderDetail(v.id)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
      console.log()
    }
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .table-content {
    flex: 1;
  }
  .pg {
    padding: 16px 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
