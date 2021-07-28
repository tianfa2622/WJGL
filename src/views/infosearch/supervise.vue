<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>信息查询</el-breadcrumb-item>
          <el-breadcrumb-item>督办件</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align: center">
          <span>督办件</span>
        </div>
        <div class="condition">
          <el-form ref="ruleForm" :model="ruleForm" label-width="125px" class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="文件类型：">
                  <el-radio-group v-model="fileType" @change="hangChangeFileType">
                    <el-radio :label="6" border>上级督办件</el-radio>
                    <el-radio :label="7" border>厅批督办件</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="fileType === 6" justify="space-between">
              <topSupervision :bloptions="bloptions" :rule-form.sync="ruleForm" :p-s-roptions="PSRoptions" :options="options" />
            </el-row>
            <el-row v-show="fileType === 7" justify="space-between">
              <hallSupervision :bloptions="bloptions" :p-s-roptions="PSRoptions" :rule-form.sync="ruleForm" :options="options" />
            </el-row>
          </el-form>

          <el-row>
            <el-col :span="12" style="line-height: 50px">
              排序方式：
              <el-radio-group v-model="radio" @change="selectRadio">
                <el-radio :label="1">厅领导</el-radio>
                <el-radio :label="2">批示时间</el-radio>
                <el-radio :label="3">流水号</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="12" style="text-align: right">
              <el-button plain @click="search(ruleForm)">查询</el-button>
              <el-button plain @click="exportExcel">导出excel</el-button>
            </el-col>
          </el-row>
        </div>
        <el-table :data="tableData" border style="width: 100%" height="500">
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
          <el-table-column label="督办号" prop="supervisionNum" width="150px" align="center"> </el-table-column>
          <el-table-column label="收文时间" prop="receivingTime" align="center" width="150px"> </el-table-column>
          <el-table-column label="文号" width="150px" prop="documentNum" align="center"> </el-table-column>
          <el-table-column label="来文单位" prop="unit" width="150px" align="center"> </el-table-column>
          <el-table-column label="来文内容" prop="content" align="center"> </el-table-column>
          <el-table-column width="150px" label="要求办结时间" prop="completionTime" align="center"> </el-table-column>
          <el-table-column label="登记人" width="150px" prop="registrant" align="center"> </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import topSupervision from './supervise_searchData/topSupervision.vue'
import hallSupervision from './supervise_searchData/hallSupervision.vue'
import { searchAll, getDicGroupBy, createExcel } from '@/api/infosearch/supervise/supervise'
import exportFile from '@/utils/exportFile'
export default {
  components: { topSupervision, hallSupervision },
  data() {
    return {
      fileType: 6,
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
      ruleForm: { fileType: 6, sortOrder: 3 },
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
      total: 20
    }
  },
  created() {
    this.search()
    this.getLdList()
  },
  methods: {
    // 更改搜索条件时
    hangChangeFileType() {
      this.ruleForm = {}
      this.ruleForm.fileType = this.fileType
      this.ruleForm.sortOrder = 3
      this.search()
    },
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
          res.data.forEach(e => {
            if (e.supervisionNum_1 && e.supervisionNum_2) {
              e.supervisionNum = `湘公督办 [ ${e.supervisionNum_1} ] ${e.supervisionNum_2} 号`
            } else {
              e.supervisionNum = '暂无数据'
            }
            e.fileType = parseInt(e.fileType)
          })
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
      let title = ''
      this.wj_Type.forEach(e => {
        if (e.value === this.ruleForm.fileType) {
          title = e.label
        }
      })
      const res = await createExcel({ fileType: this.ruleForm.fileType })
      exportFile.getExcel(res, title)
    },
    // 根据文件类型跳转到详情页
    tableView(row) {
      switch (row.fileType) {
        case 6:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ name: 'topSupervision', params: { serialNum: row.serialNum } })
          break
        case 7:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ name: 'hallSupervision', params: { serialNum: row.serialNum } })
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
