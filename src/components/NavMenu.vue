<template>
  <div style="width:250px;">
    <div class="container">
      <el-col :span="24">
        <el-menu :default-active="$route.path" router :unique-opened="uniqueOpened" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect">
          <el-menu-item index="/index">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>信息登记</span>
            </template>
            <el-menu-item-group>
              <template slot="title" class="back_color">一般文件</template>
              <el-menu-item index="/instructions">呈批件</el-menu-item>
              <el-menu-item v-if="$store.state.code == 1" index="/getfile">上级来文</el-menu-item>
              <el-menu-item v-if="$store.state.code == 1" index="/level">平级和下级来文</el-menu-item>
              <el-menu-item v-if="$store.state.code == 1" index="/usermessage">群众来信</el-menu-item>
              <el-menu-item v-if="$store.state.code == 1" index="/other">其他</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group v-if="$store.state.code == 1" title="督办件">
              <el-menu-item index="/topSupervision">上级督办件</el-menu-item>
              <el-menu-item index="/hallSupervision">厅批督办件</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group v-if="$store.state.code == 1" title="提案建议">
              <el-menu-item index="/plan">政协提案</el-menu-item>
              <el-menu-item index="/propose">人大建议</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-if="$store.state.code == 1" index="/examine">
            <i class="el-icon-view"></i>
            <span slot="title">呈批件审核</span>
          </el-menu-item>
          <el-submenu v-if="$store.state.code == 1" index="4">
            <template slot="title">
              <i class="el-icon-search"></i>
              <span>信息查询</span>
            </template>
            <el-menu-item-group class="info_color_menu">
              <el-menu-item index="/commonlyfile">一般文件</el-menu-item>
              <el-menu-item index="/supervise">督办件</el-menu-item>
              <el-menu-item index="/advise">提案建议</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-if="$store.state.code == 1" index="/shakyrun">
            <i class="el-icon-connection"></i>
            <span slot="title">活动管理</span>
          </el-menu-item>
          <el-submenu v-if="$store.state.code == 1" index="6">
            <template slot="title">
              <i class="el-icon-document-copy"></i>
              <span>报表</span>
            </template>
            <el-menu-item-group>
              <template slot="title">领导活动</template>
              <el-menu-item index="/allLeaddayForm">所有厅领导每日行程表</el-menu-item>
              <el-menu-item index="/eachLeadWeekForm">每个厅领导每周行程表</el-menu-item>
              <el-menu-item index="/allLeadWeekForm">所有厅领导每周行程表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="会议室管理">
              <el-menu-item index="/roomweekusestate">会议室一周使用情况表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="文件报表">
              <el-menu-item index="/instructionsState">呈批件情况一览表</el-menu-item>
              <el-menu-item index="/circularsState">传阅件情况一览表</el-menu-item>
              <el-menu-item index="/superviseState">督办件情况一览表</el-menu-item>
              <el-menu-item index="/proposalState">政协提案一览表</el-menu-item>
              <el-menu-item index="/NpcState">人大建议一览表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-if="$store.state.code == 1" index="/system">
            <i class="el-icon-setting"></i>
            <span slot="title">系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uniqueOpened: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      console.log(keyPath)
      this.$router.push({
        path: key,
        params: { data: 'query' }
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
.el-menu-item-group /deep/.el-menu-item-group__title {
  font-size: 16px;
  background-color: yellow;
  color: #000;
  font-weight: 700;
}
.info_color_menu /deep/.el-menu-item-group__title {
  background-color: #fff;
}
</style>
