<template>
  <div>
    <div class="container">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center;">
          <span>活动管理</span>
        </div>

        <el-button type="primary" icon="el-icon-plus">添加一行</el-button>

        <el-table :data="tableData" style="width: 100%;height:500px;">
          <el-table-column
            label="序号"
            type="index"
            width="50px"
            align="center"
          ></el-table-column>
          <el-table-column label="活动名称" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.name"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="开始日期至结束日期"
            align="center"
            width="380px"
          >
            <template slot-scope="scope" align="center">
              <el-date-picker
                v-model="scope.row.PayTime"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="GetzhifuTime"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="上午/下午" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.name" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="时间段" align="center">
            <template slot-scope="scope">
              <el-link
                type="primary"
                v-if="scope.row.name == ''"
                @click="selecttime(scope.row)"
                >选择时间段</el-link
              >
              <p v-else>{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="参加领导" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.name" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="会议地点" align="center">
            <template slot-scope="scope">
              <el-link
                type="primary"
                v-if="scope.row.name == ''"
                @click="selectplace(scope.row)"
                >选择地点</el-link
              >
              <p v-else>{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="clear(scope.row)">清空</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-card class="box-card">
      <div class="condition">
        <div class="condition-col">
          活动类型:<el-select
            v-model="conditionInputs.hdlx"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in hdlxSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="condition-col">
          时间:<el-date-picker
            v-model="conditionInputs.sj1"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker
          >-
          <el-date-picker
            v-model="conditionInputs.sj2"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div class="condition-col">
          地点:<el-input
            placeholder="请输入内容"
            v-model="conditionInputs.dd"
            clearable
          >
          </el-input>
        </div>
        <div class="condition-col">
          内容:<el-input
            placeholder="请输入内容"
            v-model="conditionInputs.nr"
            clearable
          >
          </el-input>
        </div>
        <div class="condition-col">
          参加领导:<el-select
            v-model="conditionInputs.cjld"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in cjldSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="condition-col">
          <el-button>查询</el-button>
        </div>
      </div>
      <el-table :data="tableDatatwo" style="width: 100%;height:500px;">
        <el-table-column
          label="序号"
          type="index"
          width="50px"
          align="center"
        ></el-table-column>
        <el-table-column label="活动类型" prop="wjlx" align="center">
        </el-table-column>
        <el-table-column label="流水号" prop="wjlx" align="center">
        </el-table-column>
        <el-table-column label="时间" prop="wjlx" align="center">
        </el-table-column>
        <el-table-column label="上午/下午" prop="wjlx" align="center">
        </el-table-column>
        <el-table-column label="地点" prop="wjlx" align="center">
        </el-table-column>
        <el-table-column label="来文内容" prop="wjlx" align="center">
        </el-table-column>
        <el-table-column label="参加领导" prop="wjlx" align="center">
        </el-table-column>
        <el-table-column label="参加人员" prop="wjlx" align="center">
        </el-table-column>
        <el-table-column label="登记人" prop="wjlx" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="signForevent(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="50"
      >
      </el-pagination>
    </el-card>

    <!-- 选择时间段对话框 -->
    <el-dialog
      title="选择时间段"
      :visible.sync="timeDialogVisible"
      width="30%"
      center
    >
      <div style="text-align:center;">
        <el-time-picker
          is-range
          v-model="tableData.name"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="timeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="timeDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 选择会议地点对话框 -->
    <el-dialog
      title="选择会议地点"
      :visible.sync="placeDialogVisible"
      width="30%"
      center
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="placeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="placeDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      PayTime: '',
      tableData: [
        {
          name: '',
          starttime: '',
          endtime: ''
        }
      ],
      tableDatatwo: [
        {
          wjlx: '活动管理'
        }
      ],
      conditionInputs: {
        hdlx: '',
        sj1: '',
        sj2: '',
        dd: '',
        nr: '',
        cjld: ''
      },
      options: [],
      cjldSelect: [],
      hdlxSelect: [],
      currentPage4: 1,
      options: [],
      timeDialogVisible: false,
      placeDialogVisible: false
    }
  },
  methods: {
    GetzhifuTime () {
      //console.log(this.PayTime)
      if (this.PayTime != null) {
        this.tableData.starttime = this.PayTime[0]
        this.tableData.endtime = this.PayTime[1]
      }
      console.log(this.PayTime)
    },
    selecttime () {
      this.timeDialogVisible = true
    },
    selectplace () {
      this.placeDialogVisible = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
/* .condition {
  font-size: 16px;
} */
.condition {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-bottom: 10px;
}
.condition .el-input {
  width: 180px;
  margin: 0 5px 0 5px;
}
.condition-col {
  display: inline-block;
  margin: 0 5px 0 5px;
}
.condition .el-select {
  width: 180px;
  margin: 0 5px 0 5px;
}
.el-pagination {
  margin: 15px 0 0 0;
  text-align: center;
}
</style>
