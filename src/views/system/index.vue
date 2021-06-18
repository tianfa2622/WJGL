<template>
  <div class="content">
    <div class="content-tabs">
      <el-tabs v-model="activeName" class="tabs-content" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <User />
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="second">
          <!-- <Role /> -->
        </el-tab-pane>
        <el-tab-pane label="字典管理" name="third">
          <!-- <Dictionary /> -->
        </el-tab-pane>
        <el-tab-pane label="组织机构" name="fourth">
          <!-- <Mechanism /> -->
        </el-tab-pane>
        <el-tab-pane label="系统日志" name="fifth">
          <SystemLog />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import User from './children/systemUser.vue' // 用户管理
// import Role from './children/role' // 角色管理
// import Equipment from './children/equipment' // 设备管理
// import Dictionary from './children/dictionary' // 字典管理
// import Mechanism from './children/mechanism' // 组织机构
import SystemLog from './children/systemLog' // 系统日志
export default {
  components: {
    User,
    //   Role,
    //   Equipment,
    //   Dictionary,
    //   Mechanism,
    SystemLog
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style>
/* .content {
  width: 100%;
  height: 100%;
}
.content-tabs {
  width: 100%;
  height: 100%;
}
.tabs-content {
  width: 100%;
  height: 100%;
} */
</style>
