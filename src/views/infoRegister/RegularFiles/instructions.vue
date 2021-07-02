<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>信息登记</el-breadcrumb-item>
          <el-breadcrumb-item>一般文件</el-breadcrumb-item>
          <el-breadcrumb-item>呈批件</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="box-card_header_title">
            <span>呈批件登记</span>
          </div>
          <el-row type="flex" justify="space-around">
            <el-col :span="5"> <el-button @click="LogBtn">日志</el-button><el-button>二维码打印</el-button> </el-col>
            <el-col :span="2">
              <el-button @click="ScanCodeToSign">扫码签收</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 基本信息 -->
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
                <el-form-item label="流水号：">
                  <span>{{ ruleForm.serial_num }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人：" prop="phone_name" required>
                  <el-input v-model="ruleForm.phone_name" placeholder="请输入联系人"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文内容：" prop="content" required>
                  <el-input v-model="ruleForm.content" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="送呈单位：" prop="company" required>
                  <el-input v-model="ruleForm.company" placeholder="请选择单位"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="登记日期：" prop="creat_date" required>
                  <el-date-picker v-model="ruleForm.creat_date" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：" prop="phone">
                  <el-input v-model="ruleForm.phone" placeholder="请联系电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="文号：">
                  <el-input v-model="ruleForm.reference_num" placeholder="请输入文号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="登记人：">
                      <span>{{ ruleForm.registrant }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="登记单位：">
                      <span>{{ ruleForm.registrant_company }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="部门警种意见：">
                  <el-input v-model="ruleForm.bmjzyj" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注：">
                  <el-input v-model="ruleForm.comment" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <!-- 送呈领导 -->
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>送呈领导</span>
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
      </el-card>

      <el-card class="box-card">
        <el-row type="flex" justify="space-around" class="search_box">
          <el-col :span="7">
            <span class="span_color" style="margin-left:15px">流水号:</span>
            <el-input v-model="conditionInputs.serial_num" style="width:70%" placeholder="请输入内容" clearable> </el-input>
          </el-col>
          <el-col :span="7">
            <span class="span_color">来文内容:</span>
            <el-input v-model="conditionInputs.content" style="width:70%" placeholder="请输入内容" clearable> </el-input>
          </el-col>
          <el-col :span="7">
            <span class="span_color">办理情况:</span>
            <el-select v-model="conditionInputs.banli" style="width:70%" clearable placeholder="请选择">
              <el-option v-for="item in blqkSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="16" style="margin-top:15px">
            <span class="span_color">登记日期:</span>
            <el-date-picker v-model="timeData" type="daterange" range-separator="-" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
          </el-col>
          <el-col :span="6" style="margin-top:15px;text-align:center">
            <el-button style="width:150px" @click="search(conditionInputs)">查询</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%;height:500px;" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50px"></el-table-column>
          <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
          <el-table-column label="文件类型" prop="file_type" align="center">
            <template slot-scope="scope">
              <template v-for="wjlx in wj_Type">
                <span v-if="scope.row.file_type === wjlx.value" :key="wjlx.value">{{ wjlx.label }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="流水号" prop="serial_num" align="center"></el-table-column>
          <el-table-column label="登记时间" prop="creat_date"> </el-table-column>
          <el-table-column label="文号" prop="reference_num" align="center"> </el-table-column>
          <el-table-column label="送呈单位" prop="company" align="center"> </el-table-column>
          <el-table-column label="来文内容" prop="content"> </el-table-column>
          <el-table-column label="办理情况" prop="banli" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.banli === 1">未审核</span>
              <span v-if="scope.row.banli === 0">已审核</span>
            </template>
          </el-table-column>
          <el-table-column label="登记人" prop="registrant" align="center"> </el-table-column>
          <el-table-column label="文件状态" prop="file_status" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.file_status === 1">签收</span>
              <span v-if="scope.row.file_status === 0">已签收</span>
              <!-- <el-button v-else size="mini" @click="signForevent(scope.row)">签收</el-button> -->
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row)">查看</el-link>
              <el-link type="danger" style="margin-left:10px" @click="tabeleDel(scope.$index)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </el-card>
    </div>

    <SignFordialog :sig="sigDialogVisible" @setsig="getsig"></SignFordialog>

    <LogDialog :is-show="logDialogVisible" @SetClose="SetClose" />
  </div>
</template>

<script>
import SignFordialog from './Dialog/signFordialog'
import LogDialog from './LogDialog/instructionsDialog'
import { getProjectNum } from '@/utils/comm'
// eslint-disable-next-line no-unused-vars
import { searchAll, Add } from '@/api/infoRegister/RegularFiles/instructions'
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
        serial_num: getProjectNum(),
        registrant: '王湘琴',
        registrant_company: '厅长秘书处'
      },
      rules: {
        name: [{ required: true, message: '请输入流水号', trigger: 'blur' }]
      },
      options: [],
      blqkSelect: [
        { label: '未审核', value: 1 },
        { label: '已审核', value: 0 }
      ],
      // 搜索框数据
      conditionInputs: {},
      tableData: [],
      timeData: [],
      // 当前页面
      currentPage: 1,
      // 当前展示条数
      pageSize: 10,
      // 总数
      total: 20,
      sigDialogVisible: false,
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
      // 文件类型
      wj_Type: [
        { value: 1, label: '呈批件' },
        { value: 2, label: '上级来文' },
        { value: 3, label: '平级和下级来文' },
        { value: 4, label: '群众来信' },
        { value: 5, label: '其他' },
        { value: 7, label: '上级督办件' },
        { value: 8, label: '厅批督办件' },
        { value: 9, label: '政协提案' },
        { value: 10, label: '人大建议' }
      ]
    }
  },
  created() {
    this.search()
  },
  methods: {
    // 搜索按钮
    async search(data) {
      try {
        const pageData = {}
        let paramsData = {}
        pageData.pageIndex = this.currentPage
        pageData.pageSize = this.pageSize
        paramsData = { ...data }
        paramsData.start_date = this.timeData[0]
        paramsData.end_date = this.timeData[1]
        const res = await searchAll({ ...pageData, ...paramsData })
        if (res.code === 1) {
          this.tableData = res.data.records
          this.total = res.data.total
          paramsData = {}
          if (data) {
            this.$message.success(res.message)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
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
          const state = this.add(this.ruleForm)
          if (state) {
            Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
            this.ruleForm.serial_num = getProjectNum()
            this.search()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 调取添加接口的方法
    async add(data) {
      try {
        const res = await Add({ ...data })
        if (res.code === 1) {
          this.$message.success(res.message)
          return true
        } else {
          // this.$message.error(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 重置事件
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 切换每页条数
    handleSizeChange(val) {
      this.pageSize = val
      this.search()
    },
    // 切换当前页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.search()
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
.delete_btn_class {
  /* padding-top: 5px; */
  /* line-height: 8 !important; */
  margin-left: 20px;
  padding: 30px 15px;
}
::v-deep .delete_btn_class span {
  writing-mode: tb-rl;
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
.el-pagination {
  margin: 15px 0 0 0;
  text-align: center;
}
.search_box {
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}
.span_color {
  margin-right: 0.625rem;
}
</style>
