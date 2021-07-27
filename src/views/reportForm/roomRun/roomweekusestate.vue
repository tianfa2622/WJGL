<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item>报表</el-breadcrumb-item> -->
          <el-breadcrumb-item>会议室管理</el-breadcrumb-item>
          <el-breadcrumb-item>会议一周使用情况表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div class="condition">
          <div class="condition-col">
            会议地点:<el-select v-model="conditionInputs.site" clearable placeholder="请选择">
              <el-option v-for="item in Onelist" :key="item.site" :label="item.site" :value="item.site"> </el-option>
            </el-select>
          </div>
          <div class="condition-col">活动时间:<el-date-picker v-model="activityTime" type="week" style="width:250px" :picker-options="{ firstDayOfWeek: 1 }" :format="startDate + ' 至 ' + endDate" placeholder="选择周" @change="changeDate"> </el-date-picker></div>
          <div class="condition-col">报表标题:<el-input v-model="conditionInputs.bbbt" style="width:350px" placeholder="请输入内容" clearable> </el-input></div>
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
            <el-table :data="tableData" border fit style="width: 100%;" height="700" :span-method="objectSpanMethod">
              <el-table-column label="" prop="userName" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="" prop="date_duan" align="center" :resizable="false"> </el-table-column>
              <el-table-column :label="weekAry[0].xq + '(' + weekAry[0].rq + ')'" prop="Monday" align="center" :resizable="false"> </el-table-column>
              <el-table-column :label="weekAry[1].xq + '(' + weekAry[1].rq + ')'" prop="Tuesday" align="center" :resizable="false"> </el-table-column>
              <el-table-column :label="weekAry[2].xq + '(' + weekAry[2].rq + ')'" prop="Wednesday" align="center" :resizable="false"> </el-table-column>
              <el-table-column :label="weekAry[3].xq + '(' + weekAry[3].rq + ')'" prop="Thursday" align="center" :resizable="false"> </el-table-column>
              <el-table-column :label="weekAry[4].xq + '(' + weekAry[4].rq + ')'" prop="Friday" align="center" :resizable="false"> </el-table-column>
              <el-table-column :label="weekAry[5].xq + '(' + weekAry[5].rq + ')'" prop="Saturday" align="center" :resizable="false"> </el-table-column>
              <el-table-column :label="weekAry[6].xq + '(' + weekAry[6].rq + ')'" prop="Sunday" align="center" :resizable="false"> </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
