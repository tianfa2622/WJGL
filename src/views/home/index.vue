<template>
  <div>
    <el-container>
      <el-header height="120px">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="250px"><NavMenu></NavMenu></el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import NavMenu from '../../components/NavMenu.vue'
export default {
  components: {
    Header,
    NavMenu
  }
}
</script>

<style scoped>
@import '../../assets/css/global.css';
.el-header {
  padding: 0;
  margin: 0;
}
.el-aside {
}
</style>
