<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>信息查询</el-breadcrumb-item>
          <el-breadcrumb-item>提案建议</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center;">
          <span>提案建议</span>
        </div>
        <div class="condition">
          <el-form ref="ruleForm" :model="ruleForm" label-width="125px" class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="文件类型：">
                  <el-radio-group v-model="ruleForm.fileType" @change="search()">
                    <el-radio :label="8" border>政协提案</el-radio>
                    <el-radio :label="9" border>人大提案</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="ruleForm.fileType === 8" justify="space-between">
              <Plan :bloptions="bloptions" :rule-form.sync="ruleForm" :p-s-roptions="PSRoptions" :options="options" />
            </el-row>

            <el-row v-if="ruleForm.fileType === 9" justify="space-between">
              <Propose :bloptions="bloptions" :rule-form.sync="ruleForm" :p-s-roptions="PSRoptions" :options="options" />
            </el-row>
          </el-form>
          <el-row type="flex" justify="space-between">
            <el-col :span="12" style="line-height: 50px;">
              排序方式：
              <el-radio-group v-model="radio" @change="selectRadio">
                <el-radio :label="1">厅领导</el-radio>
                <el-radio :label="2">批示时间</el-radio>
                <el-radio :label="3">流水号</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="8">
              <el-row type="flex" justify="center">
                <el-col :span="4">
                  <el-button plain @click="search(ruleForm)">查询</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button plain @click="exportExcel">导出excel</el-button>
                </el-col>
                <el-col :span="6">
                  <el-upload ref="upload" action="" :on-change="handleChange" :on-remove="handleRemove" :show-file-list="false" :on-exceed="handleExceed" :limit="1" accept="" :auto-upload="false">
                    <el-button plain>导入excel</el-button>
                  </el-upload>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <el-table :data="tableData" border style="width: 100%;" height="500">
          <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
          <el-table-column label="文件类型" prop="fileType" :resizable="false" align="center">
            <template slot-scope="scope">
              <template v-for="wjlx in wj_Type">
                <span v-if="scope.row.fileType === wjlx.value" :key="wjlx.value">{{ wjlx.label }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="流水号" width="150px" align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row)">{{ scope.row.serialNum }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="编号" width="150px" align="center"> </el-table-column>
          <el-table-column label="交办时间" prop="assignmentTime" width="150px" align="center"> </el-table-column>
          <el-table-column label="标题" prop="title" align="center"> </el-table-column>
          <el-table-column label="来文单位" prop="documentUnit" align="center"> </el-table-column>
          <el-table-column label="备注" prop="remarks" width="150px" align="center"> </el-table-column>
          <el-table-column label="要求办结时间" prop="completionTime" width="150px" align="center"> </el-table-column>
          <el-table-column label="登记人" prop="registrant" align="center" width="150px"> </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import Plan from './advise_searchData/plan.vue'
import Propose from './advise_searchData/propose_search.vue'
import { searchAll, getDicGroupBy, createExcel } from '@/api/infosearch/advise/advise'
export default {
  components: { Plan, Propose },
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
      ruleForm: { sortOrder: 3, fileType: 8 },
      checkList: [],
      options: [],
      PSRoptions: [],
      bloptions: [
        { label: '已办结', value: true },
        { label: '未办结', value: false }
      ],
      radio: 3,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 20,
      fileData: [],
      outputs: []
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
          paramsData = { ...data }
        } else {
          paramsData = { ...this.ruleForm }
        }
        pageData.pageIndex = this.currentPage
        pageData.pageSize = this.pageSize
        const res = await searchAll({ ...pageData, ...paramsData })
        if (res.code === 1) {
          res.data.fileType = parseInt(res.data.fileType)
          this.tableData = res.data
          this.total = res.count
          paramsData = {}
          if (data) {
            this.$message.success(res.message)
          }
        }
      } catch (error) {
        console.log(error)
      }
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
    selectRadio() {
      this.ruleForm.sortOrder = this.radio
      this.search()
    },
    // 导出按钮
    async exportExcel() {
      // this.exportToExcel()
      const res = await createExcel({ fileType: this.ruleForm.fileType })
      console.log(res)
    },
    // excel 数据导出
    exportToExcel() {
      const tHeader = ['序号', '文件类型', '流水号', '督办号', '收文时间', '文号', '来文单位', '来文内容', '要求办结时间', '登记人']
      const filterVal = ['wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx']
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
      switch (row.fileType) {
        case 8:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ name: 'plan', params: { serialNum: row } })
          break
        case 9:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ name: 'propose', params: { serialNum: row } })
          break
      }
    },
    // 导入
    // 上传文件时处理方法
    // eslint-disable-next-line no-unused-vars
    handleChange(file, fileList) {
      console.log(file, fileList)
      this.fileData = file // 保存当前选择文件
      console.log(this.XLSX)
      this.readExcel() // 调用读取数据的方法
    },
    // 读取数据
    readExcel(e) {
      console.log(e)
      const that = this
      const files = that.fileData
      if (!files) {
        // 如果没有文件
        this.$message.info('请上传文件！')
        return false
      } else if (!/\.(xls|xlsx)$/.test(files.name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = ev => {
        try {
          const data = ev.target.result
          const workbook = this.XLSX.read(data, {
            type: 'binary'
          })
          if (workbook.SheetNames.length >= 1) {
            this.$message({
              message: '导入数据表成功',
              showClose: true,
              type: 'success'
            })
          }
          const wsname = workbook.SheetNames[0] // 取第一张表
          const ws = this.XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
          that.outputs = [] // 清空接收数据
          for (let i = 0; i < ws.length; i++) {
            // 健名为绑定 el 表格的关键字，值则是ws[i][对应表头名]
            const sheetData = {
              cid: ws[i]['序号'],
              username: ws[i]['姓名'],
              areanumber: ws[i]['行政区划代码'],
              types: ws[i]['巡逻人员类别'],
              number: ws[i]['编号'],
              phone: ws[i]['联系电话'],
              titleLevel: ws[i]['职称级别'],
              sex: ws[i]['性别'],
              experience: ws[i]['专业、经验能力'],
              report: ws[i]['是否上报']
            }
            that.tableData.tableList.unshift(sheetData)
          }
          this.$refs.Elsearch.$refs.upload.value = ''
          this.fileData = []
        } catch (error) {
          return false
        }
      }
      // 如果为原生 input 则应是 files[0]
      fileReader.readAsBinaryString(files.raw)
    },
    // 移除文件的操作方法
    // eslint-disable-next-line no-unused-vars
    handleRemove(file, fileList) {
      this.fileData = null
    },
    // 超出最大上传文件数量时的处理方法
    handleExceed() {
      this.$message({
        type: 'warning',
        message: '超出最大上传文件数量的限制！'
      })
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
