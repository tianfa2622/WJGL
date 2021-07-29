<template>
  <div class="Log_content">
    <el-row type="flex" justify="space-around">
      <el-col :span="18">
        <el-form :model="form" inline>
          <el-form-item label="">
            <el-select v-model="form.type" placeholder="请选择字典类别">
              <!-- <el-option label="..." :value="2"></el-option> -->
              <el-option v-for="t in options" :key="t.value" :label="t.label" :value="t.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="form.state" style="width:150px" placeholder="账号状态">
              <el-option label="启用" :value="true"></el-option>
              <el-option label="已禁用" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="form.number" style="width:300px" placeholder="请输入字典编码或名称"></el-input>
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
          <el-table-column prop="type" label="字典类别" align="center">
            <template slot-scope="scope">
              <template v-for="i in options">
                <span v-if="scope.row.type === i.value" :key="i.value">{{ i.label }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="groupLeader" label="排序" align="center"> </el-table-column>
          <el-table-column prop="number" label="字典代码" align="center"> </el-table-column>
          <el-table-column prop="name" label="字典名称" align="center"> </el-table-column>
          <el-table-column prop="state" label="当前状态" align="center" width="100px">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.zt" class="switch_style" :active-value="true" :inactive-value="false" active-text="已启用" inactive-text="已禁用" active-color="#13ce66" inactive-color="#ff4949" @change="ChangeCurrentState(scope.row)"> </el-switch>
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
      <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
    </el-row>

    <!-- 弹出层 -->
    <el-dialog :title="title" class="dialog_class" center :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <!-- 添加/修改 -->
      <el-row>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="字典类别" prop="name">
            <el-select v-model="ruleForm.type" style="width:100%" placeholder="请选择字典类别" @change="changeType">
              <el-option v-for="t in options" :key="t.value" :label="t.label" :value="t.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字典代码" prop="name">
            <el-input v-model="ruleForm.number" disabled placeholder="字典编号自动生成"></el-input>
          </el-form-item>
          <el-form-item label="字典名称" prop="name">
            <el-input v-model.number="ruleForm.name" placeholder="请输入字典名称"></el-input>
          </el-form-item>
          <el-form-item label="字典排序" prop="name">
            <el-input v-model.number="ruleForm.groupLeader" placeholder="请输入排序"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer">
        <el-button style="margin-right:20px" class="footer_btn" @click="handleClose">取 消</el-button>
        <el-button style="margin-left:20px" class="footer_btn" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { searchAll, searchOne, DisableApi, ModifyApi, AddList } from '@/api/system/systemDictionary'
export default {
  data() {
    return {
      form: {
        state: null,
        type: null,
        number: null
      },
      tableData: [],
      ruleForm: { name: null, number: null, type: null, groupLeader: null },
      rules: {
        name: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      title: '',
      dialogVisible: false,
      options: [
        { label: '厅领导', value: '1' },
        { label: '紧急程度', value: '2' }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 20,
      BtnType: null,
      num: null
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
          console.log(res)
          this.tableData = res.data.records
          this.total = res.data.total
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
    // 添加
    add() {
      this.BtnType = 'Add'
      this.title = '添加字典'
      this.dialogVisible = true
    },
    // 修改
    async modify(row) {
      try {
        this.title = '修改字典'
        this.dialogVisible = true
        const res = await searchOne({ id: row.id })
        if (res.code === 1) {
          this.BtnType = 'Modify'
          this.ruleForm = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 表格项状态改变
    async ChangeCurrentState(row) {
      const res = await DisableApi({ id: row.id, state: row.state })
      if (res.code === 1) {
        this.$message.success(res.message)
      } else {
        this.$message.error(res.message)
      }
    },
    // 弹出框添加按钮
    confirmAdd() {
      // this.dialogVisible = false
      // this.ruleForm = {}
      switch (this.BtnType) {
        case 'Add':
          this.addList(this.ruleForm)
          break
        case 'Modify':
          this.ModifyList(this.ruleForm)
          break
      }
    },
    // 调取添加接口的方法
    async addList(data) {
      try {
        const res = await AddList({ ...data })
        if (res.code === 1) {
          this.$message.success(res.message)
          this.dialogVisible = false
          Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
          this.search()
        } else {
          this.$message.error(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 调取添加接口的方法
    async ModifyList(data) {
      try {
        const res = await ModifyApi({ ...data })
        if (res.code === 1) {
          this.BtnType = 'Modify'
          this.$message.success(res.message)
          this.dialogVisible = false
          Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
          this.search()
        } else {
          this.$message.error(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getchangeType() {
      const res = await searchAll({ type: this.ruleForm.type })
      if (res.code === 1) {
        let num = res.data.total
        const len = 3
        num = parseInt(num, 10) + 1
        num = num.toString()
        while (num.length < len) {
          num = '0' + num
        }
        this.ruleForm.number = num
      } else {
        this.$message.error('获取字典代码失败!')
      }
    },
    changeType() {
      this.getchangeType()
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
