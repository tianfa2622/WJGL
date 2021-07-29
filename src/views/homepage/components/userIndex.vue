<template>
  <div>
    <div class="container">
      <h3>首页</h3>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>呈批件</span>
        </div>
        <el-table :data="tableDataOne" border style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column prop="fileType" label="文件类型" align="center"></el-table-column>
          <el-table-column label="已通过" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.NotViewed }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="已退回" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.Returned }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="已办结" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.Completed }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="未审核" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.NotAudit }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未签收" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.NotSignFor }}</el-link>
            </template></el-table-column
          >
        </el-table>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文件统计</span>
        </div>
        <el-table :data="tableDataTwo" border style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column prop="fileType" label="文件类型" align="center"></el-table-column>
          <el-table-column label="未签收" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.NoSignFor }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="已签收" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.YesSignFor }}</el-link>
            </template></el-table-column
          >
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { searchYesTransferredNum, searchNotAuditNum, searchYesAuditNum, searchReturnedNum, searchNotSignforNum, searchSjlwFileStatusZero, searchSjlwFileStatusOne, searchPjxjlwFileStatusOne, searchPjxjlwFileStatusZero, searchQzlxFileStatusOne, searchQzlxFileStatusZero, searchQtFileStatusZero, searchQtFileStatusOne } from '@/api/home/index'
export default {
  data() {
    return {
      tableDataOne: [
        {
          fileType: '呈批件',
          NotViewed: this.searchYesAuditNum(),
          Returned: this.searchReturnedNum(),
          Completed: this.searchYesTransferredNum(),
          NotAudit: this.searchNotAuditNum(),
          NotSignFor: this.searchNotSignforNum()
        }
      ],
      tableDataTwo: [
        {
          fileType: '上级来文',
          NoSignFor: this.searchSjlwFileStatusOne(),
          YesSignFor: this.searchSjlwFileStatusZero()
        },
        {
          fileType: '平级和下级来文',
          NoSignFor: this.searchPjxjlwFileStatusOne(),
          YesSignFor: this.searchPjxjlwFileStatusZero()
        },
        {
          fileType: '群众来信',
          NoSignFor: this.searchQzlxFileStatusOne(),
          YesSignFor: this.searchQzlxFileStatusZero()
        },
        {
          fileType: '其他',
          NoSignFor: this.searchQtFileStatusOne(),
          YesSignFor: this.searchQtFileStatusZero()
        }
      ]
    }
  },
  methods: {
    async searchYesAuditNum() {
      const res = await searchYesAuditNum()
      if (res.code === 1) {
        this.tableDataOne[0].NotViewed = res.data
      } else {
        this.$message.error('获取呈批件已通过数失败！')
      }
    },
    async searchReturnedNum() {
      const res = await searchReturnedNum()
      if (res.code === 1) {
        this.tableDataOne[0].Returned = res.data
      } else {
        this.$message.error('获取呈批件已退回数失败！')
      }
    },
    async searchYesTransferredNum() {
      const res = await searchYesTransferredNum()
      if (res.code === 1) {
        this.tableDataOne[0].Completed = res.data
      } else {
        this.$message.error('获取呈批件已办结总数失败！')
      }
    },
    async searchNotAuditNum() {
      const res = await searchNotAuditNum()
      if (res.code === 1) {
        this.tableDataOne[0].NotAudit = res.data
      } else {
        this.$message.error('获取呈批件未审核数失败！')
      }
    },
    async searchNotSignforNum() {
      const res = await searchNotSignforNum()
      if (res.code === 1) {
        this.tableDataOne[0].NotSignFor = res.data
      } else {
        this.$message.error('获取呈批件未签收数失败！')
      }
    },
    async searchSjlwFileStatusOne() {
      const res = await searchSjlwFileStatusOne()
      if (res.code === 1) {
        this.tableDataTwo[0].NoSignFor = res.data
      } else {
        this.$message.error('获取上级来文未签收数失败！')
      }
    },
    async searchSjlwFileStatusZero() {
      const res = await searchSjlwFileStatusZero()
      if (res.code === 1) {
        this.tableDataTwo[0].YesSignFor = res.data
      } else {
        this.$message.error('获取上级来文已签收数失败！')
      }
    },
    async searchPjxjlwFileStatusOne() {
      const res = await searchPjxjlwFileStatusOne()
      if (res.code === 1) {
        this.tableDataTwo[1].NoSignFor = res.data
      } else {
        this.$message.error('获取平级和下级来文未签收数失败！')
      }
    },
    async searchPjxjlwFileStatusZero() {
      const res = await searchPjxjlwFileStatusZero()
      if (res.code === 1) {
        this.tableDataTwo[1].YesSignFor = res.data
      } else {
        this.$message.error('获取平级和下级来文已签收数失败！')
      }
    },
    async searchQzlxFileStatusOne() {
      const res = await searchQzlxFileStatusOne()
      if (res.code === 1) {
        this.tableDataTwo[2].NoSignFor = res.data
      } else {
        this.$message.error('获取群众来信未签收数失败！')
      }
    },
    async searchQzlxFileStatusZero() {
      const res = await searchQzlxFileStatusZero()
      if (res.code === 1) {
        this.tableDataTwo[2].YesSignFor = res.data
      } else {
        this.$message.error('获取群众来信已签收数失败！')
      }
    },
    async searchQtFileStatusOne() {
      const res = await searchQtFileStatusOne()
      if (res.code === 1) {
        this.tableDataTwo[3].NoSignFor = res.data
      } else {
        this.$message.error('获取其他未签收数失败！')
      }
    },
    async searchQtFileStatusZero() {
      const res = await searchQtFileStatusZero()
      if (res.code === 1) {
        this.tableDataTwo[3].YesSignFor = res.data
      } else {
        this.$message.error('获取其他已签收数失败！')
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
.container h3 {
  margin-bottom: 10px;
  color: #606266;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
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
  margin-bottom: 13px;
}
</style>
