<template>
  <div>
    <div class="container">
      <h3>首页</h3>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>一般文件</span>
        </div>
        <el-table :data="tableDataOne" border style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50px"
          ></el-table-column>
          <el-table-column
            prop="adminName"
            label="文件类型"
            align="center"
          ></el-table-column>
          <el-table-column label="五天以上未办结数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.adminName }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="十天以上未办结数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.adminName }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未办结总数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.adminName }}</el-link>
            </template></el-table-column
          >
        </el-table>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>督办件</span>
        </div>
        <el-table :data="tableDataTwo" border style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50px"
          ></el-table-column>
          <el-table-column
            prop="adminName"
            label="文件类型"
            align="center"
          ></el-table-column>
          <el-table-column label="三天内到期数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.adminName }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="超期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.adminName }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未到期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.adminName }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未办结总数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.adminName }}</el-link>
            </template></el-table-column
          >
        </el-table>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>提案建议</span>
        </div>
        <el-table :data="tableDataThree" border style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50px"
          ></el-table-column>
          <el-table-column
            prop="adminName"
            label="文件类型"
            align="center"
          ></el-table-column>
          <el-table-column label="十天内到期数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.adminName }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="超期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.adminName }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未到期应办数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.adminName }}</el-link>
            </template></el-table-column
          >
          <el-table-column label="未办结总数" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.adminName }}</el-link>
            </template></el-table-column
          >
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableDataOne: [
        {
          adminName: "rich",
        },
      ],
      tableDataTwo: [
        {
          adminName: "rich",
        },
      ],
      tableDataThree: [
        {
          adminName: "rich",
        },
      ],
    };
  },
};
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
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-bottom: 13px;
}
</style>
