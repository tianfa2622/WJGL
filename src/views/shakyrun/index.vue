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
          <el-table-column label="参加领导" :resizable="false" prop="cjld" align="center">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.index === tabClickIndex && tabClickLabel == '参加领导'">
                <el-link type="primary" @click="selectLeadership(scope.row)">选择领导</el-link>
              </span> -->
              <span>{{ scope.row.cjld }}</span>
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
          <el-table-column label="上午/下午/晚上" :resizable="false" prop="swxwws" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.index === tabClickIndex && tabClickLabel == '上午/下午/晚上'">
                <el-select v-model="scope.row.swxwws" placeholder="请选择内容" @change="inputBlur">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </span>
              <span v-else>{{ scope.row.swxwws }}</span>
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
          <el-table-column label="活动名称" :resizable="false" prop="hdmc" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.index === tabClickIndex && tabClickLabel == '活动名称'">
                <el-input v-model="scope.row.hdmc" placeholder="请输入活动名称" @blur="inputBlur"></el-input>
              </span>
              <span v-else>{{ scope.row.hdmc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="会议地点" :resizable="false" prop="hydd" align="center">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.index === tabClickIndex && tabClickLabel == '会议地点'">
                <el-link type="primary" @click="selectplace(scope.row)">选择地点</el-link>
              </span> -->
              <span>{{ scope.row.hydd }}</span>
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
      <div class="condition">
        <div class="condition-col">
          活动类型:<el-select v-model="conditionInputs.hdlx" clearable placeholder="请选择">
            <el-option v-for="item in hdlxSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div class="condition-col">
          时间:<el-date-picker v-model="conditionInputs.sj1" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>-
          <el-date-picker v-model="conditionInputs.sj2" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
        </div>
        <div class="condition-col">地点:<el-input v-model="conditionInputs.dd" placeholder="请输入内容" clearable> </el-input></div>
        <div class="condition-col">内容:<el-input v-model="conditionInputs.nr" placeholder="请输入内容" clearable> </el-input></div>
        <div class="condition-col">
          参加领导:<el-select v-model="conditionInputs.cjld" clearable placeholder="请选择">
            <el-option v-for="item in cjldSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div class="condition-col">
          <el-button @click="search">查询</el-button>
        </div>
      </div>
      <el-table :data="tableDatatwo" border style="width: 100%;height:500px;">
        <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
        <el-table-column label="活动类型" prop="wjlx" align="center"> </el-table-column>
        <el-table-column label="流水号" prop="wjlx" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="tableEdit(scope.$index, scope.row)">{{ scope.row.wjlx }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="wjlx" align="center"> </el-table-column>
        <el-table-column label="上午/下午/晚上" width="130px" prop="wjlx" align="center"> </el-table-column>
        <el-table-column label="地点" prop="wjlx" align="center"> </el-table-column>
        <el-table-column label="来文内容" prop="wjlx" width="300px" align="center"> </el-table-column>
        <el-table-column label="参加领导" prop="wjlx" align="center"> </el-table-column>
        <el-table-column label="参加人员" prop="wjlx" align="center"> </el-table-column>
        <el-table-column label="登记人" prop="wjlx" align="center"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="signForevent(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
    </el-card>

    <!-- 活动管理添加活动对话框 -->
    <el-dialog :title="title" :visible.sync="DialogVisible" width="30%" center>
      <div v-if="title === '选择领导'">
        <el-button v-for="(o, index) in 8" :key="index" class="leadership_bt_class" @click="selectLd(`徐显辉${index}`)">徐显辉</el-button>
      </div>
      <div v-if="title === '选择日期范围'" style="text-align:center;">
        <el-date-picker v-model="rqsj" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="daterange" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期" @change="handleChangeSelect"> </el-date-picker>
      </div>
      <div v-if="title === '选择时间段'">
        <el-row type="flex" justify="space-around">
          <el-col :span="11">
            <el-time-select
              v-model="startTime"
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
              v-model="endTime"
              placeholder="结束时间"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: startTime
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
            <el-select v-model="location" placeholder="请选择">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="15">
            <el-select v-model="SpecificLocations" style="width:100%" placeholder="请选择" @change="selectLocation">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="3"></el-col>
          <el-col :span="20">
            <el-input v-model="input"></el-input>
          </el-col>
        </el-row>
      </div>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="timeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="timeDialogVisible = false">确 定</el-button>
      </span> -->
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
                      minTime: startTime
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
                      <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="15">
                    <el-select v-model="SpecificLocations" style="width:100%" placeholder="请选择" @change="selectLocation">
                      <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
export default {
  data() {
    return {
      tableData: [
        {
          swxwws: '上午',
          sjd: '08:00:00 至 12:00:00',
          hdmc: '活动名称',
          cjld: '参加领导',
          rqfw: '2021-04-11 至 2021-06-11',
          hydd: '会议地点'
        }
      ],
      rqsj: [],
      startTime: '', // 选择时间段开始时间
      endTime: '', // 选择时间段结束时间
      location: '',
      SpecificLocations: '',
      tabClickIndex: null, // 当前点击的单元格
      tabClickLabel: '', // 当前点击的列名
      title: '', // 添加活动弹出层标题
      rowIndex: '',
      tableDatatwo: [
        {
          wjlx: '活动管理'
        }
      ],
      conditionInputs: {
        hdlx: '',
        sj1: '',
        sj2: '',
        dd: '',
        nr: '',
        cjld: ''
      },
      options: [
        { label: '上午', value: '上午' },
        { label: '下午', value: '下午' },
        { label: '晚上', value: '晚上' }
      ],
      options1: [{ label: '省政府', value: '省政府' }],
      options4: [{ label: '会议', value: '会议' }],
      options2: [{ label: '省政府一办C座二楼常务会议室', value: '省政府一办C座二楼常务会议室' }],
      cjldSelect: [],
      hdlxSelect: [],
      currentPage4: 1,
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
      input: ''
    }
  },
  methods: {
    // 切换每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 切换当前页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
      Object.assign(this.$data.tableData[index], this.$options.data().tableData[index])
    },
    // 选择领导框按钮
    selectLd(data) {
      this.tableData[this.tabClickIndex].cjld = data
      this.DialogVisible = false
    },
    // 日期范围选中时处理函数
    handleChangeSelect(data) {
      let sjfw = ''
      sjfw = data[0] + ' 至 ' + data[1]
      this.tableData[this.tabClickIndex].rqfw = sjfw
      this.DialogVisible = false
      this.rqsj = []
    },
    // 时间段选中时处理函数
    handleChangePeriod() {
      let sjd = ''
      sjd = this.startTime + ' 至 ' + this.endTime
      this.tableData[this.tabClickIndex].sjd = sjd
      this.DialogVisible = false
      this.startTime = ''
      this.endTime = ''
    },
    // 选择会议地点时处理函数
    selectLocation() {
      let hydd = ''
      hydd = this.location + ' ' + this.SpecificLocations
      this.tableData[this.tabClickIndex].hydd = hydd
      this.DialogVisible = false
      this.location = ''
      this.SpecificLocations = ''
    },
    // 添加一行的方法
    addOneLine() {
      this.tableData.push({
        swxwws: '上午',
        sjd: '08:00:00 至 12:00:00',
        hdmc: '活动名称',
        cjld: '参加领导',
        rqfw: '2021-04-11 至 2021-06-11',
        hydd: '会议地点'
      })
    },
    // 确认添加活动
    ConfirmAdd() {},
    // 搜索按钮
    search() {},
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
  width: 70%;
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
</style>
