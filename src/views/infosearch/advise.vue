<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>信息查询</el-breadcrumb-item>
          <el-breadcrumb-item>提案建议</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center;">
          <span>提案建议</span>
        </div>
        <div class="condition">
          <el-form ref="ruleForm" :model="ruleForm" label-width="125px" class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="文件类型：">
                  <el-radio-group v-model="ruleForm.checkList">
                    <el-radio label="政协提案" border>政协提案</el-radio>
                    <el-radio label="人大提案" border>人大提案</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="ruleForm.checkList === '政协提案'" justify="space-between">
              <el-col :span="8">
                <el-form-item label="流水号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入流水号"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span> -->
                </el-form-item>
                <el-form-item label="来文单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择来文单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="交办时间：">
                  <el-date-picker v-model="ruleForm.name" style="width:100%" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
                <el-form-item label="分办单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择分办单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="手机：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="登记人：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入登记人"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : '王湘琴' }}</span> -->
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="登记日期：">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="界别：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入界别"></el-input>
                </el-form-item>
                <el-form-item label="主办单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择主办单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="办公电话：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入办公电话"></el-input>
                </el-form-item>
                <el-form-item label="要求办结时间：">
                  <el-date-picker v-model="ruleForm.name" style="width:100%" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
                <el-form-item label="登记单位：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入登记单位"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : '厅长秘书处' }}</span> -->
                </el-form-item>
                <el-form-item label="界：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入界"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="标题：">
                  <!-- <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="4" placeholder="请输入内容"> </el-input> -->
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="政协提案编号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入提案编号"></el-input>
                </el-form-item>
                <el-form-item label="领衔委员：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入领衔委员"></el-input>
                </el-form-item>
                <el-form-item label="会办单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择会办单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="通讯地址：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入通讯地址"></el-input>
                </el-form-item>
                <el-form-item label="邮编：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入邮编"></el-input>
                </el-form-item>
                <el-form-item label="次：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入次"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-show="ruleForm.checkList === '人大提案'" justify="space-between">
              <el-col :span="8">
                <el-form-item label="流水号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入流水号"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span> -->
                </el-form-item>
                <el-form-item label="标题：" prop="name" required>
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="4" placeholder="请输入内容"> </el-input>
                </el-form-item>
                <el-form-item label="人大建议编号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入人大建议编号"></el-input>
                </el-form-item>
                <el-form-item label="领衔代表：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入领衔代表"></el-input>
                </el-form-item>
                <el-form-item label="会办单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择会办单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="通讯地址：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入通讯地址"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="登记人：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入登记人"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : '王湘琴' }}</span> -->
                </el-form-item>
                <el-form-item label="代表团：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入代表团"></el-input>
                </el-form-item>
                <el-form-item label="交办时间：">
                  <el-date-picker v-model="ruleForm.name" style="width:100%" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
                <el-form-item label="分办单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择分办单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="办公电话：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入办公电话"></el-input>
                </el-form-item>
                <el-form-item label="要求办结时间：">
                  <el-date-picker v-model="ruleForm.name" style="width:100%" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
                <el-form-item label="界：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入界"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="登记单位：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入登记单位"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : '厅长秘书处' }}</span> -->
                </el-form-item>
                <el-form-item label="来文单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择来文单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="主办单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择主办单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="手机号码：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="登记日期：">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="邮编：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入邮编"></el-input>
                </el-form-item>
                <el-form-item label="次：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入次"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- <el-row>
            <el-col :span="10">
              <span>文件类型：</span>
              <span>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="政协提案" border></el-checkbox>
                  <el-checkbox label="人大提案" border></el-checkbox>
                </el-checkbox-group>
              </span>
            </el-col>
            <el-col :span="8">收文时间：<el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker>-<el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker></el-col>
            <el-col :span="6">流水号：<el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input> </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>来文内容：</span>
              <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input>
            </el-col>
            <el-col :span="8"
              ><span>来文单位：</span> <el-select v-model="ruleForm.name" clearable placeholder="请选择"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
            ></el-col>
            <el-col :span="6"
              ><span>办理情况：</span> <el-select v-model="ruleForm.name" clearable placeholder="全部"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>文号：</span>
              <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input>
            </el-col>
            <el-col :span="8"><span>提案建议号：</span> <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>要求办结时间：</span>
              <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker>-<el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker>
            </el-col>
            <el-col :span="8">
              <span>实际办结时间：</span>
              <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker>-<el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>主办单位：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span>分办单位：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
            ></el-col>
            <el-col :span="6">
              <span>会办单位：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>批示人：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span>批示时间：</span>
              <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker>-<el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker>
            </el-col>
            <el-col :span="6">
              <span>批示内容：</span>
              <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>办结备注：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
              <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable style="width:200px;margin-left:10px;"> </el-input>
            </el-col>
            <el-col :span="8">
              <span>联系人：</span>
              <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable style="width:200px;margin-left:10px;"> </el-input>
            </el-col>
            <el-col :span="6">
              <span>联系电话：</span>
              <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable style="width:200px;margin-left:10px;"> </el-input>
            </el-col>
          </el-row> -->

          <el-row type="flex" justify="space-between">
            <el-col :span="12" style="line-height: 50px;">
              排序方式：
              <el-radio-group v-model="radio">
                <el-radio :label="1">厅领导</el-radio>
                <el-radio :label="2">批示时间</el-radio>
                <el-radio :label="3">流水号</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="8">
              <el-row type="flex" justify="center">
                <el-col :span="4">
                  <el-button plain @click="search">查询</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button plain @click="exportExcel">导出excel</el-button>
                </el-col>
                <el-col :span="6">
                  <el-upload ref="upload" action="" :on-change="handleChange" :on-remove="handleRemove" :show-file-list="false" :on-exceed="handleExceed" :limit="1" accept="" :auto-upload="false">
                    <el-button plain>导入excel</el-button>
                  </el-upload>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <el-table :data="tableData" border style="width: 100%;height:500px;">
          <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
          <el-table-column label="文件类型" prop="wjlx" width="150px" align="center"> </el-table-column>
          <el-table-column label="流水号" prop="wjlx" align="center" width="150px">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row)">{{ scope.row.wjlx }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="wjlx" label="督办号" width="150px" align="center"> </el-table-column>
          <el-table-column label="收文时间" prop="wjlx" width="150px" align="center"> </el-table-column>
          <el-table-column label="文号" prop="wjlx" align="center"> </el-table-column>
          <el-table-column label="来文单位" prop="wjlx" align="center"> </el-table-column>
          <el-table-column label="来文内容" prop="wjlx" width="150px" align="center"> </el-table-column>
          <el-table-column label="要求办结时间" prop="wjlx" width="150px" align="center"> </el-table-column>
          <el-table-column label="登记人" prop="wjlx" align="center" width="150px"> </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: { name: '', checkList: '政协提案' },
      checkList: [],
      options: [],
      radio: 3,
      tableData: [
        {
          wjlx: '督办件'
        }
      ],
      currentPage4: 1,
      fileData: [],
      outputs: []
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
    // 搜索按钮
    search() {},
    // 导出按钮
    exportExcel() {
      this.exportToExcel()
    },
    // excel 数据导出
    exportToExcel() {
      const tHeader = ['序号', '文件类型', '流水号', '督办号', '收文时间', '文号', '来文单位', '来文内容', '要求办结时间', '登记人']
      const filterVal = ['wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx']
      import('@/components/excel/Export2Excel').then(excel => {
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '一般文件列表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    // 导出数据处理
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 根据文件类型跳转到详情页
    tableView(row) {
      switch (row.wjlx) {
        case '政协提案':
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/plan', query: { lsh: 123456 } })
          break
        case '人大提案':
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/propose', query: { lsh: 123456 } })
          break
        default:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/plan', query: { lsh: 123456 } })
          break
      }
    },
    // 导入
    // 上传文件时处理方法
    // eslint-disable-next-line no-unused-vars
    handleChange(file, fileList) {
      console.log(file, fileList)
      this.fileData = file // 保存当前选择文件
      console.log(this.XLSX)
      this.readExcel() // 调用读取数据的方法
    },
    // 读取数据
    readExcel(e) {
      console.log(e)
      const that = this
      const files = that.fileData
      if (!files) {
        // 如果没有文件
        this.$message.info('请上传文件！')
        return false
      } else if (!/\.(xls|xlsx)$/.test(files.name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = ev => {
        try {
          const data = ev.target.result
          const workbook = this.XLSX.read(data, {
            type: 'binary'
          })
          if (workbook.SheetNames.length >= 1) {
            this.$message({
              message: '导入数据表成功',
              showClose: true,
              type: 'success'
            })
          }
          const wsname = workbook.SheetNames[0] // 取第一张表
          const ws = this.XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
          that.outputs = [] // 清空接收数据
          for (let i = 0; i < ws.length; i++) {
            // 健名为绑定 el 表格的关键字，值则是ws[i][对应表头名]
            const sheetData = {
              cid: ws[i]['序号'],
              username: ws[i]['姓名'],
              areanumber: ws[i]['行政区划代码'],
              types: ws[i]['巡逻人员类别'],
              number: ws[i]['编号'],
              phone: ws[i]['联系电话'],
              titleLevel: ws[i]['职称级别'],
              sex: ws[i]['性别'],
              experience: ws[i]['专业、经验能力'],
              report: ws[i]['是否上报']
            }
            that.tableData.tableList.unshift(sheetData)
          }
          this.$refs.Elsearch.$refs.upload.value = ''
          this.fileData = []
        } catch (error) {
          return false
        }
      }
      // 如果为原生 input 则应是 files[0]
      fileReader.readAsBinaryString(files.raw)
    },
    // 移除文件的操作方法
    // eslint-disable-next-line no-unused-vars
    handleRemove(file, fileList) {
      this.fileData = null
    },
    // 超出最大上传文件数量时的处理方法
    handleExceed() {
      this.$message({
        type: 'warning',
        message: '超出最大上传文件数量的限制！'
      })
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
