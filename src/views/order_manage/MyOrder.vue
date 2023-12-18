<template>
  <div class="wrapper">
    <div class="search-form">
      <el-form label-width="70px" label-position="left" :inline="true" ref="searchForm" :model="searchData" class="demo-form-inline">
        <el-form-item label="微信昵称">
          <el-input v-model="searchData.user" clearable placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchData.user" clearable placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="searchData.user" clearable placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="销售员">
          <el-input v-model="searchData.user" clearable placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-input v-model="searchData.user" clearable placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品类目">
          <el-select v-model="searchData.region" style="width: 215px" clearable placeholder="商品类目">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-date-picker
              v-model="searchData.region"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付时间">
          <el-date-picker
              v-model="searchData.region"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-content">
      <el-table
        :max-height="tableHeight"
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="金额">
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="address"
          label="销售">
        </el-table-column>
        <el-table-column
          prop="address"
          label="浏览人数">
        </el-table-column>
        <el-table-column
          prop="address"
          label="支付人数">
        </el-table-column>
      </el-table>
      <div class="pg">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

import tableHeight from "@/mixins/tableHeight";

export default {
  name: 'MyOrder',
  data() {
    return {
      currentPage: 1,
      searchData: {
        user: '',
        user1: '',
        user3: '',
        region: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }]
    }
  },
  mixins: [ tableHeight ],
  methods: {
    handleSizeChange() {
      console.log('submit!');
    },
    handleCurrentChange() {
      console.log('submit!');
    },
    handleReset() {
      console.log('submit!');
    },
    handleSearch() {
      // console.log('submit!');searchForm
      // this.$refs['searchForm'].resetFields();
      /*this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });*/
    }
  },
  mounted() {
  },
  beforeDestroy() {
  }
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
