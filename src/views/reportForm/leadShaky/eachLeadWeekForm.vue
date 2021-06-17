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
            厅领导:<el-select v-model="conditionInputs.tld" clearable placeholder="请选择">
              <el-option v-for="item in tldSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <div class="condition-col">活动时间:<el-date-picker v-model="activityTime" type="datetimerange" value-format="yyyy/MM/dd" format="yyyy/MM/dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="GetHDTime"> </el-date-picker></div>
          <div class="condition-col">报表标题:<el-input v-model="conditionInputs.bbbt" style="width:300px" placeholder="请输入内容" clearable> </el-input></div>
          <div class="condition-col">
            <el-button @click="search">查询</el-button>
            <el-button @click="exportExcel">导出Excel</el-button>
          </div>
        </div>
        <el-row type="flex" class="tableBox" justify="center">
          <el-col :span="20" class="tableTitlebox">
            <span class="tableLabel">{{ tableTitle }}</span>
          </el-col>
          <el-col :span="20">
            <el-table :data="tableData" border fit style="width: 100%;height:500px;" :span-method="objectSpanMethod">
              <el-table-column label="" prop="xq" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="" prop="sxw" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="时间" prop="sj" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="地点" prop="dd" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="内容" prop="nr" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="联系单位" prop="lxdw" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="联系人" prop="lxr" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="联系电话" prop="lxdh" align="center" :resizable="false"> </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          xq: '星期一(03.22)',
          sxw: '上午',
          sj: '1',
          dd: '1',
          nr: '1',
          lxdw: '1',
          lxr: '1',
          lxdh: '1'
        },
        {
          xq: '星期一(03.22)',
          sxw: '下午',
          sj: '1',
          dd: '1',
          nr: '1',
          lxdw: '1',
          lxr: '1',
          lxdh: '1'
        },
        {
          xq: '星期二(03.23)',
          sxw: '上午',
          sj: '1',
          dd: '1',
          nr: '1',
          lxdw: '1',
          lxr: '1',
          lxdh: '1'
        },
        {
          xq: '星期二(03.23)',
          sxw: '下午',
          sj: '1',
          dd: '1',
          nr: '1',
          lxdw: '1',
          lxr: '1',
          lxdh: '1'
        }
      ],
      tldSelect: [
        { label: '徐显辉', value: '徐显辉' },
        { label: '袁友方', value: '袁友方' }
      ],
      activityTime: [],
      conditionInputs: {
        tld: '徐显辉',
        bbbt: '',
        startTime: '',
        endTime: ''
      },
      hdsjSelect: [],
      tableTitle: '',
      position: 0,
      rowSpanArr: []
    }
  },
  created() {
    this.getWeekStartAndEnd()
    this.getRowSpan()
    this.tableTitle = this.InitialValue(this.conditionInputs.tld, this.activityTime)
    this.conditionInputs.bbbt = this.tableTitle
  },
  methods: {
    // 日期格式化
    formatDate(date) {
      const year = date.getFullYear() // 年
      let month = date.getMonth() + 1 // 月
      let day = date.getDate() // 日
      const seperator = '/' // 分隔符
      // 对月份进行处理，1-9月在前面添加一个“0”
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      // 对月份进行处理，1-9号在前面添加一个“0”
      if (day >= 1 && 10 <= 9) {
        day = '0' + day
      }
      // 拼接字符串
      const nowDate = year + seperator + month + seperator + day
      return nowDate
    },
    // 获取当前日期的一周的开始，结束时间
    getWeekStartAndEnd(val) {
      console.log(val)
      // let now = ''
      // if (val) {
      //   now = new Date() // 日期
      // } else {
      const now = new Date()
      // }
      const nowDayOfWeek = now.getDay() // 本周的第几天
      const nowDay = now.getDate() // 当前日
      const nowMonth = now.getMonth() // 当前月
      const nowYear = now.getFullYear() // 当前年
      const weekStart = this.getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek)

      const weekEnd = this.getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek)

      this.activityTime[0] = weekStart
      this.activityTime[1] = weekEnd

      console.log(this.activityTime)
    },
    // 获得某一周的开始日期
    getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {
      const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
      return this.formatDate(weekStartDate)
    },
    // 获得某一周的结束日期
    getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {
      const weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek))
      return this.formatDate(weekEndDate)
    },
    // 标题初始值格式
    InitialValue(name, time) {
      const str1 = time[0].split('/')
      const str2 = time[1].split('/')
      const value = `${name}同志${str1[1]}月${str1[2]}日-${str2[1]}月${str2[2]}日活动安排`
      return value
    },
    // 活动时间戳设置
    GetHDTime() {
      if (this.activityTime !== null) {
        this.conditionInputs.startTime = this.activityTime[0]
        this.conditionInputs.endTime = this.activityTime[1]
      }
    },
    // 查询按钮
    search() {
      this.conditionInputs.bbbt = this.InitialValue(this.conditionInputs.tld, this.activityTime)
      if (this.conditionInputs.bbbt !== this.tableTitle && this.conditionInputs.bbbt !== '') {
        this.tableTitle = this.conditionInputs.bbbt
      }
    },
    // 导出按钮
    exportExcel() {
      this.exportToExcel()
    },
    // excel 数据导出
    exportToExcel() {
      const tHeader = ['', '', '时间', '地点', '内容', '联系单位', '联系人', '联系电话']
      const filterVal = ['xq', 'sxw', 'sj', 'dd', 'nr', 'lxdw', 'lxr', 'lxdh']
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
          if (item.xq === this.tableData[index - 1].xq) {
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
