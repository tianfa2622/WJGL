<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>信息登记</el-breadcrumb-item>
          <el-breadcrumb-item>督办件</el-breadcrumb-item>
          <el-breadcrumb-item>人大建议</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center;">
          <span>人大建议登记</span>
        </div>
        <el-card class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-button
              @click="submitForm('ruleForm')"
              style="float: right; padding: 3px 10px"
              type="text"
              >保存信息</el-button
            >
            <el-button
              @click="resetForm('ruleForm')"
              style="float: right; padding: 3px 10px"
              type="text"
              >重置</el-button
            >
          </div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="流水号：" prop="name" required>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文件类型：">
                  <el-select
                    v-model="ruleForm.name"
                    disabled
                    placeholder="人大建议"
                    style="width:120px;"
                  >
                  </el-select>
                  -
                  <el-select
                    v-model="ruleForm.name"
                    disabled
                    placeholder="上级督办件"
                    style="width:150px;"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文内容：">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="ruleForm.name"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来文单位：">
                  <el-select
                    v-model="ruleForm.name"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="政协提案编号：">
                  <el-input v-model="ruleForm.name"></el-input
                ></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收文时间：">
                  <el-date-picker
                    v-model="ruleForm.name"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主办单位：">
                  <el-select
                    v-model="ruleForm.name"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option> </el-select
                ></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人：">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="分办单位：">
                  <el-select
                    v-model="ruleForm.name"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option> </el-select
                ></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="会办单位：">
                  <el-select
                    v-model="ruleForm.name"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option> </el-select
                ></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="登记人：">当前用户名称</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="登记日期：">
                  <el-date-picker
                    v-model="ruleForm.name"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker
                ></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注：">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="ruleForm.name"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="要求办结时间：">
                  <el-date-picker
                    v-model="ruleForm.name"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>办理</span>
          </div>
        </el-card>
        <el-card class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>催办</span>
          </div>
        </el-card>
        <el-card class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>办结</span>
          </div>
        </el-card>
        <el-card class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>附件</span>
          </div>
        </el-card>
        <el-card class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>跟踪办理</span>
          </div>
        </el-card>
      </el-card>

      <el-card class="box-card">
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
        <el-table :data="tableData" style="width: 100%;height:500px;">
          <el-table-column
            label="序号"
            type="index"
            width="50px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="文件类型"
            prop="wjlx"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="流水号"
            prop="wjlx"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="人大建议号"
            prop="wjlx"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="收文时间"
            prop="wjlx"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column label="文号" prop="wjlx" width="180" align="center">
          </el-table-column>
          <el-table-column
            label="来文单位"
            prop="wjlx"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="来文内容"
            prop="wjlx"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="要求办结时间"
            prop="wjlx"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="登记人"
            prop="wjlx"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="signForevent(scope.row)"
                >签收</el-button
              >
            </template>
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

    <signFordialog @setsig="getsig" :sig="sigDialogVisible"></signFordialog>
  </div>
</template>

<script>
import signFordialog from './Dialog/proposesignFordialog'
export default {
  components: {
    signFordialog
  },
  data () {
    return {
      ruleForm: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入流水号', trigger: 'blur' }]
      },
      options: [],
      blqkSelect: [],
      conditionInputs: {
        lsh: '',
        lwnr: '',
        lwsj1: '',
        lwsj2: '',
        blqk: ''
      },
      tableData: [
        {
          wjlx: '人大建议'
        }
      ],
      currentPage4: 1,
      sigDialogVisible: false,
      wqrqzlxsl: 0
    }
  },
  methods: {
    //保存信息事件
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
          this.$refs[formName].resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //重置事件
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    //表格中操作>签收事件
    signForevent (row) {
      this.sigDialogVisible = true
    },
    //组件传参->接收参数
    getsig (data) {
      this.sigDialogVisible = data
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
.el-pagination {
  margin: 15px 0 0 0;
  text-align: center;
}
</style>
