<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>信息查询</el-breadcrumb-item>
          <el-breadcrumb-item>一般文件</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center;">
          <span>一般文件</span>
        </div>
        <div class="condition">
          <el-form ref="ruleForm" :model="ruleForm" label-width="125px" class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="文件类型：">
                  <el-radio-group v-model="ruleForm.checkList">
                    <el-radio label="呈批件" border>呈批件</el-radio>
                    <el-radio label="上级来文" border>上级来文</el-radio>
                    <el-radio label="平级和下级来文" border>平级和下级来文</el-radio>
                    <el-radio label="群众来信" border>群众来信</el-radio>
                    <el-radio label="其他" border>其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="ruleForm.checkList === '呈批件'" justify="space-between">
              <el-col :span="8">
                <el-form-item label="流水号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入流水号"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span> -->
                </el-form-item>
                <el-form-item label="送呈单位：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请选择单位"></el-input>
                </el-form-item>
                <el-form-item label="部门警种意见：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="登记日期：">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请联系电话"></el-input>
                </el-form-item>
                <el-form-item label="文号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入文号"></el-input>
                </el-form-item>
                <el-form-item label="来文内容：">
                  <el-input v-model="ruleForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="ruleForm.checkList === '上级来文'" justify="space-between">
              <el-col :span="8">
                <el-form-item label="流水号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入流水号"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span> -->
                </el-form-item>
                <el-form-item label="联系人：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="来文份数：">
                  <el-input v-model.number="ruleForm.name" style="width:100%" placeholder="请输入份数"></el-input>
                </el-form-item>
                <el-form-item label="来文单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="部门警种意见：">
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收文时间：" prop="name">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="文号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入文号"></el-input>
                </el-form-item>
                <el-form-item label="登记日期：">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请联系电话"></el-input>
                </el-form-item>
                <el-form-item label="来文内容：">
                  <el-input v-model="ruleForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
                <el-form-item label="上级领导批示：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" placeholder="请输入内容" resize="none"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="ruleForm.checkList === '平级和下级来文'" justify="space-between">
              <el-col :span="8">
                <el-form-item label="流水号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入流水号"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span> -->
                </el-form-item>
                <el-form-item label="联系人：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="来文份数：">
                  <el-input v-model.number="ruleForm.name" style="width:100%" placeholder="请输入份数"></el-input>
                </el-form-item>
                <el-form-item label="来文单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="部门警种意见：">
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收文时间：" prop="name">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="文号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入文号"></el-input>
                </el-form-item>
                <el-form-item label="登记日期：">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请联系电话"></el-input>
                </el-form-item>
                <el-form-item label="来文内容：">
                  <el-input v-model="ruleForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
                <el-form-item label="上级领导批示：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" placeholder="请输入内容" resize="none"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="ruleForm.checkList === '群众来信'" justify="space-between">
              <el-col :span="8">
                <el-form-item label="流水号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入流水号"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span> -->
                </el-form-item>
                <el-form-item label="收件人：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="来文内容：">
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来信人：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入来信人"></el-input>
                </el-form-item>
                <el-form-item label="办理单位：" prop="name">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入办理单位"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="name">
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来信时间：">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="来信地址：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入来信地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="ruleForm.checkList === '其他'" justify="space-between">
              <el-col :span="8">
                <el-form-item label="流水号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入流水号"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span> -->
                </el-form-item>
                <el-form-item label="收文时间：">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="联系电话：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请联系电话"></el-input>
                </el-form-item>
                <el-form-item label="上级领导批示：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" placeholder="请输入内容" resize="none"> </el-input>
                </el-form-item>
                <el-form-item label="部门警种意见：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入文号"></el-input>
                </el-form-item>
                <el-form-item label="联系人：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="来文单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来文份数：">
                  <el-input v-model.number="ruleForm.name" style="width:100%" placeholder="请输入份数"></el-input>
                </el-form-item>
                <el-form-item label="登记日期：">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="来文内容：">
                  <el-input v-model="ruleForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- <el-col :span="10">
              <span>文件类型：</span>
              <span>
                <el-radio-group v-model="checkList">
                  <el-radio label="呈批件" border>呈批件</el-radio>
                  <el-radio label="上级来文" border>上级来文</el-radio>
                  <el-radio label="平级和下级来文" border>平级和下级来文</el-radio><br />
                  <el-radio label="群众来信" border style="margin-top:5px">群众来信</el-radio>
                  <el-radio label="其他" border style="margin-top:5px">其他</el-radio>
                </el-radio-group>
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
            <el-col :span="8">
              <span>来文单位：</span> <el-select v-model="ruleForm.name" clearable placeholder="请选择"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select>
            </el-col>
            <el-col :span="6">
              <span>办理情况：</span> <el-select v-model="ruleForm.name" clearable placeholder="全部"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>文号：</span>
              <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input>
            </el-col>
            <el-col :span="8"><span>联系人：</span> <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input></el-col>
            <el-col :span="6"><span>联系电话：</span> <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>实际办结时间：</span>
              <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker>-<el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker>
            </el-col>
            <el-col :span="8">
              <span>原件领导批示：</span>
              <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input
            ></el-col>
            <el-col :span="6">
              <span>紧急程度：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>批示时间：</span>
              <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker>-<el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:185px;"> </el-date-picker>
            </el-col>
            <el-col :span="8">
              <span>批示内容：</span>
              <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input
            ></el-col>
            <el-col :span="6">
              <span>批示人：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
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
          </el-row>-->
          <el-row>
            <el-col :span="12" style="line-height: 50px;">
              排序方式：
              <el-radio-group v-model="radio">
                <el-radio :label="1">厅领导</el-radio>
                <el-radio :label="2">批示时间</el-radio>
                <el-radio :label="3">流水号</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="12" style="text-align: right;">
              <el-button plain @click="search">查询</el-button>
              <el-button plain @click="exportExcel">导出excel</el-button>
            </el-col>
          </el-row>
        </div>
        <el-table :data="tableData" border style="width: 100%;height:500px;">
          <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
          <el-table-column label="文件类型" prop="wjlx" width="150px" align="center"> </el-table-column>
          <el-table-column label="流水号" prop="wjlx" width="150px" align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row)">{{ scope.row.wjlx }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="收文时间" prop="wjlx" width="150px" align="center"> </el-table-column>
          <el-table-column label="文号" prop="wjlx" width="150px" align="center"> </el-table-column>
          <el-table-column label="来文单位" prop="wjlx" width="150px" align="center"> </el-table-column>
          <el-table-column label="来文内容" prop="wjlx" align="center"> </el-table-column>
          <el-table-column label="办理情况" prop="wjlx" width="150px" align="center"> </el-table-column>
          <el-table-column label="登记人" prop="wjlx" width="150px" align="center"> </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      ruleForm: { name: '', checkList: '呈批件' },
      checkList: '呈批件',
      options: [],
      radio: 3,
      tableData: [
        {
          wjlx: '一般文件'
        }
      ],
      currentPage4: 1
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
      const tHeader = ['序号', '文件类型', '流水号', '收文时间', '文号', '来文单位', '来文内容', '办理情况', '登记人']
      const filterVal = ['wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx', 'wjlx']
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
        case '呈批件':
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/instructions', query: { lsh: 123456 } })
          break
        case '上级来文':
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/getfile', query: { lsh: 123456 } })
          break
        case '平级和下级来文':
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/level', query: { lsh: 123456 } })
          break
        case '群众来信':
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/usermessage', query: { lsh: 123456 } })
          break
        case '其他':
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/other', query: { lsh: 123456 } })
          break
        default:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/instructions', query: { lsh: 123456 } })
          break
      }
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
