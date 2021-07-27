<template>
  <div class="Log_content">
    <el-row type="flex" justify="space-around">
      <el-col :span="18">
        <el-form :model="form" inline>
          <el-form-item label="">
            <el-select v-model="form.jglx" style="width:150px" placeholder="机构类型">
              <el-option label="一级(省级)" value="01"></el-option>
              <el-option label="二级(市级)" value="02"></el-option>
              <el-option label="三级(区县)" value="03"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="form.qyState" style="width:150px" placeholder="启用状态">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="已禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="form.str" style="width:300px" placeholder="请输入机构代码或机构名称"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="add">新增</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="23">
        <el-table :data="tableData" border style="width: 100%" height="500">
          <el-table-column prop="xh" label="序号" width="80"> </el-table-column>
          <el-table-column prop="jgdm" label="机构代码" align="center"> </el-table-column>
          <el-table-column prop="px" label="排序" align="center"> </el-table-column>
          <el-table-column prop="jgmc" label="机构名称" align="center"> </el-table-column>
          <el-table-column prop="sjjg" label="上级机构" align="center"> </el-table-column>
          <el-table-column prop="jglx" label="机构类型" align="center"> </el-table-column>
          <el-table-column prop="zt" label="启用状态" align="center" width="100px">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.zt" class="switch_style" active-value="1" inactive-value="0" active-text="已启用" inactive-text="已禁用" active-color="#13ce66" inactive-color="#ff4949" @change="ChangeCurrentState(scope.row)"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="modify(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="mt-20">
      <el-pagination :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
    </el-row>

    <!-- 弹出层 -->
    <el-dialog :title="title" class="dialog_class" center :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <!-- 添加/修改 -->
      <el-row>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="机构登记" prop="name">
            <el-select v-model="ruleForm.name" placeholder="请选择机构">
              <el-option label="上级单位" value="01"></el-option>
              <el-option label="本级单位" value="02"></el-option>
              <el-option label="下级单位" value="03"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级机构" prop="name">
            <el-select v-model="ruleForm.name" style="width:100%" placeholder="请选择上级机构">
              <el-option label="湖南省公安厅" :value="43010000000"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级代码" prop="name">
            <el-input v-model="ruleForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="机构名称" prop="name">
            <el-input v-model.number="ruleForm.name" placeholder="请输入组织机构名称"></el-input>
          </el-form-item>
          <el-form-item label="机构代码" prop="name">
            <el-input v-model.number="ruleForm.name" placeholder="请输入组织机构代码"></el-input>
          </el-form-item>
          <el-form-item label="机构排序" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入机构排序"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer">
        <el-button style="margin-right:20px" class="footer_btn" @click="handleClose">取 消</el-button>
        <el-button style="margin-left:20px" class="footer_btn" type="primary" @click="confirmAdd">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        qyState: null,
        str: null,
        jglx: null
      },
      tableData: [
        {
          xh: '1',
          jgdm: '1',
          px: '1',
          jgmc: '1',
          sjjg: '1',
          jglx: '1',
          zt: 0
        }
      ],
      ruleForm: { name: '', fw: null, jb: null },
      rules: {
        name: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      title: '',
      dialogVisible: false
    }
  },
  methods: {
    // 弹出层关闭
    handleClose() {
      this.ruleForm = {}
      this.dialogVisible = false
    },
    // 切换每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 切换当前页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    search() {},
    // 添加
    add() {
      this.title = '添加组织机构'
      this.dialogVisible = true
    },
    // 修改
    modify(row) {
      console.log(row)
      this.title = '修改组织机构'
      this.dialogVisible = true
    },
    // 表格项状态改变
    ChangeCurrentState(row) {
      console.log(row)
    },
    // 弹出框添加按钮
    confirmAdd() {
      this.dialogVisible = false
      this.ruleForm = {}
    }
  }
}
</script>

<style>
.Log_content {
  height: 100%;
  width: 100%;
  margin-top: 20px;
}
/* switch按钮样式 */
.switch_style .el-switch__label {
  position: absolute;
  display: none;
  color: #fff !important;
}
/*打开时文字位置设置*/
.switch_style .el-switch__label--right {
  z-index: 1;
}
/* 调整打开时文字的显示位子 */
.switch_style .el-switch__label--right span {
  margin-right: 12px;
}
/*关闭时文字位置设置*/
.switch_style .el-switch__label--left {
  z-index: 1;
}
/* 调整关闭时文字的显示位子 */
.switch_style .el-switch__label--left span {
  margin-left: 12px;
}
/*显示文字*/
.switch_style .el-switch__label.is-active {
  display: block;
}
/* 调整按钮的宽度 */
.switch_style.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 70px !important;
  margin: 0;
}
.form_select_wd {
  width: 100%;
}
.footer_btn {
  padding: 10px 30px;
}
.dialog_class .el-dialog__body {
  padding: 10px 20px 10px;
}
</style>
