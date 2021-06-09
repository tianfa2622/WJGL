<template>
  <div>
    <div class="container">
      <div class="navigation">
        <div class="navigation-left">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>信息登记</el-breadcrumb-item>
            <el-breadcrumb-item>一般文件</el-breadcrumb-item>
            <el-breadcrumb-item>平级和下级来文</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="navigation-right">未确认传阅件数量：{{ wqrcyjsl }}</div>
        <div style="clear:both;"></div>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="box-card_header_title">
            <span>平级和下级来文件登记</span>
          </div>
          <el-row type="flex" justify="space-around">
            <el-col :span="5">
              <el-button @click="LogBtn">日志</el-button>
              <el-button>二维码打印</el-button>
            </el-col>
            <el-col :span="4">
              <el-button>传阅单</el-button>
              <el-button @click="ScanCodeToSign">扫码签收</el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 基本信息 -->
        <el-card class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-button style="float: right;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <!-- <el-button style="float: right; padding: 3px 10px" type="text" @click="resetForm('ruleForm')">重置</el-button> -->
          </div>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="125px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="流水号：" prop="name">
                  <!-- <el-input v-model="ruleForm.name"></el-input> -->
                  <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收文时间：" prop="name">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文内容：" prop="name" required>
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人：" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入联系人"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="文号：" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入文号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请联系电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文份数：" prop="name">
                  <el-input v-model.number="ruleForm.name" placeholder="请输入份数"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="登记日期：" prop="name">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文单位：" prop="name">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
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
                <el-form-item label="上级领导批示：" prop="name">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" placeholder="请输入内容" resize="none"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门警种意见：" prop="name">
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注：" prop="name">
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>

        <!-- 送呈领导 -->
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>送呈警令部领导</span>
          </div>

          <el-row>
            <el-col :span="4" style="text-align:center"><div style="padding:15px 0;">领导批示：</div></el-col>
            <el-col :span="18"><el-button v-for="o in 12" :key="o" plain class="leadershipBtn" @click="addDomain">徐显辉</el-button></el-col>
          </el-row>

          <el-row type="flex" justify="center" style="margin-top:20px">
            <el-col :span="22">
              <el-card v-for="(item, index) in InstructionBox" :key="index" class="box-card">
                <el-row type="flex" justify="space-between" align="middle">
                  <el-col :span="20">
                    <el-form ref="InstructionsForm" :model="item.InstructionsForm" label-width="90px" class="demo-dynamic">
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label="批示人：">
                            <span>{{ item.InstructionsForm.name ? item.InstructionsForm.name : '徐显辉' }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="16">
                          <el-form-item label="批示时间：">
                            <el-date-picker v-model="item.InstructionsForm.name" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                            <el-button style="margin-left:10px">圈阅</el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-form-item label="批示内容：">
                        <el-input v-model="item.InstructionsForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                      </el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="danger" class="delete_btn_class" @click="delInstructions(index)">删 除</el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        <!-- 办结 -->
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>办结</span>
          </div>
          <el-row type="flex" justify="center">
            <el-form ref="FinishForm" :model="FinishForm" label-width="90px" class="demo-dynamic">
              <el-col :span="18">
                <el-form-item label="办结时间：">
                  <el-date-picker v-model="FinishForm.name" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                  <el-button style="margin-left:30px" type="primary">办结</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="备注：">
                  <el-input v-model="FinishForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-card>

        <!-- 附件 -->
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>附件</span>
          </div>
          <el-row type="flex" justify="center">
            <el-col :span="18">
              <el-row type="flex" justify="center">
                <el-col :span="2">
                  <span>附件：</span>
                </el-col>
                <el-col :span="10">
                  <el-upload action="" :on-remove="handleRemove" :on-exceed="handleExceed" :before-remove="beforeRemove" :multiple="false" :limit="1" :file-list="fileList" :auto-upload="false">
                    <el-link type="danger">添加附件</el-link>
                  </el-upload>
                  <div style="margin-top:20px">
                    <span style="color:#5a81a9;font-size:14px">模拟上传文件.word</span>
                    <el-link type="danger" style="margin-left:20px" @click="downTemplate">下载</el-link>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>

        <!-- 推送 -->
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>推送</span>
          </div>
          <div class="table">
            <div style="margin-bottom:10px">
              <el-button @click="selectPersonnel">选择人员</el-button>
            </div>
            <div class="table_content">
              <el-table :data="personnelTableData" border style="width: 100%">
                <el-table-column prop="name" type="index" label="序号" width="50" header-align="center" :resizable="false"> </el-table-column>
                <el-table-column prop="name" label="姓名" :resizable="false" header-align="center"> </el-table-column>
                <el-table-column prop="name" label="手机号" :resizable="false" header-align="center"> </el-table-column>
                <el-table-column prop="name" label="单位" :resizable="false" header-align="center"> </el-table-column>
                <el-table-column prop="name" label="反馈信息" :resizable="false" header-align="center"> </el-table-column>
                <el-table-column prop="name" label="状态" :resizable="false" header-align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.name === 0">签收</span>
                    <span v-if="scope.row.name === 1">已签收</span>
                    <!-- <el-button v-else size="mini" @click="signForevent(scope.row)">签收</el-button> -->
                    <span v-else>{{ scope.row.wjlx }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-if="personnelTableData.length">
              <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
            </div>
          </div>
        </el-card>
      </el-card>

      <el-card class="box-card">
        <div class="condition">
          <div class="condition-col"><span style="margin-left:15px" />流水号:<el-input v-model="conditionInputs.lsh" placeholder="请输入内容" clearable> </el-input></div>
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
            <el-button @click="search">查询</el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%;height:500px;" @selection-change="handleSelectionChange">
          <el-table-column label="全选" type="selection" width="50px" :resizable="false"></el-table-column>
          <el-table-column label="序号" type="index" width="50px" align="center" :resizable="false"></el-table-column>
          <el-table-column label="文件类型" prop="wjlx" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="流水号" prop="wjlx" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="收文时间" prop="wjlx" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="文号" prop="wjlx" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="来文单位" prop="wjlx" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="来文内容" prop="wjlx" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="登记人" prop="wjlx" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="文件状态" prop="wjlx" align="center" :resizable="false">
            <template slot-scope="scope">
              <span v-if="scope.row.wjlx === 0">签收</span>
              <span v-if="scope.row.wjlx === 1">已签收</span>
              <!-- <el-button v-else size="mini" @click="signForevent(scope.row)">签收</el-button> -->
              <span v-else>{{ scope.row.wjlx }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center" :resizable="false">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row)">查看</el-link>
              <el-link type="danger" style="margin-left:10px" @click="tabeleDel(scope.$index)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </el-card>
    </div>

    <SignFordialog :sig="sigDialogVisible" @setsig="getsig"></SignFordialog>

    <LogDialog :is-show="logDialogVisible" @SetClose="SetClose" />

    <!-- 推送模块选择人员弹出层 -->
    <el-dialog title="选择人员" :visible.sync="dialogFormVisible" center :close-on-click-modal="false">
      <el-form :model="dialogData" :inline="true">
        <el-form-item>
          <el-input v-model="dialogData.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model.number="dialogData.name" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchPersonnel">搜索</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top:10px">
        <el-table :data="dialogTableData" border style="width: 100%" @selection-change="dialogSelectionChange">
          <el-table-column label="全选" type="selection" width="50px" :resizable="false"></el-table-column>
          <el-table-column prop="name" type="index" label="序号" width="50" :resizable="false"> </el-table-column>
          <el-table-column prop="name" label="姓名" :resizable="false"> </el-table-column>
          <el-table-column prop="name" label="手机号" :resizable="false"> </el-table-column>
          <el-table-column label="操作" width="60" :resizable="false">
            <template slot-scope="scope">
              <el-link type="primary" @click="choose(scope.row)">选择</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="close">关 闭</el-button>
        <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SignFordialog from './Dialog/levelsignFordialog'
import LogDialog from './LogDialog/levelDialog'
export default {
  components: {
    // 扫码签收
    SignFordialog,
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
          wjlx: '平级和下级来文'
        }
      ],
      currentPage4: 1,
      sigDialogVisible: false,
      wqrcyjsl: 0,
      logDialogVisible: false, // 显示日志弹出框
      // 批示数据
      InstructionBox: [
        {
          InstructionsForm: {
            name: ''
          }
        }
      ],
      // 办结数据
      FinishForm: {
        name: ''
      },
      // 上传文件列表
      fileList: [],
      // 表格选择项
      multipleSelection: [],
      // 推送模块表格数据
      personnelTableData: [],
      // 选择人员弹出层搜索数据
      dialogData: { name: '' },
      // 选择人员弹出层表格数据项
      dialogTableData: [{ name: '123' }],
      // 选择人员弹出层表格选择项
      Selection: [],
      // 是否显示弹出层
      dialogFormVisible: false
    }
  },
  methods: {
    // 搜索按钮
    search() {},
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
      console.log(row)
      this.sigDialogVisible = true
    },
    // 组件传参->接收参数
    getsig(data) {
      this.sigDialogVisible = data
    },
    // 点击领导名字增加批示框
    addDomain() {
      this.InstructionBox.push({
        InstructionsForm: {
          name: ''
        }
      })
    },
    // 批示框里删除按钮
    delInstructions(index) {
      if (index !== -1) {
        this.InstructionBox.splice(index, 1)
      }
    },
    // 上传列表删除
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 上传列表删除前
    beforeRemove(file, fileList) {
      console.log(file, fileList)
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 上传文件超出
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 下载附件按钮
    downTemplate() {},
    // 表格删除按钮
    tabeleDel(index) {
      this.tableData.splice(index, 1)
    },
    // 表格查看按钮
    tableView(row) {
      console.log(row)
    },
    // 表格选择项发生变化时
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    // 推送模块选择人员按钮
    selectPersonnel() {
      this.dialogFormVisible = true
    },
    // 选择人员弹出层搜索按钮
    searchPersonnel() {},
    // 选择人员弹出层表格选择项发生变化时
    dialogSelectionChange(val) {
      console.log(val)
      this.Selection = val
    },
    // 选择人员弹出层表格选择按钮
    choose(row) {
      console.log(row)
    },
    // 选择人员弹出层关闭按钮
    close() {
      this.dialogData = {}
      this.multipleSelection = []
      this.dialogTableData = []
      this.dialogFormVisible = false
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
.navigation-left {
  float: left;
}
.navigation-right {
  float: right;
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
.delete_btn_class {
  /* padding-top: 5px; */
  /* line-height: 8 !important; */
  margin-left: 20px;
  padding: 30px 15px;
}
::v-deep .delete_btn_class span {
  writing-mode: tb-rl;
}
</style>
