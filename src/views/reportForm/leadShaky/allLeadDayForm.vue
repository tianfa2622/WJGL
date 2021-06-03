<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>报表</el-breadcrumb-item>
          <el-breadcrumb-item>领导活动</el-breadcrumb-item>
          <el-breadcrumb-item>所有厅领导每日行程表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div class="condition">
          <div class="condition-col">
            活动时间:<el-select
              v-model="conditionInputs.hdsj"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in hdsjSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
            <el-button>查询</el-button>
            <el-button>导出Excel</el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%;height:500px;">
          <el-table-column label="领导" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="上午" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="下午" prop="wjlx" align="center">
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
      tableData: [
        {
          wjlx: '1'
        }
      ],
      conditionInputs: {
        hdsj: '',
        bbbt: ''
      },
      hdsjSelect: []
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
