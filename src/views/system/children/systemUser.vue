<template>
  <div class="Log_content">
    <el-row type="flex" justify="space-around">
      <el-col :span="18">
        <el-form :model="form" inline>
          <el-form-item label="">
            <el-select v-model="form.enabled" style="width:150px" placeholder="账号状态">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="已禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="form.keywords" style="width:300px" placeholder="请输入姓名或警号"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="form.organization" placeholder="请输入单位"></el-input>
            <!-- <el-select v-model="form.organization" placeholder="请选择单位">
              <el-option label="单位一" :value="1"></el-option>
              <el-option label="单位二" :value="0"></el-option>
            </el-select> -->
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search(form)">查询</el-button>
        <el-button type="primary" @click="add">新增</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="23">
        <el-table :data="tableData" border style="width: 100%" height="500">
          <el-table-column type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="username" label="登录账号"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="phone" label="手机号码"> </el-table-column>
          <el-table-column prop="office" label="办公室"> </el-table-column>
          <el-table-column prop="officephone" label="办公室电话"> </el-table-column>
          <el-table-column prop="organization" label="所属组织结构"> </el-table-column>
          <el-table-column prop="rolename" label="所属角色"> </el-table-column>
          <el-table-column prop="enabled" label="账号状态" align="center" width="100px">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabled" class="switch_style" active-value="0" inactive-value="1" active-text="已启用" inactive-text="已禁用" active-color="#13ce66" inactive-color="#ff4949" @change="ChangeState(scope.row)"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="modify(scope.row)">修改</el-button>
            </template>
          </el-table-column>
          <el-table-column label="密码" align="center" width="80px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="reset(scope.row)">重置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="mt-20">
      <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
    </el-row>

    <!-- 弹出层 -->
    <el-dialog :title="title" class="dialog_class" center :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <!-- 重置密码 -->
      <el-row v-if="title === '重置密码'">
        <el-form ref="passwordForm" :model="passwordForm" :rules="rules">
          <el-form-item label="" prop="name">
            <el-input v-model="passwordForm.name" show-password placeholder="请输入新密码"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 添加/修改 -->
      <el-row v-else>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="登录账号" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入登录账号"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="name">
            <el-input v-model.number="ruleForm.name" placeholder="请输入联系人电话号码"></el-input>
          </el-form-item>
          <el-form-item label="办公室" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入办公室名称"></el-input>
          </el-form-item>
          <el-form-item label="办公室电话" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入办公室电话"></el-input>
          </el-form-item>
          <el-form-item label="账号级别" prop="name">
            <el-select v-model="ruleForm.jb" class="form_select_wd" placeholder="请选择级别" @change="ChangeCurrentState($event)">
              <el-option label="上级单位" :value="0"></el-option>
              <el-option label="本级单位" :value="1"></el-option>
              <el-option label="下级单位" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号范围" prop="name">
            <el-select v-model="ruleForm.fw" class="form_select_wd" placeholder="请选择范围">
              <el-option v-for="(op, index) in options" :key="index" :label="op.label" :value="op.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属角色" prop="name">
            <el-select v-model="ruleForm.name" class="form_select_wd" placeholder="请选择范围">
              <el-option v-for="(op1, index) in options1" :key="index" :label="op1.label" :value="op1.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <span>默认密码为联系人电话！</span>
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
import { searchAll } from '@/api/system/systemUser'
export default {
  data() {
    return {
      form: {},
      tableData: [],
      ruleForm: { name: '', fw: null, jb: null },
      passwordForm: { mm: null },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      options: [],
      options1: [
        { label: '填报员', value: 1 },
        { label: '管理员', value: 0 }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 20,
      title: '',
      dialogVisible: false
    }
  },
  created() {
    this.search()
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
    // 搜索按钮
    async search(data) {
      try {
        const pageData = {}
        let paramsData = {}
        if (data) {
          this.currentPage = 1
          paramsData = { ...data }
        } else {
          paramsData = { ...this.form }
        }
        pageData.current = this.currentPage
        pageData.size = this.pageSize
        const res = await searchAll({ ...pageData, ...paramsData })
        if (res.code === 1) {
          console.log(res.data)
          // this.tableData = res.data
          // this.total = res.count
          paramsData = {}
          if (data) {
            this.$message.success(res.message)
          }
        } else {
          this.$message.error(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 添加
    add() {
      this.title = '添加账号'
      this.dialogVisible = true
    },
    // 修改
    modify(row) {
      console.log(row)
      this.title = '修改账号'
      this.dialogVisible = true
    },
    // 重置密码
    reset(row) {
      console.log(row)
      this.title = '重置密码'
      this.dialogVisible = true
    },
    // 表格项状态改变
    ChangeState(row) {
      console.log(row)
    },
    // 选择级别选择框的值发生改变时触发
    ChangeCurrentState(val) {
      this.options = []
      this.ruleForm.fw = null
      if (val === 0) {
        this.options.push({ label: '湖南省公安厅', value: 101 })
      } else if (val === 1) {
        let list1 = []
        list1 = [
          { label: '湖南省公安厅', value: 101 },
          { label: '长沙市公安局', value: 102 }
        ]
        this.options.push(...list1)
      } else {
        this.options.push({ label: '长沙市芙蓉分局', value: 10201 })
      }
    },
    // 弹出框添加按钮
    confirmAdd() {
      this.dialogVisible = false
      switch (this.title) {
        case '重置密码':
          this.passwordForm = {}
          break
        default:
          this.ruleForm = {}
          break
      }
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
