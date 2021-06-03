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
        <div slot="header" class="clearfix" style="text-align:center;">
          <span>督办件</span>
        </div>
        <div class="condition">
          <el-row>
            <el-col :span="10">
              <span>文件类型：</span>
              <span>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="上级督办件" border></el-checkbox>
                  <el-checkbox label="厅批督办件" border></el-checkbox>
                </el-checkbox-group>
              </span>
            </el-col>
            <el-col :span="8"
              >收文时间：<el-date-picker
                v-model="ruleForm.name"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width:185px;"
              >
              </el-date-picker
              >-<el-date-picker
                v-model="ruleForm.name"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width:185px;"
              >
              </el-date-picker
            ></el-col>
            <el-col :span="6"
              >流水号：<el-input
                placeholder="请输入内容"
                v-model="ruleForm.name"
                clearable
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>来文内容：</span>
              <el-input
                placeholder="请输入内容"
                v-model="ruleForm.name"
                clearable
              >
              </el-input>
            </el-col>
            <el-col :span="8"
              ><span>来文单位：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-col>
            <el-col :span="6"
              ><span>办理情况：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="全部">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>文号：</span>
              <el-input
                placeholder="请输入内容"
                v-model="ruleForm.name"
                clearable
              >
              </el-input>
            </el-col>
            <el-col :span="8"
              ><span>督办号：</span>
              <el-input
                placeholder="请输入内容"
                v-model="ruleForm.name"
                clearable
              >
              </el-input
            ></el-col>
            <el-col :span="6"
              ><span>来件渠道：</span>
              <el-input
                placeholder="请输入内容"
                v-model="ruleForm.name"
                clearable
              >
              </el-input
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>要求办结时间：</span>
              <el-date-picker
                v-model="ruleForm.name"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width:185px;"
              >
              </el-date-picker
              >-<el-date-picker
                v-model="ruleForm.name"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width:185px;"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="8">
              <span>实际办结时间：</span>
              <el-date-picker
                v-model="ruleForm.name"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width:185px;"
              >
              </el-date-picker
              >-<el-date-picker
                v-model="ruleForm.name"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width:185px;"
              >
              </el-date-picker
            ></el-col>
            <el-col :span="6">
              <span>办理单位：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>原件领导批示：</span>
              <el-input
                placeholder="请输入内容"
                v-model="ruleForm.name"
                clearable
              >
              </el-input>
            </el-col>
            <el-col :span="8">
              <span>涉及内容：</span>
              <el-input
                placeholder="请输入内容"
                v-model="ruleForm.name"
                clearable
              >
              </el-input
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>批示人：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span>批示时间：</span>
              <el-date-picker
                v-model="ruleForm.name"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width:185px;"
              >
              </el-date-picker
              >-<el-date-picker
                v-model="ruleForm.name"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width:185px;"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="6">
              <span>批示内容：</span>
              <el-input
                placeholder="请输入内容"
                v-model="ruleForm.name"
                clearable
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>办结备注：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                placeholder="请输入内容"
                v-model="ruleForm.name"
                clearable
                style="width:200px;margin-left:10px;"
              >
              </el-input>
            </el-col>
            <el-col :span="8">
              <span>联系人：</span>
              <el-input
                placeholder="请输入内容"
                v-model="ruleForm.name"
                clearable
                style="width:200px;margin-left:10px;"
              >
              </el-input>
            </el-col>
            <el-col :span="6">
              <span>联系电话：</span>
              <el-input
                placeholder="请输入内容"
                v-model="ruleForm.name"
                clearable
                style="width:200px;margin-left:10px;"
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" style="line-height: 50px;">
              排序方式：
              <el-radio-group v-model="radio">
                <el-radio :label="1">厅领导</el-radio>
                <el-radio :label="2">批示时间</el-radio>
                <el-radio :label="3">流水号</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="12" style="text-align: right;">
              <el-button plain>查询</el-button>
              <el-button plain>导出excel</el-button>
            </el-col>
          </el-row>
        </div>
        <el-table :data="tableData" style="width: 100%;height:500px;">
          <el-table-column
            label="序号"
            type="index"
            width="50px"
            align="center"
          ></el-table-column>
          <el-table-column label="文件类型" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="流水号" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="督办号" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="收文时间" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="文号" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="来文单位" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="来文内容" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="要求办结时间" prop="wjlx" align="center">
          </el-table-column>
          <el-table-column label="登记人" prop="wjlx" align="center">
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
      ruleForm: { name: '' },
      checkList: [],
      options: [],
      radio: 1,
      tableData: [
        {
          wjlx: '督办件'
        }
      ],
      currentPage4: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
