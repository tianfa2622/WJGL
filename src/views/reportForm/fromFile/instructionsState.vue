<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>报表</el-breadcrumb-item>
          <el-breadcrumb-item>文件报表</el-breadcrumb-item>
          <el-breadcrumb-item>呈批件情况一览表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div class="condition">
          <div class="condition-col">
            活动时间:
            <el-date-picker v-model="activityTime" type="datetimerange" value-format="yyyy/MM/dd" format="yyyy/MM/dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="{ firstDayOfWeek: 1 }" @change="GetHDTime"> </el-date-picker>
          </div>
          <div class="condition-col">报表标题:<el-input v-model="conditionInputs.bbbt" style="width:350px" placeholder="请输入内容" clearable> </el-input></div>
          <div class="condition-col">
            排序方式:<el-select v-model="conditionInputs.pxfs" clearable placeholder="请选择">
              <el-option v-for="item in pxfsSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <div class="condition-col">
            <el-button @click="search">查询</el-button>
            <el-button @click="print">一键打印</el-button>
            <el-button @click="exportExcel">导出Excel</el-button>
          </div>
        </div>
        <el-row type="flex" class="tableBox" justify="center">
          <el-col :span="20" class="tableTitlebox">
            <span class="tableLabel">{{ tableTitle }}</span>
          </el-col>
          <el-col :span="20">
            <el-table :data="tableData" border fit style="width: 100%;height:500px;">
              <el-table-column prop="wjlx" label="序号" width="50" align="center" :resizable="false"></el-table-column>
              <el-table-column label="流水号" prop="wjlx" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="文号" prop="wjlx" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="时间" prop="wjlx" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="单位" prop="wjlx" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="送件人" prop="wjlx" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="电话" prop="wjlx" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="送呈领导" prop="wjlx" :resizable="false" align="center"> </el-table-column>
              <el-table-column label="标题" :resizable="false" prop="wjlx" align="center"> </el-table-column>
              <el-table-column label="备注" :resizable="false" prop="wjlx" align="center"> </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      activityTime: null,
      conditionInputs: {
        sj: '',
        sj1: '',
        bbbt: '',
        pxfs: ''
      },
      tableData: [
        {
          wjlx: '1'
        }
      ],
      pxfsSelect: [
        { label: '升序', value: '升序' },
        { label: '降序', value: '降序' }
      ],
      tableTitle: ''
    }
  },
  created() {
    this.getThisWeek()
    this.tableTitle = this.InitialValue(this.conditionInputs.startTime, this.conditionInputs.endTime)
    this.conditionInputs.bbbt = this.tableTitle
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
        this.conditionInputs.startTime = this.activityTime[0]
        this.conditionInputs.endTime = this.activityTime[1]
      }
    },
    // 标题初始值格式
    InitialValue(time1, time2) {
      const value = `呈批件情况一览表（${time1}-${time2}）`
      return value
    },
    // 搜索按钮
    search() {
      this.conditionInputs.bbbt = this.InitialValue(this.conditionInputs.startTime, this.conditionInputs.endTime)
      if (this.conditionInputs.bbbt !== this.tableTitle && this.conditionInputs.bbbt !== '') {
        this.tableTitle = this.conditionInputs.bbbt
      }
    },
    // 打印
    print() {},
    // 导出按钮
    exportExcel() {
      this.exportToExcel()
    },
    // excel 数据导出
    exportToExcel() {
      const tHeader = ['序号', '流水号', '文号', '时间', '单位', '送件人', '电话', '送呈领导', '标题', '备注']
      const filterVal = ['wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx']
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
