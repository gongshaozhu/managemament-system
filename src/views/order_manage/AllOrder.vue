<template>
  <div class="wrapper">
    <div class="search-form">
      <el-form :inline="true" ref="searchForm" :model="searchData" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="searchData.keyword" clearable placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品类目">
          <el-select v-model="searchData.productCategoryId" clearable placeholder="商品类目">
            <el-option v-for="v in goodsCategory" :key="v.name" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="loading" type="primary" @click="handleSearch">查询</el-button>
          <el-button :disabled="loading" type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
<!--    <div class="tabs" style="margin-bottom: 10px;">
      <el-radio-group v-model="tab" :disabled="loading" @input="handleTab">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="dianjin">点金课程</el-radio-button>
      </el-radio-group>
    </div>-->
    <div class="table-content">
      <el-table
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
          prop="name"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="price"
          label="金额(￥)">
        </el-table-column>
        <el-table-column
          prop="publishStatus"
          label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.publishStatus === 0 ? '下架' : '上架' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createBy"
          label="销售">
        </el-table-column>
<!--        <el-table-column
          prop="address"
          label="浏览人数">
        </el-table-column>
        <el-table-column
          prop="address"
          label="支付人数">
        </el-table-column>-->
        <el-table-column
          prop="address"
          fixed="right"
          width="130"
          label="操作">
          <template slot-scope="scope">
<!--            <el-popconfirm
              title="确定删除吗？"
              @confirm="handleDel(scope.row)"
            >
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
            <el-divider direction="vertical"></el-divider>-->
            <el-button type="text" @click="handleLink(scope.row)">专属链接</el-button>
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
    <el-dialog
      title="专属链接"
      :visible.sync="dialogVisible"
      width="800px"
      :destroy-on-close="true"
      @close="handleClose">
      <div class="qr-content">
        <div class="qrcode">
          <canvas ref="canvas" id="canvas"></canvas>
          <div>
            <el-input style="width: 250px" v-model="link" disabled></el-input>
            <span>
              <button
                id="clip1"
                :data-clipboard-text="link"
                @click="handleClip"
              >复制</button>
            </span>
          </div>
        </div>
        <div></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tableHeight from '@/mixins/tableHeight'
import QRCode from 'qrcode'
import ClipboardJS from 'clipboard'
export default {
  name: 'SaleGoods',
  data() {
    return {
      tab: 'all',
      dialogVisible: false,
      goodsCategory: [{
        name: '全部',
        id: '',
      }],
      link: null,
      searchData: {
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        productCategoryId: '',
      },
      tableData: [],
      currentPage: 1,
      loading: false,
      total: 0,
    }
  },
  mixins: [tableHeight],
  async mounted() {
    this.handleList()
    const res = await this.$api.order.productCategory({
      pageNum: 1,
      pageSize: 10000,
    })
    this.goodsCategory = [...this.goodsCategory, ...res.list]
  },
  methods: {
    handleSearch() {
      this.handleList()
    },
    async handleList() {
      try {
        if (this.loading) return
        this.loading = true
        const res = await this.$api.order.goodsList(this.searchData)
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
        keyword: '',
        productCategoryId: '',
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
    async handleLink(v) {
      try {
        this.dialogVisible = true
        const timer = setTimeout(() => {

          clearTimeout(timer)
        }, 400)
        const res = await this.$api.order.createLink({
          productId: v.id
        })
        this.link = res
        this.$nextTick(() => {
          QRCode.toCanvas(document.getElementById('canvas'), this.link, {
            width: 300,
            height: 300,
            margin: 0,
          }, (error) => {
            if (error) console.error(error)
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    /*async handleDel (v) {
      try {
        const res = await this.$api.order.deleteStatus({
          ids : [v.id],
          deleteStatus  : 1,
        })
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
        this.handleSearch()
      } catch (e) {
        console.log(e)
      }
    },*/
    handleClip () {
      const clipboard = new ClipboardJS('#clip1');
      clipboard.on('success', (e) => {
        this.$message({
          message: '复制成功！',
          type: 'success'
        })
        e.clearSelection()
        clipboard.destroy();
      })
      clipboard.on('error', () => {
        this.$message({
          message: '复制失败！',
          type: 'error'
        })
        clipboard.destroy();
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
  },
  beforeDestroy() {
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  .pg {
    padding: 16px 0;
    display: flex;
    justify-content: flex-end;
  }
  .qrcode {
    height: 300px;
    > div {
      margin-top: 10px;
      width: 300px
    }
  }
  #clip1 {
    cursor: pointer;
    color: #409EFF;
    margin-left: 10px;
    border: none;
    outline: none;
    background-color: transparent;
  }
  .qr-content{
    display: flex;
    flex-direction: column;
    >div {
      flex-direction: column;
      flex: 1;
      justify-content: center;
      display: flex;
      align-items: center;
    }
  }
}
</style>