// eslint-disable-next-line no-unused-vars
import { searchAll, searchOneDirectory, createExcel } from '@/api/reportForm/roomRun/roomweekusestate'
export default {
  data() {
    return {
      tableData: [],
      hyddSelect: [
        { label: '省委', value: '省委' },
        { label: '省厅', value: '省厅' }
      ],
      activityTime: null,
      startDate: null,
      endDate: null,
      weekAry: null,
      conditionInputs: {
        site: '省政府',
        bbbt: '',
        start_date: '',
        end_date: ''
      },
      tableTitle: '',
      position: 0,
      rowSpanArr: [],
      Onelist: []
    }
  },
  created() {
    this.getCurrentWeek()
    const weekAry = this.getWeekAry(this.activityTime)
    this.weekAry = weekAry
    this.getDirectory()
    this.conditionInputs.bbbt = this.InitialValue(this.startDate, this.endDate)
    this.tableTitle = this.conditionInputs.bbbt
    this.search()
  },
  methods: {
    // 获取会议地点数据
    async getDirectory() {
      const res = await searchOneDirectory()
      if (res.code === 1) {
        this.Onelist = res.data
      } else {
        this.$message('获取会议地点数据失败！')
      }
    },
    // 处理选择周组件的显示内容
    changeDate() {
      if (this.activityTime !== null) {
        this.startDate = dayjs(this.activityTime)
          .startOf('week')
          .day(1)
          .format('YYYY/MM/DD')
        this.endDate = dayjs(this.activityTime)
          .endOf('week')
          .day(7)
          .format('YYYY/MM/DD')
        this.getWeekAry(this.activityTime)
        this.conditionInputs.bbbt = this.InitialValue(this.startDate, this.endDate)
        this.conditionInputs.start_date = dayjs(this.startDate).format('YYYY-MM-DD')
        this.conditionInputs.end_date = dayjs(this.endDate).format('YYYY-MM-DD')
      } else {
        this.getCurrentWeek()
      }
    },
    // 默认获取当前的周数
    getCurrentWeek() {
      const now = new Date()
      this.activityTime = now
      this.changeDate()
    },
    //  获取当前选中日期的所有日期
    getWeekAry(datestr) {
      const date = new Date(datestr)
      let weeknum = date.getDay() // 返回一周某一天的数字
      if (weeknum === 0) {
        weeknum = 7
      }
      weeknum--
      const weekAry = []
      for (let i = -weeknum; i < 7 - weeknum; i++) {
        weekAry.push({ rq: dayjs(new Date(this.getWeek(i, date))).format('MM.DD'), xq: dayjs(new Date(this.getWeek(i, date))).format('d') })
      }
      weekAry.forEach(e => {
        switch (e.xq) {
          case '1':
            return (e.xq = '星期一')
          case '2':
            return (e.xq = '星期二')
          case '3':
            return (e.xq = '星期三')
          case '4':
            return (e.xq = '星期四')
          case '5':
            return (e.xq = '星期五')
          case '6':
            return (e.xq = '星期六')
          case '0':
            return (e.xq = '星期天')
        }
      })
      return weekAry
    },
    // 截取对应时间
    getWeek(i, date) {
      const ms = i * (1000 * 60 * 60 * 24)
      const newDate = new Date(date.getTime() + ms)
      return newDate
    },
    // 标题初始值格式
    InitialValue(time1, time2) {
      const str1 = dayjs(time1).format('MM.DD')
      const str2 = dayjs(time2).format('MM.DD')
      const value = `会议室一周使用表 (${str1}-${str2})`
      return value
    },
    // 查询按钮
    async search(data) {
      try {
        let day = {}
        if (data) {
          const input = this.InitialValue(this.startDate, this.endDate)
          if (this.conditionInputs.bbbt === input && this.conditionInputs.bbbt !== '') {
            this.tableTitle = this.conditionInputs.bbbt
          } else if (this.conditionInputs.bbbt === '') {
            this.tableTitle = input
            this.conditionInputs.bbbt = input
          } else {
            this.tableTitle = this.conditionInputs.bbbt
          }
          day.start_date = data.start_date
          day.end_date = data.end_date
          day.site = data.site
        } else {
          this.getCurrentWeek()
          day = { ...this.conditionInputs }
          delete day.bbbt
        }
        const res = await searchAll({ ...day })
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
      this.weekAry = this.getWeekAry(this.activityTime)
    },
    // 导出按钮
    exportExcel() {
      // this.exportToExcel()
      const startDate = this.conditionInputs.start_date
      const endDate = this.conditionInputs.end_date
      const url = '/apiB' + `/api/bbldhd/excelQueryAllWeekActivitySite?start_date=${startDate}&end_date=${endDate}&title=${this.tableTitle}&site=${this.conditionInputs.site}`
      window.location.href = url
    },
    // excel 数据导出
    exportToExcel() {
      const tHeader = ['', '']
      for (let i = 0; i < this.weekAry.length; i++) {
        tHeader.push(this.weekAry[i].xq + '(' + this.weekAry[i].rq + ')')
      }
      const filterVal = ['hydd', 'sxw', 'xq1', 'xq2', 'xq3', 'xq4', 'xq5', 'xq6', 'xq7']
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
    },
    // 获取合并的数组
    getRowSpan() {
      this.rowSpanArr = []
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.rowSpanArr.push(1)
          this.position = 0
        } else {
          if (item.userName === this.tableData[index - 1].userName) {
            this.rowSpanArr[this.position] += 1 // 领导名称相同，合并到同个数组中
            this.rowSpanArr.push(0)
          } else {
            this.rowSpanArr.push(1)
            this.position = index
          }
        }
      })
    },
    // 表格合并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column)
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
  height: 50px;
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
