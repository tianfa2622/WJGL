<template>
  <div>
    <div class="container">
      <h3>呈批件上报信息审核</h3>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="condition">
            <div class="condition-col">
              流水号:<el-input
                placeholder="请输入内容"
                v-model="conditionInputs.lsh"
                clearable
              >
              </el-input>
            </div>
            <div class="condition-col">
              来文内容:<el-input
                placeholder="请输入内容"
                v-model="conditionInputs.lwnr"
                clearable
              >
              </el-input>
            </div>
            <div class="condition-col">
              收文时间:<el-date-picker
                v-model="conditionInputs.lwsj1"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker
              >-
              <el-date-picker
                v-model="conditionInputs.lwsj2"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
            <div class="condition-col">
              办理情况:<el-select
                v-model="conditionInputs.blqk"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in blqkSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="condition-col">
              <el-button>查询</el-button>
              <el-button>扫码签收</el-button>
            </div>
          </div>
        </div>
        <el-table :data="tableDataOne" border style="width: 100%;height:550px;">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50px"
          ></el-table-column>
          <el-table-column
            prop="adminName"
            label="流水号"
            align="center"
          ></el-table-column>
          <el-table-column label="收文时间" prop="adminName" align="center">
          </el-table-column>
          <el-table-column label="文号" prop="adminName" align="center">
          </el-table-column>
          <el-table-column label="来文单位" prop="adminName" align="center">
          </el-table-column>
          <el-table-column label="来文内容" prop="adminName" align="center">
          </el-table-column>
          <el-table-column label="办理情况" prop="adminName" align="center">
          </el-table-column>
          <el-table-column label="上报人员" prop="adminName" align="center">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="50"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableDataOne: [
        {
          adminName: 'rich'
        }
      ],
      conditionInputs: {
        lsh: '',
        lwnr: '',
        lwsj1: '',
        lwsj2: '',
        blqk: ''
      },
      blqkSelect: []
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
.container h3 {
  margin-bottom: 10px;
  color: #606266;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
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
  margin-bottom: 13px;
}
.condition {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-bottom: 10px;
}
.condition .el-input {
  width: 185px;
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
.el-pagination {
  margin: 15px 0 0 0;
  text-align: center;
}
</style>
