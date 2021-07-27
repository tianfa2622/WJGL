<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>报表</el-breadcrumb-item>
          <el-breadcrumb-item>文件报表</el-breadcrumb-item>
          <el-breadcrumb-item>政协提案一览表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div class="condition">
          <div class="condition-col">
            活动时间:
            <el-date-picker v-model="activityTime" type="daterange" value-format="yyyy/MM/dd" format="yyyy/MM/dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :clearable="false" :picker-options="{ firstDayOfWeek: 1 }" @change="GetHDTime"> </el-date-picker>
          </div>
          <div class="condition-col">报表标题:<el-input v-model="conditionInputs.bbbt" style="width:350px" placeholder="请输入内容" clearable> </el-input></div>
          <div class="condition-col">
            排序方式:<el-select v-model="conditionInputs.sort" clearable placeholder="请选择">
              <el-option v-for="item in pxfsSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <div class="condition-col">
            <el-button @click="search(conditionInputs)">查询</el-button>
            <el-button @click="exportExcel">导出Excel</el-button>
          </div>
        </div>
        <el-row type="flex" class="tableBox" justify="center">
          <el-col :span="20" class="tableTitlebox">
            <span class="tableLabel">{{ tableTitle }}</span>
          </el-col>
          <el-col :span="20">
            <el-table :data="tableData" border fit style="width: 100%;" height="700">
              <el-table-column type="index" label="序号" width="50" align="center" :resizable="false"></el-table-column>
              <el-table-column label="提案编号" prop="number" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="提案标题" prop="title" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="领衔委员" prop="leadingMember" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="主/分办单位" align="center" :resizable="false">
                <template slot-scope="scope">
                  <span>{{ scope.row.hostUnit }}/{{ scope.row.subUnit }}</span>
                </template>
              </el-table-column>
              <el-table-column label="会办单位" prop="organization" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="主办责任单位" prop="HostResponsibleUnit" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="会办责任单位" prop="WillHandleTheResponsibleUnit" :resizable="false" align="center"> </el-table-column>
              <el-table-column label="备注" :resizable="false" prop="remarks" align="center"> </el-table-column>
            </el-table>
          </el-col>
          <el-col v-if="tableData.length > 0" :span="22" style="text-align: center;">
            <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { searchAll } from '@/api/reportForm/fromFile/TheProposal'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      activityTime: null,
      conditionInputs: {
        bbbt: '',
        sort: 1,
        fileType: 8
      },
      tableData: [],
      pxfsSelect: [
        { label: '升序', value: 1 },
        { label: '降序', value: 2 }
      ],
      tableTitle: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    this.getThisWeek()
    this.conditionInputs.bbbt = this.InitialValue(this.conditionInputs.registerStartDate, this.conditionInputs.registerEndDate)
    this.tableTitle = this.conditionInputs.bbbt
    this.search()
  },
  methods: {
    // 默认选择本周显示
    getThisWeek() {
      this.activityTime = []
      const now = new Date()
      this.activityTime[0] = dayjs(now)
        .startOf('week')
        .day(1)
        .format('YYYY/MM/DD')
      this.activityTime[1] = dayjs(now)
        .endOf('week')
        .day(7)
        .format('YYYY/MM/DD')
      this.GetHDTime()
    },
    // 活动时间戳设置
    GetHDTime() {
      if (this.activityTime !== null) {
        this.conditionInputs.registerStartDate = this.activityTime[0]
        this.conditionInputs.registerEndDate = this.activityTime[1]
      } else {
        this.getThisWeek()
      }
    },
    // 标题初始值格式
    InitialValue(time1, time2) {
      const value = `政协提案一览表（${time1}-${time2}）`
      return value
    },
    // 查询按钮
    async search(data) {
      try {
        let day = {}
        const pageData = {}
        pageData.pageIndex = this.currentPage
        pageData.pageSize = this.pageSize
        if (data) {
          const input = this.InitialValue(this.conditionInputs.registerStartDate, this.conditionInputs.registerEndDate)
          if (this.conditionInputs.bbbt === input && this.conditionInputs.bbbt !== '') {
            this.tableTitle = this.conditionInputs.bbbt
          } else if (this.conditionInputs.bbbt === '') {
            this.tableTitle = input
            this.conditionInputs.bbbt = input
          } else {
            this.tableTitle = this.conditionInputs.bbbt
          }
          day.registerStartDate = data.registerStartDate
          day.registerEndDate = data.registerEndDate
          day.sort = data.sort
          day.fileType = data.fileType
        } else {
          this.getThisWeek()
          day = { ...this.conditionInputs }
          delete day.bbbt
        }
        day.registerStartDate = dayjs(day.registerStartDate).format('YYYY-MM-DD HH:mm:ss')
        day.registerEndDate = dayjs(day.registerEndDate).format('YYYY-MM-DD HH:mm:ss')
        const res = await searchAll({ ...day, ...pageData })
        if (res.code === 1) {
          if (res.data.length > 0) {
            res.data.forEach(e => {
              if (e.transactions !== null && e.transactions.length > 0) {
                e.HostResponsibleUnit = e.transactions[0].hostUnit
                e.WillHandleTheResponsibleUnit = e.transactions[0].toDoUnit
              }
            })
            this.total = res.count
          }
          this.tableData = res.data
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
      // this.exportToExcel()
      if (this.tableData.length > 0) {
        const startDate = dayjs(this.conditionInputs.registerStartDate).format('YYYY-MM-DD HH:mm:ss')
        const endDate = dayjs(this.conditionInputs.registerEndDate).format('YYYY-MM-DD HH:mm:ss')
        const url = '/apiB' + `/api/FileReport/proposalChartExcel?registerStartDate=${startDate}&registerEndDate=${endDate}&fileType=8`
        window.location.href = url
      } else {
        this.$message.error('数据为空，无法导出！')
      }
    },
    // excel 数据导出
    exportToExcel() {
      const tHeader = ['序号', '提案编号', '提案标题', '领衔委员', '主/分办委员', '会办单位', '主办责任部门', '会办部门', '备注']
      const filterVal = ['wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx']
      const title = this.conditionInputs.bbbt
      import('@/components/excel/Export2Excel').then(excel => {
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: title,
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    // 导出数据处理
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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
.condition {
  width: 100%;
  /* height: 50px; */
  line-height: 50px;
  margin-bottom: 10px;
}
.condition .el-input {
  width: 180px;
  margin: 0 5px 0 5px;
}
.condition-col {
  display: inline-block;
  margin: 0 5px 0 5px;
}
.condition .el-select {
  width: 180px;
  margin: 0 5px 0 5px;
}
.tableBox {
  margin-top: 30px;
  flex-wrap: wrap;
}
.tableLabel {
  font-size: 30px;
  font-weight: 700;
}
.tableTitlebox {
  text-align: center;
  margin-bottom: 20px;
}
</style>
