<template>
  <div>
    <el-dialog :visible.sync="LogVisible" width="60%" :show-close="false" :close-on-click-modal="false" :destroy-on-close="true" @close="close">
      <div slot="title">
        <el-row type="flex" justify="space-around">
          <el-col :span="8">
            <el-input v-model="keyword" style="width:100%" placeholder="请输入账号或操作内容进行查询" clearable />
          </el-col>
          <el-col :span="8" style="text-align: end;">
            <el-button type="primary" @click="search(keyword)">查询</el-button>
            <el-button type="primary" @click="close">关闭</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <Table :data="tableData" />
      </div>
      <div class="Pagin">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Table from './Table/tablein'
import { searchAll } from '@/api/system/systemLog'
export default {
  components: {
    Table
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['isShow'],
  data() {
    return {
      keyword: null, // 输入框数据
      LogVisible: false, // 弹出层控制显示
      currentPage: 1, // 当前页
      pageSize: 10,
      total: 0,
      // 表格数据
      tableData: {
        tableHeader: [
          {
            label: '序号',
            prop: 'id',
            width: 50
          },
          {
            label: '账号',
            prop: 'account'
            // width: 50
          },
          {
            label: '机构名称',
            prop: 'organization'
            // width: 80
          },
          {
            label: 'IP地址',
            prop: 'ipAddr'
            // width: 80
          },
          {
            label: '操作步骤',
            prop: 'operation'
            // width: 80
          },
          {
            label: '变更前',
            prop: 'beforeChange'
            // width: 80
          },
          {
            label: '变更后',
            prop: 'afterChange'
            // width: 100
          },
          {
            label: '操作时间',
            prop: 'createTime'
            // width: 50
          }
        ],
        tableList: []
      }
    }
  },
  watch: {
    isShow() {
      this.LogVisible = this.isShow
    }
  },
  created() {
    this.search()
  },
  methods: {
    async search(data) {
      if (data) {
        this.currentPage = 1
      }
      const pageDate = {}
      pageDate.current = this.currentPage
      pageDate.size = this.pageSize
      const res = await searchAll({ ...data, ...pageDate })
      if (res.code === 1) {
        res.data.records.forEach(e => {
          if (!e.beforeChange && e.beforeChange === null) {
            e.beforeChange = '暂无更改'
          }
          if (!e.afterChange && e.afterChange === null) {
            e.afterChange = '暂无更改'
          }
        })
        this.tableData.tableList = res.data.records
        this.total = res.data.total
        console.log(res)
      }
    },
    // 关闭按钮
    close() {
      this.LogVisible = false
      this.keyword = null
      this.$emit('SetClose', this.LogVisible)
    },
    // 切换每页条数
    handleSizeChange(val) {
      this.pageSize = val
      this.search()
    },
    // 切换当前页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.search()
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  /* height: 100%; */
}
.Pagin {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
</style>
