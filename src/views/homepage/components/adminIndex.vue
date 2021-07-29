<template>
  <div>
    <div class="container">
      <h3>首页</h3>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>一般文件</span>
        </div>
        <el-table :data="tableDataOne" border style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column prop="fileType" label="文件类型" align="center"></el-table-column>
          <el-table-column label="五天以上未办结数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.fiveNotTransferred }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="十天以上未办结数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.tenNotTransferred }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未办结总数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.NotTransferredSum }}</el-link>
            </template></el-table-column
          >
        </el-table>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>督办件</span>
        </div>
        <el-table :data="tableDataTwo" border style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column prop="fileType" label="文件类型" align="center"></el-table-column>
          <el-table-column label="三天内到期数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.dueInThreeDays }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="超期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.overdueDueNumber }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未到期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.notYetDueNumber }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未办结总数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.totalOutStanding }}</el-link>
            </template></el-table-column
          >
        </el-table>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>提案建议</span>
        </div>
        <el-table :data="tableDataThree" border style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column prop="fileType" label="文件类型" align="center"></el-table-column>
          <el-table-column label="十天内到期数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.dueInThreeDays }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="超期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.overdueDueNumber }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未到期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.notYetDueNumber }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未办结总数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.totalOutStanding }}</el-link>
            </template></el-table-column
          >
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { searchfiveNotTransferred, searchtenNotTransferred, searchNotTransferredSum, searchfiveDaySjlwNumber, searchtenDaySjlwNumber, searchSjlwNumberCount, searchfiveDayPjXjlwNumber, searchtenDayPjxjlwNumber, searchPjxjlwNumberCount, searchfiveDayQzlxNumber, searchtenDayQzlxNumber, searchQzlxNumberCount, searchfiveDayQtNumber, searchtenDayQtNumber, searchQtNumberCount, searchProposal, searchOversee } from '@/api/home/index'
export default {
  data() {
    return {
      tableDataOne: [
        {
          fileType: '呈批件',
          fiveNotTransferred: this.searchfiveNotTransferred(),
          tenNotTransferred: this.searchtenNotTransferred(),
          NotTransferredSum: this.searchNotTransferredSum()
        },
        {
          fileType: '上级来文',
          fiveNotTransferred: this.searchfiveDaySjlwNumber(),
          tenNotTransferred: this.searchtenDaySjlwNumber(),
          NotTransferredSum: this.searchSjlwNumberCount()
        },
        {
          fileType: '平级和下级来文',
          fiveNotTransferred: this.searchfiveDayPjXjlwNumber(),
          tenNotTransferred: this.searchtenDayPjxjlwNumber(),
          NotTransferredSum: this.searchPjxjlwNumberCount()
        },
        {
          fileType: '群众来信',
          fiveNotTransferred: this.searchfiveDayQzlxNumber(),
          tenNotTransferred: this.searchtenDayQzlxNumber(),
          NotTransferredSum: this.searchQzlxNumberCount()
        },
        {
          fileType: '其他',
          fiveNotTransferred: this.searchfiveDayQtNumber(),
          tenNotTransferred: this.searchtenDayQtNumber(),
          NotTransferredSum: this.searchQtNumberCount()
        }
      ],
      tableDataTwo: [],
      tableDataThree: []
    }
  },
  created() {
    this.searchProposal()
    this.searchOversee()
  },
  methods: {
    async searchfiveNotTransferred() {
      const res = await searchfiveNotTransferred()
      if (res.code === 1) {
        this.tableDataOne[0].fiveNotTransferred = res.data
      } else {
        this.$message.error('获取呈批件五天以上未办结数失败！')
      }
    },
    async searchtenNotTransferred() {
      const res = await searchtenNotTransferred()
      if (res.code === 1) {
        this.tableDataOne[0].tenNotTransferred = res.data
      } else {
        this.$message.error('获取呈批件十天以上未办结数失败！')
      }
    },
    async searchNotTransferredSum() {
      const res = await searchNotTransferredSum()
      if (res.code === 1) {
        this.tableDataOne[0].NotTransferredSum = res.data
      } else {
        this.$message.error('获取呈批件未办结总数失败！')
      }
    },
    async searchfiveDaySjlwNumber() {
      const res = await searchfiveDaySjlwNumber()
      if (res.code === 1) {
        this.tableDataOne[1].fiveNotTransferred = res.data
      } else {
        this.$message.error('获取上级来文五天以上未办结数失败！')
      }
    },
    async searchtenDaySjlwNumber() {
      const res = await searchtenDaySjlwNumber()
      if (res.code === 1) {
        this.tableDataOne[1].tenNotTransferred = res.data
      } else {
        this.$message.error('获取上级来文十天以上未办结数失败！')
      }
    },
    async searchSjlwNumberCount() {
      const res = await searchSjlwNumberCount()
      if (res.code === 1) {
        this.tableDataOne[1].NotTransferredSum = res.data
      } else {
        this.$message.error('获取上级来文未办结总数失败！')
      }
    },
    async searchfiveDayPjXjlwNumber() {
      const res = await searchfiveDayPjXjlwNumber()
      if (res.code === 1) {
        this.tableDataOne[2].fiveNotTransferred = res.data
      } else {
        this.$message.error('获取平级和下级来文五天以上未办结数失败！')
      }
    },
    async searchtenDayPjxjlwNumber() {
      const res = await searchtenDayPjxjlwNumber()
      if (res.code === 1) {
        this.tableDataOne[2].tenNotTransferred = res.data
      } else {
        this.$message.error('获取平级和下级来文十天以上未办结数失败！')
      }
    },
    async searchPjxjlwNumberCount() {
      const res = await searchPjxjlwNumberCount()
      if (res.code === 1) {
        this.tableDataOne[2].NotTransferredSum = res.data
      } else {
        this.$message.error('获取平级和下级来文未办结总数失败！')
      }
    },
    async searchfiveDayQzlxNumber() {
      const res = await searchfiveDayQzlxNumber()
      if (res.code === 1) {
        this.tableDataOne[3].fiveNotTransferred = res.data
      } else {
        this.$message.error('获取群众来信五天以上未办结数失败！')
      }
    },
    async searchtenDayQzlxNumber() {
      const res = await searchtenDayQzlxNumber()
      if (res.code === 1) {
        this.tableDataOne[3].tenNotTransferred = res.data
      } else {
        this.$message.error('获取群众来信十天以上未办结数失败！')
      }
    },
    async searchQzlxNumberCount() {
      const res = await searchQzlxNumberCount()
      if (res.code === 1) {
        this.tableDataOne[3].NotTransferredSum = res.data
      } else {
        this.$message.error('获取群众来信未办结总数失败！')
      }
    },
    async searchfiveDayQtNumber() {
      const res = await searchfiveDayQtNumber()
      if (res.code === 1) {
        this.tableDataOne[4].fiveNotTransferred = res.data
      } else {
        this.$message.error('获取其他文件五天以上未办结数失败！')
      }
    },
    async searchtenDayQtNumber() {
      const res = await searchtenDayQtNumber()
      if (res.code === 1) {
        this.tableDataOne[4].tenNotTransferred = res.data
      } else {
        this.$message.error('获取其他文件十天以上未办结数失败！')
      }
    },
    async searchQtNumberCount() {
      const res = await searchQtNumberCount()
      if (res.code === 1) {
        this.tableDataOne[4].NotTransferredSum = res.data
      } else {
        this.$message.error('获取其他文件未办结总数失败！')
      }
    },
    async searchProposal() {
      const res = await searchProposal()
      if (res.code === 1) {
        this.tableDataTwo.push(res.data.map1)
        this.tableDataTwo.push(res.data.map2)
        console.log(res)
      }
    },
    async searchOversee() {
      const res = await searchOversee()
      if (res.code === 1) {
        console.log(res)
        this.tableDataThree.push(res.data.map1)
        this.tableDataThree.push(res.data.map2)
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
