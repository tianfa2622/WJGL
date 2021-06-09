<template>
  <div>
    <el-dialog :visible.sync="LogVisible" width="60%" :show-close="false" :close-on-click-modal="false" :destroy-on-close="true" @close="close">
      <div slot="title">
        <el-row type="flex" justify="space-around">
          <el-col :span="8">
            <el-input v-model="input" style="width:100%" placeholder="请输入账号或操作内容进行查询" clearable />
          </el-col>
          <el-col :span="8" style="text-align: end;">
            <el-button type="primary" @click="search(input)">查询</el-button>
            <el-button type="primary" @click="close">关闭</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <Table :data="tableData" />
      </div>
      <div class="Pagin">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="10" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Table from '../../../../components/Table/tablein'
export default {
  components: {
    Table
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['isShow'],
  data() {
    return {
      input: '', // 输入框数据
      LogVisible: false, // 弹出层控制显示
      currentPage: 1, // 当前页
      // 表格数据
      tableData: {
        tableHeader: [
          {
            label: '序号',
            prop: 'input',
            width: 50
          },
          {
            label: '账号',
            prop: 'input'
            // width: 50
          },
          {
            label: '机构名称',
            prop: 'input'
            // width: 80
          },
          {
            label: 'IP地址',
            prop: 'input'
            // width: 80
          },
          {
            label: '操作步骤',
            prop: 'input'
            // width: 80
          },
          {
            label: '变更前',
            prop: 'input'
            // width: 80
          },
          {
            label: '变更后',
            prop: 'input'
            // width: 100
          },
          {
            label: '操作时间',
            prop: 'input'
            // width: 50
          }
        ],
        tableList: Array(10).fill({
          input: '123'
        })
      }
    }
  },
  watch: {
    isShow() {
      this.LogVisible = this.isShow
    }
  },
  methods: {
    // 搜索
    search(val) {
      console.log(`搜索框数据${val}`)
    },
    // 关闭按钮
    close() {
      this.LogVisible = false
      this.input = ''
      this.$emit('SetClose', this.LogVisible)
    },
    // 切换每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 切换当前页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  /* height: 100%; */
}
.Pagin {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
</style>
