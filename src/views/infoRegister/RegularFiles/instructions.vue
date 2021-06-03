<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item>信息登记</el-breadcrumb-item> -->
          <el-breadcrumb-item>一般文件</el-breadcrumb-item>
          <el-breadcrumb-item>呈批件</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="box-card_header_title">
            <span>呈批件登记</span>
          </div>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="5"> <el-button @click="LogBtn">日志</el-button><el-button>二维码打印</el-button> </el-col>
            <el-col :span="2">
              <el-button @click="ScanCodeToSign">扫码签收</el-button>
            </el-col>
          </el-row>
        </div>
        <el-card class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-button style="float: right;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <!-- <el-button
              @click="resetForm('ruleForm')"
              style="float: right; padding: 3px 10px"
              type="text"
              >重置</el-button
            > -->
          </div>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="流水号：" prop="name" required>
                  <!-- <el-input v-model="ruleForm.name"></el-input> -->
                  <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人：" prop="name" required>
                  <el-input v-model="ruleForm.name" placeholder="请输入联系人"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文内容：" prop="name" resize="none" required>
                  <el-input v-model="ruleForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="送呈单位：" prop="name" required>
                  <el-input v-model="ruleForm.name" placeholder="请选择单位"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="登记日期：" prop="name" required>
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：">
                  <el-input v-model="ruleForm.name" placeholder="请联系电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="文号：">
                  <el-input v-model="ruleForm.name" placeholder="请输入文号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="登记人：">
                      <!-- <el-input v-model="ruleForm.name"></el-input> -->
                      <span>{{ ruleForm.name ? ruleForm.name : '王湘琴' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="登记单位：">
                      <!-- <el-input v-model="ruleForm.name"></el-input> -->
                      <span>{{ ruleForm.name ? ruleForm.name : '厅长秘书处' }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="部门警种意见：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>送呈领导</span>
          </div>
          <el-row>
            <el-col :span="4" style="text-align:center"><div style="padding:15px 0;">领导批示：</div></el-col>
            <el-col :span="18"><el-button v-for="o in 12" :key="o" plain class="leadershipBtn">徐显辉</el-button></el-col>
          </el-row>

          <el-row type="flex" justify="center" style="margin-top:20px">
            <el-col :span="20">
              <el-card class="box-card">
                <el-row>
                  <el-col :span="18">
                    <el-form ref="InstructionsForm" :model="InstructionsForm" label-width="90px" class="demo-dynamic">
                      <el-row>
                        <el-col :span="7">
                          <el-form-item label="批示人：">
                            <span>{{ InstructionsForm.name ? InstructionsForm.name : '徐显辉' }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="17">
                          <el-form-item label="批示时间：">
                            <el-date-picker v-model="InstructionsForm.name" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                            <el-button style="margin-left:10px">圈阅</el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-form-item label="批示内容：">
                        <el-input v-model="InstructionsForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                      </el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="danger">删 除</el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>办结</span>
          </div>
        </el-card>
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>附件</span>
          </div>
        </el-card>
      </el-card>

      <el-card class="box-card">
        <div class="condition">
          <div class="condition-col">流水号:<el-input v-model="conditionInputs.lsh" placeholder="请输入内容" clearable> </el-input></div>
          <div class="condition-col">来文内容:<el-input v-model="conditionInputs.lwnr" placeholder="请输入内容" clearable> </el-input></div>
          <div class="condition-col">
            收文时间:<el-date-picker v-model="conditionInputs.lwsj1" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>-
            <el-date-picker v-model="conditionInputs.lwsj2" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
          </div>
          <div class="condition-col">
            办理情况:<el-select v-model="conditionInputs.blqk" clearable placeholder="请选择">
              <el-option v-for="item in blqkSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <div class="condition-col">
            <el-button>查询</el-button>
            <el-button>扫码签收</el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%;height:500px;">
          <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
          <el-table-column label="文件类型" prop="wjlx" width="180" align="center"> </el-table-column>
          <el-table-column label="流水号" prop="wjlx" width="180" align="center"> </el-table-column>
          <el-table-column label="收文时间" prop="wjlx" width="180" align="center"> </el-table-column>
          <el-table-column label="文号" prop="wjlx" width="180" align="center"> </el-table-column>
          <el-table-column label="来文单位" prop="wjlx" width="180" align="center"> </el-table-column>
          <el-table-column label="来文内容" prop="wjlx" width="180" align="center"> </el-table-column>
          <el-table-column label="办理情况" prop="wjlx" width="180" align="center"> </el-table-column>
          <el-table-column label="登记人" prop="wjlx" width="180" align="center"> </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="signForevent(scope.row)">签收</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </el-card>
    </div>

    <signFordialog :sig="sigDialogVisible" @setsig="getsig"></signFordialog>

    <LogDialog :is-show="logDialogVisible" @SetClose="SetClose" />
  </div>
</template>

<script>
import signFordialog from './Dialog/signFordialog'
import LogDialog from './LogDialog/instructionsDialog'
export default {
  components: {
    // 扫码签收
    signFordialog,
    // 日志弹出组件
    LogDialog
  },
  data() {
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
          wjlx: '呈批件'
        }
      ],
      currentPage4: 1,
      sigDialogVisible: false,
      logDialogVisible: false, // 显示日志弹出框
      // 批示数据
      InstructionsForm: {
        name: ''
      }
    }
  },
  methods: {
    // 日志按钮
    LogBtn() {
      this.logDialogVisible = true
    },
    // 扫码签收
    ScanCodeToSign() {
      this.sigDialogVisible = true
    },
    // 保存信息事件
    submitForm(formName) {
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
    // 重置事件
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 切换每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 切换当前页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 表格中操作>签收事件
    signForevent(row) {
      // this.sigDialogVisible = true
      console.log(row)
    },
    // 组件传参->接收参数
    getsig(data) {
      this.sigDialogVisible = data
    },
    // 组件传参->接收参数 关闭日志
    SetClose(data) {
      this.logDialogVisible = data
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
.leadershipBtn:nth-child(n + 7) {
  margin-top: 10px;
}
.leadershipBtn:nth-child(8) {
  margin-top: 10px;
  /* margin-left: 0; */
}
.box-card_header_title {
  width: 100%;
  text-align: center;
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
