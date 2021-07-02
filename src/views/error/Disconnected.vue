<template>
  <div style="width:100%;height:100%">
    <el-row style="height:100%" type="flex" justify="center" align="middle">
      <el-col :span="18">
        <el-row type="flex" justify="space-between">
          <el-col :span="16">
            <img style="width:100%;height:100%" src="./dw.jpg" alt="404" />
          </el-col>
          <el-col :span="5" class="R_box">
            <p class="text_color">我断网了！！！</p>
            <el-link type="primary" class="link_Btn" @click="$router.go(-1)">点我刷新</el-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.R_box {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;
}
.text_color {
  display: inline-block;
  color: #f1c27b;
  font-size: 22px;
  margin-bottom: 20px;
}
.link_Btn {
  font-size: 22px;
  width: 30%;
}
</style>
