<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>报表</el-breadcrumb-item>
          <el-breadcrumb-item>文件报表</el-breadcrumb-item>
          <el-breadcrumb-item>传阅件情况一览表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div class="condition">
          <div class="condition-col">
            活动时间:
            <el-date-picker
              v-model="conditionInputs.sj"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="开始日期"
            >
            </el-date-picker
            >-
            <el-date-picker
              v-model="conditionInputs.sj1"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div class="condition-col">
            报表标题:<el-input
              placeholder="请输入内容"
              v-model="conditionInputs.bbbt"
              clearable
            >
            </el-input>
          </div>
          <div class="condition-col">
            排序方式:<el-select
              v-model="conditionInputs.pxfs"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in pxfsSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="condition-col">
            <el-button>查询</el-button>
            <el-button>导出Excel</el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%;height:500px;">
          <el-table-column
            type="index"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column label="流水号" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="来文单位" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="文号" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="文件标题" prop="wjlx" align="center">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      conditionInputs: {
        sj: '',
        sj1: '',
        bbbt: '',
        pxfs: ''
      },
      pxfsSelect: [],
      tableData: [
        {
          wjlx: '1'
        }
      ]
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
</style>
