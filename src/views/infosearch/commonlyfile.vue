<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>信息查询</el-breadcrumb-item>
          <el-breadcrumb-item>一般文件</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center;">
          <span>一般文件</span>
        </div>
        <div class="condition">
          <el-form ref="ruleForm" :model="ruleForm" label-width="125px" class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="文件类型：">
                  <el-radio-group v-model="file_type" @change="hangChangeFileType">
                    <el-radio :label="1" border>呈批件</el-radio>
                    <el-radio :label="2" border>上级来文</el-radio>
                    <el-radio :label="3" border>平级和下级来文</el-radio>
                    <el-radio :label="4" border>群众来信</el-radio>
                    <el-radio :label="5" border>其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="file_type === 1" justify="space-between">
              <instructions :rule-form.sync="ruleForm" :p-s-roptions="PSRoptions" />
            </el-row>
            <el-row v-else-if="file_type === 2" justify="space-between">
              <getfile :rule-form.sync="ruleForm" :p-s-roptions="PSRoptions" />
            </el-row>
            <el-row v-else-if="file_type === 3" justify="space-between">
              <level :rule-form.sync="ruleForm" :p-s-roptions="PSRoptions" />
            </el-row>
            <el-row v-else-if="file_type === 4" justify="space-between">
              <usermessage :rule-form.sync="ruleForm" :p-s-roptions="PSRoptions" />
            </el-row>
            <el-row v-else-if="file_type === 5" justify="space-between">
              <other :rule-form.sync="ruleForm" :p-s-roptions="PSRoptions" />
            </el-row>
          </el-form>
          <el-row>
            <el-col :span="12" style="line-height: 50px;">
              排序方式：
              <el-radio-group v-model="radio">
                <el-radio :label="1">厅领导</el-radio>
                <el-radio :label="2">批示时间</el-radio>
                <el-radio :label="3">流水号</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="12" style="text-align: right;">
              <el-button plain @click="search(ruleForm)">查询</el-button>
              <el-button plain @click="exportExcel">导出excel</el-button>
            </el-col>
          </el-row>
        </div>
        <el-table :data="tableData" border style="width: 100%;" height="500">
          <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
          <el-table-column label="文件类型" width="200" prop="file_type" :resizable="false" align="center">
            <template slot-scope="scope">
              <template v-for="wjlx in wj_Type">
                <span v-if="scope.row.file_type === wjlx.value" :key="wjlx.value">{{ wjlx.label }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="流水号" width="150px" align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row)">{{ scope.row.serial_num }}</el-link>
            </template>
          </el-table-column>
          <el-table-column v-if="file_type === 1" label="登记日期" prop="creat_date" width="150px" align="center"> </el-table-column>
          <el-table-column v-else-if="file_type !== 1 && file_type !== 4" label="收文时间" prop="finish_date" width="150px" align="center"> </el-table-column>
          <el-table-column v-else-if="file_type === 4" label="来信时间" prop="letter_time" width="150px" align="center"> </el-table-column>
          <el-table-column v-if="file_type !== 4" label="文号" prop="reference_num" width="150px" align="center"> </el-table-column>
          <el-table-column v-else label="来信人" prop="letter_name" width="150px" align="center"> </el-table-column>
          <el-table-column v-if="file_type === 1" label="送呈单位" prop="song_company" width="150px" align="center"> </el-table-column>
          <el-table-column v-else-if="file_type !== 1 && file_type !== 4" label="来文单位" prop="company" width="150px" align="center"> </el-table-column>
          <el-table-column v-else-if="file_type === 4" label="办理单位" prop="banli_company" width="150px" align="center"> </el-table-column>
          <el-table-column v-if="file_type !== 4" label="来文内容" prop="content" align="center"> </el-table-column>
          <el-table-column v-else label="来信内容" prop="letter_content" align="center"> </el-table-column>
          <el-table-column label="办理情况" prop="banli" width="150px" align="center"> </el-table-column>
          <el-table-column label="登记人" prop="registrant" width="150px" align="center"> </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import instructions from './searchDialog/instructions'
