<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>信息查询</el-breadcrumb-item>
          <el-breadcrumb-item>督办件</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center;">
          <span>督办件</span>
        </div>
        <div class="condition">
          <el-form ref="ruleForm" :model="ruleForm" label-width="125px" class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="文件类型：">
                  <el-radio-group v-model="ruleForm.checkList">
                    <el-radio label="上级督办件" border>上级督办件</el-radio>
                    <el-radio label="厅批督办件" border>厅批督办件</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="ruleForm.checkList === '上级督办件'" justify="space-between">
              <el-col :span="8">
                <el-form-item label="流水号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入流水号"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span> -->
                </el-form-item>
                <el-form-item label="涉及内容：">
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
                <el-form-item label="来文份数：">
                  <el-input v-model.number="ruleForm.name" style="width:100%" placeholder="请输入来文份数"></el-input>
                </el-form-item>
                <el-form-item label="联系人：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="登记日期：">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="原件领导批示：">
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入文号"></el-input>
                </el-form-item>
                <el-form-item label="督办号：">
                  湘公督办[
                  <el-input v-model="ruleForm.name" style="width:70px;"></el-input>] <el-input v-model="ruleForm.name" style="width:70px;"></el-input>号
                </el-form-item>
                <el-form-item label="来件渠道：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入来件渠道"></el-input>
                </el-form-item>
                <el-form-item label="要求办结时间：">
                  <el-date-picker v-model="ruleForm.name" style="width:100%" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
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
                <el-form-item label="来文内容：">
                  <el-input v-model="ruleForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
                <el-form-item label="收文时间：">
                  <el-date-picker v-model="ruleForm.name" style="width:100%" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
                <el-form-item label="来文单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择来文单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="联系电话：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请联系电话"></el-input>
                </el-form-item>
                <el-form-item label="登记单位：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入登记单位"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : '厅长秘书处' }}</span> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="ruleForm.checkList === '厅批督办件'" justify="space-between">
              <el-col :span="8">
                <el-form-item label="流水号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入流水号"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span> -->
                </el-form-item>
                <el-form-item label="涉及内容：">
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
                <el-form-item label="来文份数：">
                  <el-input v-model.number="ruleForm.name" style="width:100%" placeholder="请输入来文份数"></el-input>
                </el-form-item>
                <el-form-item label="联系人：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="原件领导批示：">
                  <el-input v-model="ruleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文号：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入文号"></el-input>
                </el-form-item>
                <el-form-item label="督办号：">
                  湘公督办[
                  <el-input v-model="ruleForm.name" style="width:70px;"></el-input>] <el-input v-model="ruleForm.name" style="width:70px;"></el-input>号
                </el-form-item>
                <el-form-item label="来件渠道：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入来件渠道"></el-input>
                </el-form-item>
                <el-form-item label="登记日期：">
                  <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                </el-form-item>
                <el-form-item label="登记人：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入登记人"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : '王湘琴' }}</span> -->
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来文内容：">
                  <el-input v-model="ruleForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
                <el-form-item label="收文时间：">
                  <el-date-picker v-model="ruleForm.name" style="width:100%" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
                <el-form-item label="来文单位：">
                  <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择来文单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
                ></el-form-item>
                <el-form-item label="联系电话：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请联系电话"></el-input>
                </el-form-item>
                <el-form-item label="登记单位：">
                  <el-input v-model="ruleForm.name" style="width:100%" placeholder="请输入登记单位"></el-input>
                  <!-- <span>{{ ruleForm.name ? ruleForm.name : '厅长秘书处' }}</span> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!-- <el-row>
            <el-col :span="10">
              <span>文件类型：</span>
              <span>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="上级督办件" border></el-checkbox>
                  <el-checkbox label="厅批督办件" border></el-checkbox>
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
            <el-col :span="8"><span>督办号：</span> <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input></el-col>
            <el-col :span="6"><span>来件渠道：</span> <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input></el-col>
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
            <el-col :span="6">
              <span>办理单位：</span>
              <el-select v-model="ruleForm.name" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>原件领导批示：</span>
              <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input>
            </el-col>
            <el-col :span="8">
              <span>涉及内容：</span>
              <el-input v-model="ruleForm.name" placeholder="请输入内容" clearable> </el-input
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
          <el-table-column label="文件类型" width="150px" prop="wjlx" align="center"> </el-table-column>
          <el-table-column label="流水号" width="150px" prop="wjlx" align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row)">{{ scope.row.wjlx }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="督办号" prop="wjlx" width="150px" align="center"> </el-table-column>
          <el-table-column label="收文时间" prop="wjlx" align="center" width="150px"> </el-table-column>
          <el-table-column label="文号" width="150px" prop="wjlx" align="center"> </el-table-column>
          <el-table-column label="来文单位" prop="wjlx" width="150px" align="center"> </el-table-column>
          <el-table-column label="来文内容" prop="wjlx" align="center"> </el-table-column>
          <el-table-column width="150px" label="要求办结时间" prop="wjlx" align="center"> </el-table-column>
          <el-table-column label="登记人" width="150px" prop="wjlx" align="center"> </el-table-column>
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
      ruleForm: { name: '', checkList: '上级督办件' },
      checkList: [],
      options: [],
      radio: 3,
      tableData: [
        {
          wjlx: '督办件'
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
        case '上级督办件':
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/topSupervision', query: { lsh: 123456 } })
          break
        case '厅批督办件':
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/hallSupervision', query: { lsh: 123456 } })
          break
        default:
          // eslint-disable-next-line object-curly-spacing
          this.$router.push({ path: '/topSupervision', query: { lsh: 123456 } })
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
