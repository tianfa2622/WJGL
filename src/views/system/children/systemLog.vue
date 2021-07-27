<template>
  <div class="Log_content">
    <el-row type="flex" justify="space-around">
      <el-col :span="12">
        <el-form :model="form" inline>
          <el-form-item label="">
            <el-input v-model="form.keyword" style="width:300px" placeholder="请输入账号或操作内容进行查询"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" style="text-align:end;">
        <el-button type="primary" @click="search(form)">查询</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-table :data="tableData" border style="width: 100%" height="500">
          <el-table-column prop="id" label="序号" width="80"> </el-table-column>
          <el-table-column prop="account" label="账号"> </el-table-column>
          <el-table-column prop="organization" label="机构名称"> </el-table-column>
          <el-table-column prop="ipAddr" label="IP地址"> </el-table-column>
          <el-table-column prop="operation" label="操作内容"> </el-table-column>
          <el-table-column prop="createTime" label="操作时间"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="mt-20">
      <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { searchAll } from '@/api/system/systemLog'
export default {
  data() {
    return {
      form: {
        keyword: null
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
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
        this.tableData = res.data.records
        this.total = res.data.total
        console.log(res)
      }
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
.Log_content {
  height: 100%;
  width: 100%;
  margin-top: 20px;
}
.mt-20 {
  margin-top: 20px;
}
</style>
