<template>
  <div class="Log_content">
    <el-row type="flex" justify="space-around">
      <el-col :span="12">
        <el-form :model="form" inline>
          <el-form-item label="">
            <el-input v-model="form.str" style="width:300px" placeholder="请输入账号或操作内容进行查询"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" style="text-align:end;">
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="rz" label="序号" width="80"> </el-table-column>
          <el-table-column prop="rz" label="账号"> </el-table-column>
          <el-table-column prop="rz" label="机构名称"> </el-table-column>
          <el-table-column prop="rz" label="IP地址"> </el-table-column>
          <el-table-column prop="rz" label="操作内容"> </el-table-column>
          <el-table-column prop="rz" label="操作时间"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="mt-20">
      <el-pagination :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        str: null
      },
      tableData: [
        {
          rz: '111'
        }
      ],
      currentPage: 4
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style>
.Log_content {
  height: 100%;
  width: 100%;
  margin-top: 20px;
}
.mt-20 {
  margin-top: 20px;
}
</style>
