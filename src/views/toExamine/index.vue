<template>
  <div>
    <div class="container">
      <h3>呈批件上报信息审核</h3>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
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
              <el-button style="width:150px" @click="search">查询</el-button>
            </div>
          </div>
        </div>
        <el-table :data="tableDataOne" border style="width: 100%;height:550px;">
          <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column label="流水号" prop="adminName" align="center" width="180px">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row)">{{ scope.row.adminName }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="收文时间" prop="adminName" align="center" width="180px"> </el-table-column>
          <el-table-column label="文号" prop="adminName" align="center" width="180px"> </el-table-column>
          <el-table-column label="来文单位" prop="adminName" align="center" width="180px"> </el-table-column>
          <el-table-column label="来文内容" prop="adminName" align="center"> </el-table-column>
          <el-table-column label="办理情况" prop="adminName" align="center" width="180px">
            <template slot-scope="scope">
              <span v-if="scope.row.adminName === 0" class="color_red">未审核</span>
              <span v-if="scope.row.adminName === 1">已审核</span>
              <!-- <el-button v-else size="mini" @click="signForevent(scope.row)">签收</el-button> -->
              <span v-else>{{ scope.row.adminName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上报人员" prop="adminName" align="center" width="180px"> </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </el-card>
    </div>

    <!-- 根据流水号查询消息 -->
    <el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false" :show-close="false" width="65%">
      <div slot="title">
        <el-row type="flex" justify="space-around">
          <el-col :span="4">
            <el-button @click="LogBtn">日志</el-button>
          </el-col>
          <el-col :span="12" style="text-align: center;">
            <span class="col_span_title">呈批件编辑</span>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="handleToFormal">转为正式呈批件</el-button>
            <el-button type="danger" @click="ReturnFile">退回文件</el-button>
            <el-button @click="Close">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 基本信息 -->
      <el-card class="box-card  Children">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
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
              <el-form-item label="来文内容：" prop="name" required>
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
    </el-dialog>

    <LogDialog :is-show="logDialogVisible" @SetClose="SetClose" />
  </div>
</template>

<script>
import LogDialog from './LogDialog/toExamine.vue'
export default {
  components: {
    // 日志弹出组件
    LogDialog
  },
  data() {
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
      currentPage4: 1,
      blqkSelect: [],
      logDialogVisible: false, // 显示日志弹出框
      // 显示弹出层
      dialogFormVisible: false,
      // 弹出层基本信息数据
      ruleForm: {
        name: ''
      },
      // 弹出层基本信息数据规则
      rules: {
        name: [{ required: true, message: '请输入流水号', trigger: 'blur' }]
      },
      // 上传文件列表
      fileList: [],
      // 批示数据
      InstructionBox: [
        {
          InstructionsForm: {
            name: ''
          }
        }
      ]
    }
  },
  methods: {
    // 搜索按钮
    search() {},
    // 日志按钮
    LogBtn() {
      this.logDialogVisible = true
    },
    // 弹出层关闭
    Close() {
      this.$confirm('此操作将关闭该窗口, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.dialogFormVisible = false
        })
        .catch(() => {})
    },
    // 转为正式呈批件
    handleToFormal() {
      this.$confirm('此操作将转为正式呈批件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.dialogFormVisible = false
        })
        .catch(() => {})
    },
    // 退回文件按钮
    ReturnFile() {
      this.$prompt('请输入退回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '退回原因: ' + value
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消退回'
          })
        })
    },
    // 切换每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 切换当前页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
    // 表格点击流水号按钮
    tableView(row) {
      console.log(row)
      this.dialogFormVisible = true
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
.Children {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 15px;
}
.condition {
  width: 100%;
  /* height: 50px; */
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
.color_red {
  color: red;
}
.col_span_title {
  font-size: 16px;
  font-weight: 800;
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
.leadershipBtn:nth-child(n + 7) {
  margin-top: 10px;
}
.leadershipBtn:nth-child(8) {
  margin-top: 10px;
  /* margin-left: 0; */
}
</style>
