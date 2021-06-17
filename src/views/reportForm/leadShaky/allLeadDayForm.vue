<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item>报表</el-breadcrumb-item> -->
          <el-breadcrumb-item>领导活动</el-breadcrumb-item>
          <el-breadcrumb-item>所有厅领导每日行程表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div class="condition">
          <div class="condition-col">
            活动时间:<el-select v-model="conditionInputs.hdsj" clearable placeholder="请选择">
              <el-option v-for="item in hdsjSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
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
            <el-table :data="tableData" border fit style="width: 100%;height:500px;">
              <el-table-column label="领导" prop="wjlx" align="center" width="120" :resizable="false"> </el-table-column>
              <el-table-column label="上午" prop="wjlx" align="center" :resizable="false"> </el-table-column>
              <el-table-column label="下午" prop="wjlx" align="center" :resizable="false"> </el-table-column>
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
          wjlx: '1'
        }
      ],
      conditionInputs: {
        hdsj: '',
        bbbt: ''
      },
      hdsjSelect: [],
      tableTitle: `所有厅领导每日行程表 (${this.CurrentDate()})`
    }
  },
  created() {
    this.conditionInputs.hdsj = this.CurrentDate()
    this.conditionInputs.bbbt = this.tableTitle
  },
  methods: {
    // 获取当天日期
    CurrentDate() {
      const now = new Date()
      const year = now.getFullYear() // 年
      let month = now.getMonth() + 1 // 月
      let day = now.getDate() // 日
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
    // 查询按钮
    search() {
      if (this.conditionInputs.bbbt !== this.tableTitle) {
        this.tableTitle = `${this.conditionInputs.bbbt} (${this.conditionInputs.hdsj})`
      } else {
        this.tableTitle = this.conditionInputs.bbbt
      }
    },
    // 导出按钮
    exportExcel() {
      this.exportToExcel()
    },
    // excel 数据导出
    exportToExcel() {
      const tHeader = ['领导', '上午', '下午']
      const filterVal = ['wjlx', 'wjlx', 'wjlx']
      const title = this.conditionInputs.bbbt + '(' + this.conditionInputs.hdsj + ')'
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
