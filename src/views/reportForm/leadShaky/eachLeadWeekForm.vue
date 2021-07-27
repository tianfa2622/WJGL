<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item>报表</el-breadcrumb-item> -->
          <el-breadcrumb-item>领导活动</el-breadcrumb-item>
          <el-breadcrumb-item>每个厅领导每周行程表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div class="condition">
          <div class="condition-col">
            厅领导:<el-select v-model="conditionInputs.leadership_name" clearable placeholder="请选择">
              <el-option v-for="item in tldSelect" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </div>
          <div class="condition-col">活动时间:<el-date-picker v-model="activityTime" type="week" style="width:250px" :picker-options="{ firstDayOfWeek: 1 }" :format="startDate + ' —— ' + endDate" placeholder="选择周" @change="changeDate"> </el-date-picker></div>
          <div class="condition-col">报表标题:<el-input v-model="bbbt" style="width:300px" placeholder="请输入内容" clearable> </el-input></div>
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
            <el-table :data="tableData" border fit style="width:100%;" height="700" :span-method="objectSpanMethod">
              <el-table-column label="" prop="dateDay" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="" prop="date_duan" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="时间" prop="dateHour" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="地点" prop="site" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="内容" prop="context" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="联系单位" prop="company" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="联系人" prop="phone_name" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="联系电话" prop="phone" align="center" :resizable="false"> </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { searchAll, getDicGroupBy } from '@/api/reportForm/leadShaky/eachLeadWeekForm'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      tableData: [],
      tldSelect: [],
      activityTime: null,
      bbbt: null,

      conditionInputs: {
        leadership_name: 1,
        start_date: '',
        end_date: ''
      },
      startDate: null,
      endDate: null,
      tableTitle: '',
      position: 0,
      rowSpanArr: [],
      state: false
    }
  },
  created() {
    this.getCurrentWeek()
    this.GetLeadershipData()
    this.search()
  },
  methods: {
    // 获取领导数据
    async GetLeadershipData() {
      const str1 = this.startDate.split('-')
      const str2 = this.endDate.split('-')
      const res = await getDicGroupBy()
      if (res.code === 1) {
        this.tldSelect = res.data
        this.bbbt = `${res.data[0].name}同志${str1[1]}月${str1[2]}日-${str2[1]}月${str2[2]}日活动安排`
        this.tableTitle = this.bbbt
      } else {
        this.$message('获取领导数据失败')
        this.bbbt = `XXX同志${str1[1]}月${str1[2]}日-${str2[1]}月${str2[2]}日活动安排`
        this.tableTitle = this.bbbt
        this.conditionInputs.leadership_name = 'XXX'
      }
    },
    // 查询按钮
    async search(data) {
      try {
        let searchData = {}
        if (data) {
          const str1 = this.startDate.split('-')
          const str2 = this.endDate.split('-')
          let name = ''
          this.tldSelect.forEach(e => {
            if (e.id === data.leadership_name) return (name = e.name)
          })
          const str = `${name}同志${str1[1]}月${str1[2]}日-${str2[1]}月${str2[2]}日活动安排`
          if (this.bbbt === str) {
            this.tableTitle = this.bbbt
          } else if (this.bbbt === '') {
            this.bbbt = str
            this.tableTitle = this.bbbt
          } else {
            this.tableTitle = this.bbbt
          }
          searchData = { ...data }
        } else {
          searchData.leadership_name = 1
          searchData.start_date = this.startDate
          searchData.end_date = this.endDate
        }
        const res = await searchAll({ ...searchData })
        if (res.code === 1) {
          this.tableData = res.data
          this.getRowSpan()
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
    // 处理选择周组件的显示内容
    changeDate() {
      this.startDate = dayjs(this.activityTime)
        .startOf('week')
        .day(1)
        .format('YYYY-MM-DD')
      this.endDate = dayjs(this.activityTime)
        .endOf('week')
        .day(7)
        .format('YYYY-MM-DD')
      this.conditionInputs.start_date = this.startDate
      this.conditionInputs.end_date = this.endDate
    },
    // 默认获取当前的周数
    getCurrentWeek() {
      const now = new Date()
      this.activityTime = now
      this.changeDate()
    },
    // 导出按钮
    exportExcel() {
      // this.exportToExcel()
      const url = '/apiB' + `/api/bbldhd/excelQueryOneWeek?leadership_name=${this.conditionInputs.leadership_name}&title=${this.tableTitle}&start_date=${this.startDate}&end_date=${this.endDate}`
      window.location.href = url
    },
    // excel 数据导出
    exportToExcel() {
      const tHeader = ['', '', '时间', '地点', '内容', '联系单位', '联系人', '联系电话']
      const filterVal = ['xq', 'sxw', 'sj', 'dd', 'nr', 'lxdw', 'lxr', 'lxdh']
      const title = this.bbbt
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
    },
    // 获取合并的数组
    getRowSpan() {
      this.rowSpanArr = []
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.rowSpanArr.push(1)
          this.position = 0
        } else {
          if (item.dateDay === this.tableData[index - 1].dateDay) {
            this.rowSpanArr[this.position] += 1 // 星期名称相同，合并到同个数组中
            this.rowSpanArr.push(0)
          } else {
            this.rowSpanArr.push(1)
            this.position = index
          }
        }
      })
    },
    // 表格合并列
    // eslint-disable-next-line no-unused-vars
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column)
      // 只合并星期位置
      if (columnIndex === 0) {
        const _row = this.rowSpanArr[rowIndex]
        return {
          rowspan: _row, // 行
          colspan: 1 // 列
        }
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
