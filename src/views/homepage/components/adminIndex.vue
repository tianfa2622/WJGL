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
              <el-link type="primary">{{ scope.row.DueInThreeDays }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="超期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.OverdueDueNumber }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未到期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.UnexpiredNum }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未办结总数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.innumerableTotal }}</el-link>
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
              <el-link type="primary">{{ scope.row.TenInThreeDays }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="超期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.OverdueNum }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未到期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.UnexpiredNum }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未办结总数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.innumerableTotal }}</el-link>
            </template></el-table-column
          >
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import {} from '@/api/home/index'
export default {
  data() {
    return {
      tableDataOne: [
        {
          fileType: '呈批件',
          fiveNotTransferred: 1,
          tenNotTransferred: 2,
          NotTransferredSum: 3
        },
        {
          fileType: '上级来文',
          fiveNotTransferred: 1,
          tenNotTransferred: 2,
          NotTransferredSum: 3
        },
        {
          fileType: '平级和下级来文',
          fiveNotTransferred: 1,
          tenNotTransferred: 2,
          NotTransferredSum: 3
        },
        {
          fileType: '群众来信',
          fiveNotTransferred: 1,
          tenNotTransferred: 2,
          NotTransferredSum: 3
        },
        {
          fileType: '其他',
          fiveNotTransferred: 1,
          tenNotTransferred: 2,
          NotTransferredSum: 3
        }
      ],
      tableDataTwo: [
        {
          fileType: '上级督办件',
          DueInThreeDays: 1,
          OverdueDueNumber: 2,
          UnexpiredNum: 3,
          innumerableTotal: 6
        },
        {
          fileType: '厅级督办件',
          DueInThreeDays: 1,
          OverdueDueNumber: 2,
          UnexpiredNum: 3,
          innumerableTotal: 6
        }
      ],
      tableDataThree: [
        {
          fileType: '政协提案',
          TenInThreeDays: 1,
          OverdueNum: 2,
          UnexpiredNum: 3,
          innumerableTotal: 6
        },
        {
          fileType: '人大建议',
          TenInThreeDays: 1,
          OverdueNum: 2,
          UnexpiredNum: 3,
          innumerableTotal: 6
        }
      ]
    }
  },
  created() {},
  methods: {}
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
