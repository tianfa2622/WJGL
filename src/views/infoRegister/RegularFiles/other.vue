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
            <span>其他文件登记</span>
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
            <el-button v-if="BtnType !== 'View'" style="float: right;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <!-- <el-button style="float: right; padding: 3px 10px" type="text" @click="resetForm('ruleForm')">重置</el-button> -->
          </div>
          <el-form ref="ruleForm" :disabled="disabled" :model="ruleForm" :rules="rules" label-width="125px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="流水号：" required>
                  <span>{{ ruleForm.serial_num }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文号：">
                  <el-input v-model="ruleForm.reference_num" placeholder="请输入文号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文内容：" prop="content">
                  <el-input v-model="ruleForm.content" resize="none" type="textarea" :rows="4" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收文时间：" prop="finish_date">
                  <el-date-picker v-model="ruleForm.finish_date" type="datetime" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                </el-form-item>
                <el-form-item label="联系人：" prop="phone_name">
                  <el-input v-model="ruleForm.phone_name" placeholder="请输入联系人"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文份数：" prop="number">
                  <el-input v-model.number="ruleForm.number" placeholder="请输入份数"></el-input>
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
                <el-form-item label="来文单位：" prop="company">
                  <!-- <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select> -->
                  <el-input v-model="ruleForm.company" placeholder="请输入单位"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="登记日期：">
                  <el-date-picker v-model="ruleForm.creat_date" type="datetime" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="上级领导批示：">
                  <el-input v-model="ruleForm.sjldps" type="textarea" :rows="3" placeholder="请输入内容" resize="none"> </el-input>
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
                  <el-input v-model="ruleForm.bmjzyj" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注：">
                  <el-input v-model="ruleForm.comment" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
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
            <el-col :span="18">
              <el-button v-for="(ld, index) in Ldlist" :key="index" plain class="leadershipBtn" :disabled="disabled" @click="addDomain(ld)">
                {{ ld.name }}
              </el-button>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center" style="margin-top:20px">
            <el-col :span="22">
              <el-card v-for="(item, index) in ruleForm.sclds" :key="index" class="box-card">
                <el-row type="flex" justify="space-between" align="middle">
                  <el-col :span="20">
                    <el-form ref="InstructionsForm" :model="item.InstructionsForm" :disabled="disabled === true ? disabled : item.read_circle" label-width="90px" class="demo-dynamic">
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
                    <el-button type="danger" class="delete_btn_class" :disabled="disabled" @click="delInstructions(index)">删 除</el-button>
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
            <el-form ref="FinishForm" :model="bjsj" :disabled="disabled === true ? disabled : bjsj.accom" label-width="90px" class="demo-dynamic">
              <el-col :span="18">
                <el-form-item label="办结时间：">
                  <el-date-picker v-model="bjsj.conclude_data" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                  <el-button style="margin-left:30px" type="primary" @click="bjsj.accom = true">{{ bjsj.accom === true ? '已办结' : '办结' }}</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="备注：">
                  <el-input v-model="bjsj.comment" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
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
        <template v-if="BtnType !== 'Add'">
          <el-card v-if="$store.state.code == 1" class="box-card  Children">
            <div slot="header" class="clearfix">
              <span>推送</span>
            </div>
            <div class="table">
              <div style="margin-bottom:10px">
                <el-button :disabled="disabled" @click="selectPersonnel">选择人员</el-button>
              </div>
              <div class="table_content">
                <el-table :data="personnelTableData" border style="width: 100%">
                  <el-table-column type="index" label="序号" width="50" align="center" :resizable="false"> </el-table-column>
                  <el-table-column prop="name" label="姓名" :resizable="false" align="center"> </el-table-column>
                  <el-table-column prop="phone" label="手机号" :resizable="false" align="center"> </el-table-column>
                  <el-table-column prop="organization" label="单位" :resizable="false" align="center"> </el-table-column>
                  <el-table-column prop="feedbackMessage" label="反馈信息" :resizable="false" align="center"> </el-table-column>
                  <el-table-column prop="fileStatus" label="状态" :resizable="false" align="center">
                    <template slot-scope="scope">
                      <span v-if="scope.row.fileStatus === '0'">签收</span>
                      <span v-if="scope.row.fileStatus === '1'">已签收</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- <div v-if="personnelTableData.length">
                <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
              </div> -->
            </div>
          </el-card>
        </template>
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
            <span class="span_color">收文时间:</span>
            <el-date-picker v-model="timeData" type="daterange" range-separator="-" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
          </el-col>
          <el-col :span="6" style="margin-top:15px;text-align:center">
            <el-button style="width:150px" @click="search(conditionInputs)">查询</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%" height="500" @selection-change="handleSelectionChange">
          <el-table-column label="全选" type="selection" width="50px" :resizable="false"></el-table-column>
          <el-table-column label="序号" type="index" width="50px" align="center" :resizable="false"></el-table-column>
          <el-table-column label="文件类型" prop="file_type" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="流水号" prop="serial_num" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="收文时间" prop="finish_date" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="文号" prop="reference_num" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="来文单位" prop="company" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="来文内容" prop="content" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="登记人" prop="registrant" align="center" :resizable="false"> </el-table-column>
          <el-table-column label="文件状态" prop="file_status" align="center" :resizable="false">
            <template slot-scope="scope">
              <span v-if="scope.row.file_status === 1">未办结</span>
              <span v-if="scope.row.file_status === 0">已办结</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" :resizable="false">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row)">查看</el-link>
              <el-link type="primary" class="ml_15" @click="tableModify(scope.row)">修改</el-link>
              <el-link type="danger" class="ml_15" @click="tabeleDel(scope.row)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
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
          <el-input v-model.number="dialogData.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchPersonnelInfo(dialogData)">搜索</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top:10px">
        <el-table ref="moviesTable" :data="dialogTableData" border style="width: 100%" height="500" @selection-change="dialogSelectionChange">
          <el-table-column label="全选" type="selection" width="50px" :resizable="false"></el-table-column>
          <el-table-column type="index" label="序号" width="50" :resizable="false"> </el-table-column>
          <el-table-column prop="name" label="姓名" :resizable="false"> </el-table-column>
          <el-table-column prop="phone" label="手机号" :resizable="false"> </el-table-column>
          <el-table-column label="操作" width="60" :resizable="false">
            <template slot-scope="scope">
              <el-link type="primary" @click="choose(scope.row)">选择</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination :current-page="currentPage1" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="total1" @size-change="handleSizeChange1" @current-change="handleCurrentChange1"> </el-pagination>
      <div slot="footer">
        <el-button type="primary" @click="close">关 闭</el-button>
        <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SignFordialog from './Dialog/othersignFordialog'
import LogDialog from '@/components/LogDialog.vue'
// import LogDialog from './LogDialog/otherDialog'
import { searchAll, Add, Del, getDicGroupBy, searchOne, ModifyApi, searchAlreadyPush, searchCanPush } from '@/api/infoRegister/RegularFiles/other'
import { validatePhoneTwo, validateContacts, validateNumber } from '@/utils/verification'
import { getProjectNum } from '@/utils/comm'
import dayjs from 'dayjs'
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
        registrant_company: '厅长秘书处',
        creat_date: new Date(),
        finish_date: new Date(),
        sclds: [],
        accomPlishes: [],
        reference_num: null,
        content: null,
        phone_name: null,
        number: 1,
        phone: null,
        company: null,
        sjldps: null,
        bmjzyj: null,
        file_type: 5,
        comment: null
      },
      rules: {
        phone_name: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        // creat_date: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        finish_date: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        company: [{ required: true, message: '请选择单位', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        phone: [
          { required: false, trigger: 'blur' },
          { validator: validatePhoneTwo, trigger: 'blur' }
        ],
        number: [
          { required: false, trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        hz: [{ validator: validateContacts, trigger: 'blur' }]
      },
      // options: [],
      blqkSelect: [
        { label: '未办结', value: 1 },
        { label: '已办结', value: 0 }
      ],
      conditionInputs: {},
      timeData: [],
      tableData: [],
      // 当前页面
      currentPage: 1,
      // 当前展示条数
      pageSize: 10,
      // 总数
      total: 20,
      // 领导数据
      Ldlist: [],
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
      dialogData: {},
      // 选择人员弹出层表格数据项
      dialogTableData: [{ name: '123' }],
      // 选择人员弹出层表格选择项
      Selection: [],
      // 是否显示弹出层
      dialogFormVisible: false,
      // 文件类型
      wj_Type: [
        { value: 1, label: '呈批件' },
        { value: 2, label: '上级来文' },
        { value: 3, label: '平级和下级来文' },
        { value: 4, label: '群众来信' },
        { value: 5, label: '其他' },
        { value: 6, label: '上级督办件' },
        { value: 7, label: '厅批督办件' },
        { value: 8, label: '政协提案' },
        { value: 9, label: '人大建议' }
      ],
      bjsj: {
        conclude_data: new Date(),
        accom: false,
        _id: getProjectNum(),
        comment: null
      },
      disabled: false,
      BtnType: 'Add',
      OldData: {},
      currentPage1: 1,
      // 选择人员当前展示条数
      pageSize1: 10,
      // 选择人员总数
      total1: 20,
      // 暂时有问题
      cid: 2
    }
  },
  created() {
    this.row = this.$route.params.row
    if (this.row) {
      this.tableView(this.row)
    }
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
        if (this.timeData !== null && this.timeData.length > 0) {
          paramsData.start_date = this.timeData[0]
          paramsData.end_date = this.timeData[1]
        }
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
    // 获取领导数据
    async getLdList() {
      const res = await getDicGroupBy()
      if (res.code === 1) {
        this.Ldlist = res.data
      } else {
        this.$message('获取领导数据失败')
      }
    },
    // 调取添加接口的方法
    async add(data) {
      data.file_type = 5
      try {
        const res = await Add({ ...data })
        if (res.code === 1) {
          this.$message.success(res.message)
          Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
          Object.assign(this.$data.bjsj, this.$options.data().bjsj)
          this.BtnType = 'Add'
          this.search()
        } else {
          // this.$message.error(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 调取修改接口的方法
    async Modify(data) {
      data.file_type = 5
      try {
        const obj = {}
        obj.beforeDataChange = this.OldData
        obj.AfterDataChange = data
        const res = await ModifyApi(data.id, obj)
        if (res.code === 1) {
          this.$message.success(res.message)
          Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
          Object.assign(this.$data.bjsj, this.$options.data().bjsj)
          this.search()
          this.BtnType = 'Add'
        } else {
          // this.$message.error(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 表格查看按钮
    async tableView(row) {
      try {
        const res = await searchOne({ id: row.id })
        if (res.code === 1) {
          this.disabled = true
          this.searchAlreadyPushInfo({ id: 1 })
          this.$message.success(res.message)
          this.BtnType = 'View'
          this.ruleForm = res.data
          if (this.ruleForm.accomPlishes !== null && this.ruleForm.accomPlishes.length > 0) {
            this.bjsj = this.ruleForm.accomPlishes[0]
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 表格修改按钮
    async tableModify(row) {
      try {
        const res = await searchOne({ id: row.id })
        if (res.code === 1) {
          this.BtnType = 'Modify'
          this.disabled = false
          this.searchAlreadyPushInfo({ id: 1 })
          this.OldData = JSON.parse(JSON.stringify(res.data))
          if (res.data.sclds === null) {
            res.data.sclds = []
          }
          if (res.data.accomPlishes !== null && res.data.accomPlishes.length > 0) {
            this.bjsj = res.data.accomPlishes[0]
          } else {
            res.data.accomPlishes = []
          }
          this.ruleForm = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 表格删除按钮
    tabeleDel(row) {
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          const res = await Del({ id: row.id })
          if (res.code === 1) {
            this.$message.success(res.data)
            this.search()
          } else {
            // this.$message.error(res.message)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
        this.ruleForm.sclds.splice(index, 1)
      }
    },
    // 保存信息事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.creat_date = dayjs(this.ruleForm.creat_date).format('YYYY-MM-DD HH:mm:ss')
          this.ruleForm.finish_date = dayjs(this.ruleForm.finish_date).format('YYYY-MM-DD HH:mm:ss')
          if (this.ruleForm.sclds.length > 0) {
            this.ruleForm.sclds.forEach(e => {
              e.instructions_data = dayjs(e.instructions_data).format('YYYY-MM-DD HH:mm:ss')
            })
          }
          if (this.bjsj.comment) {
            const obj = this.bjsj
            obj.conclude_data = dayjs(obj.conclude_data).format('YYYY-MM-DD HH:mm:ss')
            this.ruleForm.accomPlishes.push(obj)
          }
          switch (this.BtnType) {
            case 'Add':
              this.add(this.ruleForm)
              break
            case 'Modify':
              this.Modify(this.ruleForm)
              break
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 查询已推送人员的API
    async searchAlreadyPushInfo(cid) {
      try {
        const res = await searchAlreadyPush(cid)
        if (res.code === 1) {
          this.personnelTableData = res.data
        } else {
          this.$message.error('查询已推送人员失败！')
        }
      } catch (error) {
        // console.log(error)
      }
    },
    // 推送模块选择人员按钮
    selectPersonnel() {
      this.dialogFormVisible = true
      this.searchPersonnelInfo()
    },
    // 选择人员弹出层搜索按钮
    async searchPersonnelInfo(data) {
      try {
        const page = {}
        page.current = this.currentPage1
        page.size = this.pageSize1
        page.id = this.cid // 有问题，数据定死
        const res = await searchCanPush({ ...page, ...data })
        if (res.code === 1) {
          if (data) this.$message.success(res.message)
          if (res.data === null) {
            this.dialogTableData = res.data
            this.total1 = 0
          } else {
            this.dialogTableData = res.data.records
            this.total1 = res.data.total
          }
          this.currentPage1 = 1
        } else {
          this.$message.error(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 选择人员切换每页条数
    handleSizeChange1(val) {
      this.pageSize = val
      this.searchPersonnelInfo()
    },
    // 选择人员切换当前页码
    handleCurrentChange1(val) {
      this.currentPage = val
      this.searchPersonnelInfo()
    },
    // 日志按钮
    LogBtn() {
      this.logDialogVisible = true
    },
    // 扫码签收
    ScanCodeToSign() {
      this.sigDialogVisible = true
    },
    // 重置事件
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // },
    // 表格中操作>签收事件
    signForevent(row) {
      console.log(row)
      this.sigDialogVisible = true
    },
    // 组件传参->接收参数
    getsig(data) {
      this.sigDialogVisible = data
    },
    // 组件传参->接收参数 关闭日志
    SetClose(data) {
      this.logDialogVisible = data
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
    // 表格选择项发生变化时
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    // 选择人员弹出层表格选择项发生变化时
    dialogSelectionChange(val) {
      console.log(val)
      this.Selection = val
    },
    // 选择人员弹出层表格选择按钮
    choose(row) {
      console.log(row)
      this.$refs.moviesTable.toggleRowSelection(row)
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
.search_box {
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}
.span_color {
  margin-right: 0.625rem;
}
.ml_15 {
  margin-left: 0.9375rem;
}
</style>
