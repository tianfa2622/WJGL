<template>
  <div>
    <div class="container">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center;">
          <span>活动管理</span>
        </div>

        <el-button type="primary" icon="el-icon-plus" @click="addOneLine">添加一行</el-button>

        <el-table :data="tableData" border style="width: 100%;margin-top:10px" max-height="500px" :row-class-name="tableRowClassName" @cell-click="tabClick">
          <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
          <el-table-column label="参加领导" :resizable="false" prop="leadershiptext" align="center">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.index === tabClickIndex && tabClickLabel == '参加领导'">
                <el-link type="primary" @click="selectLeadership(scope.row)">选择领导</el-link>
              </span> -->
              <span>{{ scope.row.leadershiptext }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开始日期至结束日期" width="220px" :resizable="false" prop="rqfw" align="center">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.index === tabClickIndex && tabClickLabel == '开始日期至结束日期'">
                <el-link type="primary" @click="selectDateRange(scope.row)">选择日期范围</el-link>
              </span> -->
              <span>{{ scope.row.rqfw }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上午/下午/晚上" :resizable="false" prop="date_duan" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.index === tabClickIndex && tabClickLabel == '上午/下午/晚上'">
                <el-select v-model="scope.row.date_duan" placeholder="请选择内容" @change="inputBlur">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </span>
              <span v-else>{{ scope.row.date_duan }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间段" :resizable="false" prop="sjd" align="center">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.index === tabClickIndex && tabClickLabel == '时间段'">
                <el-link type="primary" @click="selecttime(scope.row)">选择时间段</el-link>
              </span> -->
              <span>{{ scope.row.sjd }}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动名称" :resizable="false" prop="activity_name" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.index === tabClickIndex && tabClickLabel == '活动名称'">
                <el-input v-model="scope.row.activity_name" placeholder="请输入活动名称" @blur="inputBlur"></el-input>
              </span>
              <span v-else>{{ scope.row.activity_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="会议地点" :resizable="false" prop="activity_place" align="center">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.index === tabClickIndex && tabClickLabel == '会议地点'">
                <el-link type="primary" @click="selectplace(scope.row)">选择地点</el-link>
              </span> -->
              <span>{{ scope.row.activity_place }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px" :resizable="false" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="clearData(scope.$index, scope.row)">清空</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:10px;text-align:end;">
          <el-button type="primary" style="width:350px" @click="ConfirmAdd">确认添加活动</el-button>
        </div>
      </el-card>
    </div>

    <el-card class="box-card">
      <el-row type="flex" justify="space-around" class="search_box">
        <el-col :span="7">
          <span class="span_color">活动类型:</span>
          <el-select v-model="conditionInputs.activity_type" clearable placeholder="请选择">
            <el-option v-for="item in hdlxSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="9">
          <span class="activity_site">地点:</span>
          <el-input v-model="conditionInputs.activity_place" style="width:70%" placeholder="请输入地点" clearable> </el-input>
        </el-col>
        <el-col :span="7">
          <span class="span_color">内容:</span>
          <el-input v-model="conditionInputs.content" style="width:70%" placeholder="请输入内容" clearable> </el-input>
        </el-col>
        <el-col :span="7" style="margin-top:15px">
          <span class="span_color">参加领导:</span>
          <el-select v-model="conditionInputs.leadership" clearable placeholder="请选择">
            <el-option v-for="item in Ldlist" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="9" style="margin-top:15px">
          <span class="span_color">时间:</span>
          <el-date-picker v-model="timeData" type="daterange" range-separator="-" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
        </el-col>
        <el-col :span="7" style="margin-top:15px;text-align:center">
          <el-button style="width:150px" @click="search(conditionInputs)">查询</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableDatatwo" border style="width: 100%" height="500">
        <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
        <el-table-column label="活动类型" align="center">
          <template slot-scope="scope">
            <template v-for="item in hdlxSelect">
              <span v-if="item.value === scope.row.activity_type" :key="item.value">{{ item.value }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="流水号" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="tableEdit(scope.$index, scope.row.serial_num)">{{ scope.row.serial_num }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="start_date" align="center"> </el-table-column>
        <el-table-column label="上午/下午/晚上" width="130px" prop="date_duan" align="center"> </el-table-column>
        <el-table-column label="地点" prop="activity_place" align="center"> </el-table-column>
        <el-table-column label="来文内容" prop="content" width="300px" align="center"> </el-table-column>
        <el-table-column label="参加领导" prop="leadership" align="center">
          <template slot-scope="scope">
            <div v-for="i in scope.row.leadership" :key="i.leadership_name">
              <template v-for="j in Ldlist">
                <span v-if="i.leadership_name === j.id" :key="j.id">{{ j.name }}</span>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="参加人员" prop="participant" align="center"> </el-table-column>
        <el-table-column label="登记人" prop="registrant" align="center"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="signForevent(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
    </el-card>

    <!-- 活动管理添加活动对话框 -->
    <el-dialog :title="title" :visible.sync="DialogVisible" width="30%" center @close="HDcencel">
      <div v-if="title === '选择领导'">
        <el-checkbox-group v-model="leadership">
          <el-checkbox v-for="(ld, index) in Ldlist" :key="index" :label="ld.id" border>{{ ld.name }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-if="title === '选择日期范围'" style="text-align:center;">
        <el-date-picker v-model="rqsj" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="daterange" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期" @change="handleChangeSelect"> </el-date-picker>
      </div>
      <div v-if="title === '选择时间段'">
        <el-row type="flex" justify="space-around">
          <el-col :span="11">
            <el-time-select
              v-model="start_hour_date"
              placeholder="起始时间"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
            >
            </el-time-select>
          </el-col>
          <el-col :span="11">
            <el-time-select
              v-model="end_hour_date"
              placeholder="结束时间"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: start_hour_date
              }"
              @change="handleChangePeriod"
            >
            </el-time-select>
          </el-col>
        </el-row>
      </div>
      <div v-if="title === '选择会议地点'">
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="3">
            <span>会议地点</span>
          </el-col>
          <el-col :span="5">
            <el-select v-model="location" placeholder="请选择" @change="searchSubordinate">
              <el-option v-for="item in Onelist" :key="item.site" :label="item.site" :value="item.site"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="15">
            <el-select v-model="SpecificLocations" style="width:100%" placeholder="请选择">
              <el-option v-for="item in place" :key="item.place_name" :label="item.place_name" :value="item.place_name"> </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-top:10px" justify="space-between" align="middle">
          <el-col :span="3"></el-col>
          <el-col :span="21">
            <el-input v-model="SpecificLocations" disabled> </el-input>
          </el-col>
        </el-row>
      </div>
      <span v-if="title === '选择领导' || title === '选择会议地点'" slot="footer" class="dialog-footer">
        <el-button @click="HDcencel">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 活动编辑弹出框 -->
    <el-dialog :visible.sync="EditDialogVisible" width="70%" center :show-close="false" :close-on-click-modal="false">
      <div slot="title">
        <el-row type="flex" align="middle" justify="space-around">
          <el-col :span="8"></el-col>
          <el-col :span="8" style="text-align:center;">
            <span class="edit_dialog_title">活动编辑</span>
          </el-col>
          <el-col :span="8" style="text-align: end;">
            <el-button @click="close">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
      <el-card class="box-card">
        <!-- 头部按钮 -->
        <div slot="header" class="clearfix">
          <el-row type="flex" justify="space-around" align="middle">
            <el-col :span="8">
              <span class="edit_dialog_title">基本信息</span>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8" style="text-align: end;">
              <el-button type="primary" @click="save">保存</el-button>
              <el-button type="primary" @click="submit">提交</el-button>
            </el-col>
          </el-row>
        </div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <el-form-item label="流水号：" prop="name">
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
                <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="活动类型：" prop="name">
                <el-select v-model="ruleForm.name" style="width:100%" placeholder="请选择内容">
                  <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <el-form-item label="时间：" prop="name">
                <el-row type="flex" justify="center">
                  <el-date-picker v-model="date1" style="width:100%" type="daterange" range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-row>
                <el-row type="flex" style="margin-top:5px" justify="space-between">
                  <el-time-select
                    v-model="Time1"
                    placeholder="起始时间"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30'
                    }"
                  >
                  </el-time-select>
                  <el-col :span="1"></el-col>
                  <el-time-select
                    v-model="Time2"
                    placeholder="结束时间"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                      minTime: Time1
                    }"
                  >
                  </el-time-select>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="会议地点" prop="name">
                <el-row type="flex" justify="space-between" align="middle">
                  <el-col :span="8">
                    <el-select v-model="location" placeholder="请选择">
                      <el-option v-for="item in Ldlist" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="15">
                    <el-select v-model="SpecificLocations" style="width:100%" placeholder="请选择" @change="selectLocation">
                      <el-option v-for="item in place" :key="item.place_name" :label="item.place_name" :value="item.place_name"> </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top:5px">
                  <el-col :span="24">
                    <el-input v-model="input"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <el-form-item label="内容：" prop="name">
                <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="备注：" prop="name">
                <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <el-form-item label="参加领导：" prop="name">
                <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="参加人员：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="参加人数：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <el-form-item label="联系单位：" prop="name">
                <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10"></el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <el-form-item label="联系人：">
                <el-input v-model="ruleForm.name" placeholder="请输入联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10"></el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <el-form-item label="联系电话：">
                <el-input v-model="ruleForm.name" placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10"></el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <el-form-item label="传真：">
                <el-input v-model="ruleForm.name" placeholder="请输入传真"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10"></el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10">
              <el-form-item label="附件：">
                <el-upload action="" :on-remove="handleRemove" :on-exceed="handleExceed" :before-remove="beforeRemove" :multiple="false" :limit="1" :file-list="fileList" :auto-upload="false">
                  <el-link type="danger">添加附件</el-link>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="10"></el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10"></el-col>
            <el-col :span="10">
              <el-form-item label="登记人：">
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
                <span>{{ ruleForm.name ? ruleForm.name : '王湘琴' }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { searchOneDirectory, searchTwoDirectory, searchAll, searchOne, AddList, ModifyApi, Del, getDicGroupBy } from '@/api/shakyrun/index'
export default {
  data() {
    return {
      // 活动框表格
      tableData: [
        {
          date_duan: null,
          sjd: null,
          activity_name: null,
          leadershiptext: null,
          leadership: [],
          rqfw: null,
          // activity_comment: null,
          start_hour_date: null,
          end_hour_date: null,
          start_date: null,
          end_date: null,
          activity_site: null,
          activity_place: null
        }
      ],
      rqsj: [],
      start_hour_date: '', // 选择时间段开始时间
      end_hour_date: '', // 选择时间段结束时间
      location: '', // 一级地点
      SpecificLocations: '', // 二级地点
      tabClickIndex: null, // 当前点击的单元格
      tabClickLabel: '', // 当前点击的列名
      title: '', // 添加活动弹出层标题
      rowIndex: '',
      // 查询表格
      tableDatatwo: [
        {
          wjlx: '活动管理'
        }
      ],
      // 查询条件
      conditionInputs: {},
      // 活动表格选择 早/下/晚
      options: [
        { label: '上午', value: '上午' },
        { label: '下午', value: '下午' },
        { label: '晚上', value: '晚上' }
      ],
      // 活动类型选择
      options4: [{ label: '会议', value: '会议' }],
      // 二级地点选择内容
      place: [],
      timeData: [],
      // 搜索框活动类型下拉框数据
      hdlxSelect: [
        { label: '全部', value: '全部' },
        { label: '会议', value: '会议' }
      ],
      // 当前页面
      currentPage: 1,
      // 当前展示条数
      pageSize: 10,
      // 总数
      total: 20,
      // options: [],
      DialogVisible: false,
      EditDialogVisible: false, // 是否显示活动编辑弹出层
      ruleForm: {
        name: ''
      },
      rules: [],
      date1: [],
      Time1: '',
      Time2: '',
      fileList: [],
      input: '', // 活动管理选择活动地点框中的输入框
      // 领导数据
      Ldlist: [],
      // DirectoryList: [],
      // 活动管理选择领导的数据
      leadership: [],
      Onelist: []
    }
  },
  created() {
    this.getLdList()
    this.getDirectory()
    this.search()
  },
  methods: {
    // 获取领导数据
    async getLdList() {
      const res = await getDicGroupBy()
      if (res.code === 1) {
        this.Ldlist = res.data
      } else {
        this.$message('获取领导数据失败')
      }
    },
    // 获取会议地点数据
    async getDirectory() {
      const res = await searchOneDirectory()
      if (res.code === 1) {
        this.Onelist = res.data
      } else {
        this.$message('获取会议地点数据失败！')
      }
    },
    // 一级地点值改变时触发
    async searchSubordinate() {
      const res = await searchTwoDirectory({ site: this.location })
      if (res.code === 1) {
        this.place = res.data.place
      } else {
        this.$message('获取二级会议地点数据失败！')
      }
    },
    // 添加活动管理弹出确定按钮
    determine() {
      switch (this.title) {
        case '选择领导':
          if (this.leadership.length > 0) {
            let name = ''
            this.leadership.forEach(e => {
              const obj = {}
              obj.leadership_name = e
              this.tableData[this.tabClickIndex].leadership.push(obj)
              this.Ldlist.forEach(j => {
                if (e === j.id) {
                  name += `${j.name} `
                }
              })
            })
            this.tableData[this.tabClickIndex].leadershiptext = name
            this.leadership = []
          }
          break
        case '选择会议地点':
          this.tableData[this.tabClickIndex].activity_site = this.location
          this.tableData[this.tabClickIndex].activity_place = this.SpecificLocations
          this.location = null
          this.SpecificLocations = null
          break
        default:
          break
      }
      this.DialogVisible = false
    },
    HDcencel() {
      switch (this.title) {
        case '选择领导':
          this.leadership = []
          break
        case '选择会议地点':
          this.location = null
          this.SpecificLocations = null
          break
        default:
          break
      }
      this.DialogVisible = false
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每行的索引放进row
      row.index = rowIndex
    },
    // 添加明细原因   row 当前行 column 当前列
    tabClick(row, column, cell, event) {
      switch (column.label) {
        case '参加领导':
          this.tabClickIndex = row.index
          this.tabClickLabel = column.label
          this.DialogVisible = true
          // this.rowIndex = row.index
          this.title = '选择领导'
          break
        case '开始日期至结束日期':
          this.tabClickIndex = row.index
          this.tabClickLabel = column.label
          this.DialogVisible = true
          this.title = '选择日期范围'
          break
        case '时间段':
          this.tabClickIndex = row.index
          this.tabClickLabel = column.label
          this.DialogVisible = true
          this.title = '选择时间段'
          break
        case '活动名称':
          this.tabClickIndex = row.index
          this.tabClickLabel = column.label
          break
        case '上午/下午/晚上':
          this.tabClickIndex = row.index
          this.tabClickLabel = column.label
          break
        case '会议地点':
          this.tabClickIndex = row.index
          this.tabClickLabel = column.label
          this.DialogVisible = true
          this.title = '选择会议地点'
          break
        default:
      }
      console.log('添加明细原因', this.tabClickIndex, row, column, cell, event)
    },
    // 处理上午/下午/晚上表格列选择框失去焦点时
    inputBlur() {
      this.tabClickIndex = null
      this.tabClickLabel = ''
    },
    // 清空当前列数据 || 删除当前列
    clearData(index, row) {
      console.log(index, row)
      // this.tableData.splice(index, 1)
      Object.assign(this.$data.tableData[index], this.$options.data().tableData[0])
    },
    // 日期范围选中时处理函数
    handleChangeSelect(data) {
      let rqfw = ''
      rqfw = data[0] + ' 至 ' + data[1]
      this.tableData[this.tabClickIndex].rqfw = rqfw
      this.tableData[this.tabClickIndex].start_date = data[0]
      this.tableData[this.tabClickIndex].end_date = data[1]
      this.DialogVisible = false
      this.rqsj = []
    },
    // 时间段选中时处理函数
    handleChangePeriod() {
      let sjd = ''
      sjd = this.start_hour_date + ' 至 ' + this.end_hour_date
      this.tableData[this.tabClickIndex].sjd = sjd
      this.tableData[this.tabClickIndex].start_hour_date = this.start_hour_date
      this.tableData[this.tabClickIndex].end_hour_date = this.end_hour_date
      this.DialogVisible = false
      this.start_hour_date = null
      this.end_hour_date = null
    },
    // 选择会议地点时处理函数
    selectLocation() {
      // this.tableData[this.tabClickIndex].activity_comment = activity_comment
      // this.DialogVisible = false
      // this.location = null
      // this.SpecificLocations = null
    },
    // 添加一行的方法
    addOneLine() {
      this.tableData.push({
        date_duan: null,
        sjd: null,
        activity_name: null,
        leadershiptext: null,
        leadership: [],
        rqfw: null,
        // activity_comment: null,
        start_hour_date: null,
        end_hour_date: null,
        start_date: null,
        end_date: null,
        activity_site: null,
        activity_place: null
      })
    },
    // 确认添加活动
    ConfirmAdd() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].activity_name == null && this.tableData[i].activity_place == null && this.tableData[i].leadershiptext == null && this.date_duan == null && this.tableData[i].sjd == null && this.tableData[i].rqfw == null) {
          this.$message.info('请填写活动管理数据项！')
          return
          // this.tableData.splice(i, 1)
        } else if (this.tableData[i].leadershiptext == null) {
          this.$message.info('请填写活动管理参与领导！')
          return
        } else if (this.tableData[i].activity_name == null) {
          this.$message.info('请填写活动名称！')
          return
        } else {
          delete this.tableData[i].index
          delete this.tableData[i].rqfw
          delete this.tableData[i].sjd
          delete this.tableData[i].leadershiptext
          this.tableData[i].registrant = 'admin'
        }
      }
      this.AddEvent(this.tableData)
    },
    // 添加活动api
    async AddEvent(data) {
      const res = await AddList(data)
      if (res.code === 1) {
        this.$message.success(res.message)
      } else {
        this.$message.error(res.message)
      }
    },
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
        if (this.timeData !== null) {
          paramsData.start_date = this.timeData[0]
          paramsData.end_date = this.timeData[1]
        }
        const res = await searchAll({ ...pageData, ...paramsData })
        if (res.code === 1) {
          this.tableDatatwo = res.data.records
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
    // 点击表格流水号弹出编辑
    tableEdit(index, row) {
      console.log(index, row)
      this.EditDialogVisible = true
    },
    // 表格删除按钮
    signForevent(index, row) {
      console.log(index, row)
      this.tableDatatwo.splice(index, 1)
    },
    // 关闭按钮
    close() {
      this.EditDialogVisible = false
    },
    // 保存按钮
    save() {
      this.EditDialogVisible = false
    },
    // 提交按钮
    submit() {
      this.EditDialogVisible = false
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
  width: 80%;
  margin: 0 auto;
  margin-bottom: 15px;
}
/* .condition {
  font-size: 16px;
} */
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
.leadership_bt_class {
  margin-top: 10px;
}
.leadership_bt_class:first-child {
  margin-left: 10px;
}
.edit_dialog_title {
  font-size: 20px;
  font-weight: 800;
}
.search_box {
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}
.span_color {
  margin-right: 0.625rem;
}
.ml_15 {
  margin-left: 0.625rem;
}
</style>
