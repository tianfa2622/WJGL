<template>
  <div>
    <div class="container">
      <h3>呈批件上报信息审核</h3>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="condition">
            <div class="condition-col"><span style="margin-left:15px" />送呈单位:<el-input v-model="conditionInputs.song_company" placeholder="请输入内容" clearable> </el-input></div>
            <div class="condition-col">来文内容:<el-input v-model="conditionInputs.content" placeholder="请输入内容" clearable> </el-input></div>
            <div class="condition-col">登记时间:<el-date-picker v-model="timeData" type="daterange" range-separator="-" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker></div>
            <div class="condition-col">
              办理情况:<el-select v-model="conditionInputs.banli" clearable placeholder="请选择">
                <el-option v-for="item in blqkSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </div>
            <div class="condition-col">
              <el-button style="width:150px" @click="search(conditionInputs)">查询</el-button>
            </div>
          </div>
        </div>
        <el-table :data="tableDataOne" border style="width: 100%;" height="500">
          <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column label="流水号" align="center" width="180px">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row)">{{ scope.row.serial_num }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="登记日期" prop="creat_date" align="center" width="180px"> </el-table-column>
          <el-table-column label="文号" prop="reference_num" align="center" width="180px"> </el-table-column>
          <el-table-column label="送呈单位" prop="song_company" align="center" width="180px"> </el-table-column>
          <el-table-column label="来文内容" prop="content" align="center"> </el-table-column>
          <el-table-column label="办理情况" align="center" width="180px">
            <template slot-scope="scope">
              <span v-if="scope.row.banli === 1" class="color_red">未审核</span>
              <span v-else-if="scope.row.banli === 0">已审核</span>
              <span v-else>退回</span>
            </template>
          </el-table-column>
          <el-table-column label="上报人员" prop="registrant" align="center" width="180px"> </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
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
        <el-form ref="ruleForm" :disabled="true" :model="ruleForm" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="流水号：" required>
                <span>{{ ruleForm.serial_num }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人：">
                <el-input v-model="ruleForm.phone_name" placeholder="请输入联系人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="来文内容：">
                <el-input v-model="ruleForm.content" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="送呈单位：">
                <el-input v-model="ruleForm.song_company" placeholder="请选择单位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="登记日期：">
                <el-date-picker v-model="ruleForm.creat_date" type="datetime" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：">
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
          <el-col :span="4" style="text-align:center"><div style="padding:10px 0;">领导批示：</div></el-col>
          <el-col :span="18">
            <el-button v-for="(ld, index) in Ldlist" :key="index" plain class="leadershipBtn" :disabled="true" @click="addDomain(ld)">
              {{ ld.name }}
            </el-button>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center" style="margin-top:20px">
          <el-col :span="22">
            <el-card v-for="(item, index) in ruleForm.sclds" :key="index" class="box-card">
              <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="20">
                  <el-form ref="InstructionsForm" :disabled="true" label-width="90px" class="demo-dynamic">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="批示人：">
                          <span>{{ item.approved_by }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="16">
                        <el-form-item label="批示时间：">
                          <el-date-picker v-model="item.instructions_data" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                          <el-button style="margin-left:10px" @click="item.read_circle = true">{{ item.read_circle === true ? '已圈阅' : '圈阅' }}</el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="批示内容：">
                      <el-input v-model="item.content" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="3">
                  <el-button type="danger" class="delete_btn_class" :disabled="true" @click="delInstructions(index)">删 除</el-button>
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
                  <el-link type="danger" disabled>添加附件</el-link>
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
// eslint-disable-next-line no-unused-vars
import { getProjectNum } from '@/utils/comm'
import { searchAll, getDicGroupBy, searchOne, Audit } from '@/api/infoRegister/RegularFiles/instructions'
export default {
  components: {
    // 日志弹出组件
    LogDialog
  },
  data() {
    return {
      tableDataOne: [],
      conditionInputs: {},
      timeData: [],
      // 当前页面
      currentPage: 1,
      // 当前展示条数
      pageSize: 10,
      // 总数
      total: 20,
      // 领导数据
      Ldlist: [],
      blqkSelect: [
        { label: '未审核', value: 1 },
        { label: '已审核', value: 0 },
        { label: '退回', value: 2 }
      ],
      logDialogVisible: false, // 显示日志弹出框
      // 显示弹出层
      dialogFormVisible: false,
      // 弹出层基本信息数据
      ruleForm: {},
      // 上传文件列表
      fileList: []
    }
  },
  created() {
    this.search()
    this.getLdList()
  },
  methods: {
    // 搜索按钮
    async search(data) {
      try {
        const pageData = {}
        let paramsData = {}
        if (data) {
          this.currentPage = 1
        }
        pageData.pageIndex = this.currentPage
        pageData.pageSize = this.pageSize
        paramsData = { ...data }
        console.log(this.timeData)
        if (this.timeData !== null) {
          paramsData.start_date = this.timeData[0]
          paramsData.end_date = this.timeData[1]
        }
        const res = await searchAll({ ...pageData, ...paramsData })
        if (res.code === 1) {
          this.tableDataOne = res.data.records
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
    // 获取领导数据
    async getLdList() {
      const res = await getDicGroupBy()
      if (res.code === 1) {
        this.Ldlist = res.data
      } else {
        this.$message('获取领导数据失败')
      }
    },
    // 表格查看按钮
    async tableView(row) {
      this.dialogFormVisible = true
      try {
        const res = await searchOne({ id: row.id })
        if (res.code === 1) {
          this.$message.success(res.message)
          this.ruleForm = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
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
          const data = {}
          data.id = this.ruleForm.id
          data.username = this.ruleForm.registrant
          data.banli = 0
          this.Audit(data)
          // this.dialogFormVisible = false
        })
        .catch(() => {
          this.$message.info('已取消操作！')
        })
    },
    async Audit(data) {
      const self = this
      const res = await Audit({ ...data })
      if (res.code === 1) {
        this.dialogFormVisible = false
        this.$message.success(res.data)
        self.search()
      }
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
          const data = {}
          data.id = this.ruleForm.id
          data.username = this.ruleForm.registrant
          data.banli = 2
          data.cause = value
          this.Audit(data)
          // this.dialogFormVisible = false
          // this.$message({
          //   type: 'success',
          //   message: '退回原因: ' + value
          // })
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
      this.pageSize = val
      this.search()
    },
    // 切换当前页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.search()
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
    addDomain(data) {
      if (this.ruleForm.sclds !== []) {
        let XTnum = 0
        this.ruleForm.sclds.forEach(e => {
          if (data.name === e.approved_by) {
            XTnum += 1
          }
        })
        if (XTnum > 2) {
          this.$message.error('领导最多可批示3次！')
        } else {
          this.ruleForm.sclds.push({
            _id: getProjectNum(),
            approved_by: data.name,
            instructions_data: new Date(),
            content: '',
            read_circle: false
          })
        }
      } else {
        this.ruleForm.sclds.push({
          _id: getProjectNum(),
          approved_by: data.name,
          instructions_data: new Date(),
          content: '',
          read_circle: false
        })
      }
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
    downTemplate() {}
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
