<template>
  <div class="Log_content">
    <el-row type="flex" justify="space-around">
      <el-col :span="18">
        <el-form :model="form">
          <el-form-item label="">
            <el-input v-model="form.str" placeholder="请输入角色名称"></el-input>
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
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="xh" label="序号" width="80"> </el-table-column>
          <el-table-column prop="jsmc" label="角色名称" align="center"> </el-table-column>
          <el-table-column prop="zhsl" label="账号数量" align="center"> </el-table-column>
          <el-table-column label="权限" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="modify(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="delData(scope.row)">删除</el-button>
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
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="功能权限" prop="data" required>
            <el-tree ref="tree" :data="ruleForm.data" :render-content="renderContent" highlight-current icon-class="none" show-checkbox node-key="id" :default-checked-keys="[23]" :props="defaultProps"> </el-tree>
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
        str: null
      },
      tableData: [
        {
          xh: '1',
          jsmc: '1',
          zhsl: '1'
        }
      ],
      ruleForm: {
        name: '',
        data: [
          {
            id: 1,
            label: '首页'
          },
          {
            id: 2,
            label: '呈批件',
            children: [
              {
                id: 21,
                label: '查询'
              },
              {
                id: 22,
                label: '新增'
              },
              {
                id: 23,
                label: '审核'
              }
            ]
          },
          {
            id: 3,
            label: '传阅件',
            children: [
              {
                id: 31,
                label: '新增'
              }
            ]
          },
          {
            id: 5,
            label: '其他',
            children: [
              {
                id: 51,
                label: '新增'
              }
            ]
          },
          {
            id: 6,
            label: '上级督办件',
            children: [
              {
                id: 61,
                label: '新增'
              }
            ]
          },
          {
            id: 7,
            label: '厅批督办件',
            children: [
              {
                id: 71,
                label: '新增'
              }
            ]
          },
          {
            id: 8,
            label: '政协提案',
            children: [
              {
                id: 81,
                label: '新增'
              }
            ]
          },
          {
            id: 9,
            label: '人大建议',
            children: [
              {
                id: 91,
                label: '新增'
              }
            ]
          },
          {
            id: 10,
            label: '呈批件审核',
            children: [
              {
                id: 101,
                label: '审核'
              }
            ]
          },
          {
            id: 11,
            label: '一般文件',
            children: [
              {
                id: 111,
                label: '新增'
              }
            ]
          },
          {
            id: 12,
            label: '督办件',
            children: [
              {
                id: 121,
                label: '新增'
              }
            ]
          },
          {
            id: 13,
            label: '活动管理',
            children: [
              {
                id: 131,
                label: '新增'
              }
            ]
          },
          {
            id: 14,
            label: '报表',
            children: [
              {
                id: 141,
                label: '新增'
              }
            ]
          },
          {
            id: 15,
            label: '系统设置',
            children: [
              {
                id: 151,
                label: '新增'
              }
            ]
          }
        ]
      },
      rules: {
        name: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        data: []
      },
      currentPage: 1,
      title: '',
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.changeCss()
    }, 50)
  },
  methods: {
    // 弹出层关闭
    handleClose() {
      // this.ruleForm = {}
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
      this.title = '添加字典'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.changeCss()
      }, 50)
    },
    // 修改
    modify(row) {
      console.log(row)
      this.title = '修改字典'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.changeCss()
      }, 50)
    },
    // 删除
    delData(row) {
      console.log(row)
      this.$confirm('确认删除该角色？')
        .then(_ => {
          console.log(_)
        })
        .catch(_ => {
          console.log(_)
        })
    },
    // 表格项状态改变
    ChangeCurrentState(row) {
      console.log(row)
    },
    // 弹出框添加按钮
    confirmAdd() {
      this.getSimpleCheckedNodes(this.$refs.tree.store)
      this.dialogVisible = false
      // this.ruleForm = {}
    },
    // 树节点的内容区的渲染 Function
    renderContent(h, { node, data, store }) {
      console.log(data, store)
      let classname = ''
      // 判断tree是不是底层菜单
      if (node.level === 2 && node.childNodes.length === 0) {
        classname = 'levelname'
      }
      return h('p', { class: classname }, node.label)
    },
    changeCss() {
      // 最底层节点的名字
      const levelName = document.getElementsByClassName('levelname')
      for (let i = 0; i < levelName.length; i++) {
        // 让底层节点的多选框和名字左浮动
        levelName[i].parentNode.style.cssFloat = 'left'
        levelName[i].parentNode.style.styleFloat = 'left'
      }
    },
    getSimpleCheckedNodes(store) {
      // 定义数组
      const checkedNodes = []
      // 判断是否为全选，若为全选状态返回被全选的节点，不为全选状态正常返回被选中的节点
      const traverse = function(node) {
        const childNodes = node.root ? node.root.childNodes : node.childNodes
        childNodes.forEach(child => {
          if (child.checked) {
            checkedNodes.push(child.data)
          }
          if (child.indeterminate) {
            traverse(child)
          }
        })
      }
      traverse(store)
      return checkedNodes
    }
  }
}
</script>

<style scoped>
.Log_content {
  height: 100%;
  width: 100%;
  margin-top: 20px;
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