import getfile from './searchDialog/getfile.vue'
import level from './searchDialog/level.vue'
import usermessage from './searchDialog/usermessage.vue'
import other from './searchDialog/other.vue'
// eslint-disable-next-line no-unused-vars
import { searchAll, getDicGroupBy, createExcel } from '@/api/infosearch/commonlyfile/commonlyfile'
export default {
  components: { instructions, getfile, level, usermessage, other },
  data() {
    return {
      // 文件类型
      wj_Type: [
        { value: 1, label: '呈批件' },
        { value: 2, label: '上级来文' },
        { value: 3, label: '平级和下级来文' },
        { value: 4, label: '群众来信' },
        { value: 5, label: '其他' },
        { value: 6, label: '上级督办件' },
        { value: 7, label: '厅批督办件' },
        { value: 8, label: '政协提案' },
        { value: 9, label: '人大建议' }
      ],
      ruleForm: {
        file_type: 1,
        group_mode: 'serial_num'
      },
      file_type: 1,
      checkList: [],
      PSRoptions: [],
      options: [],
      radio: 3,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 20
    }
  },
  created() {
    this.search()
    this.getLdList()
  },
  methods: {
    // 搜索按钮
    async search(data) {
      try {
        const pageData = {}
        let paramsData = {}
        if (data) {
          this.currentPage = 1
          if (data.instructionsDate && data.instructionsDate.length > 0) {
            data.start_instructions_data = data.instructionsDate[0]
            data.end_instructions_data = data.instructionsDate[1]
          }
          if (data.conclude_data && data.conclude_data.length > 0) {
            data.start_conclude_data = data.conclude_data[0]
            data.end_conclude_data = data.conclude_data[1]
          }
          if (data.finish_date && data.finish_date.length > 0) {
            data.start_data = data.finish_date[0]
            data.end_data = data.finish_date[1]
          }
          delete data.instructionsDate
          delete data.conclude_data
          delete data.finish_date
          paramsData = { ...data }
        } else {
          paramsData = { ...this.ruleForm }
        }
        pageData.pageIndex = this.currentPage
        pageData.pageSize = this.pageSize
        const res = await searchAll({ ...pageData, ...paramsData })
        if (res.code === 1) {
          this.tableData = res.data.records
          this.total = res.data.total
          paramsData = {}
          if (data) {
            this.$message.success(res.message)
          }
        } else {
          this.$message.error(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 更改搜索条件时
    hangChangeFileType() {
      this.ruleForm = {}
      this.ruleForm.file_type = this.file_type
      this.ruleForm.group_mode = 'serial_num'
      this.search()
    },
    // 获取领导数据
    async getLdList() {
      const res = await getDicGroupBy()
      if (res.code === 1) {
        this.PSRoptions = res.data
      } else {
        this.$message('获取批示人数据失败')
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
    },
    // 导出按钮
    exportExcel() {
      this.exportToExcel()
    },
    // excel 数据导出
    exportToExcel() {
      const tHeader = ['序号', '文件类型', '流水号', '收文时间', '文号', '来文单位', '来文内容', '办理情况', '登记人']
      const filterVal = ['wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx']
      import('@/components/excel/Export2Excel').then(excel => {
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '一般文件列表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    // 导出数据处理
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 根据文件类型跳转到详情页
    tableView(row) {
      switch (row.file_type) {
        case 1:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ name: 'instructions', params: { row: row } })
          break
        case 2:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ name: 'getfile', params: { row: row } })
          break
        case 3:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ name: 'level', params: { row: row } })
          break
        case 4:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ name: 'usermessage', params: { row: row } })
          break
        case 5:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ name: 'other', params: { row: row } })
          break
        default:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ name: 'instructions', params: { row: row } })
          break
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
.container .navigation {
  margin-bottom: 10px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-bottom: 15px;
}
.Children {
  width: 70%;
  margin: 0 auto;
  margin-bottom: 15px;
}
.condition {
  font-size: 16px;
}
.el-checkbox {
  margin-right: 0;
}
.el-checkbox.is-bordered {
  padding: 9px 9px 9px 10px;
}
.el-checkbox-group {
  display: inline-block;
}
.el-input {
  width: 300px;
}
.el-row {
  margin: 0 0 10px 0;
}
.el-pagination {
  margin: 15px 0 0 0;
  text-align: center;
}
</style>
