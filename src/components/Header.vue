<template>
  <div>
    <div class="container">
      <div class="head-left">
        <img src="../assets/images/headerlogo.png" alt="logo" />
        <span>湖南省公安厅文件管理系统</span>
      </div>
      <div class="head-right">
        <div class="compress">
          <span>厅长秘书处|王香琴</span>
          <span v-html="$options.filters.formatDate(date)"></span>
          <span><el-link style="color:#fff;">修改密码</el-link></span>
          <span>
            <el-link type="danger">注销</el-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: new Date()
    }
  },
  mounted () {
    let _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date() // 修改数据date
    }, 1000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      return (
        y + '<span>年</span>' + MM + '<span>月</span>' + d + '<span>日</span> '
      )
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 7.5rem;
  background-image: url('../assets/images/headerbackground.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
}
.container .head-left {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 50px;
}
.container .head-right {
  width: 50%;
  height: 100%;
}
.container .head-right .compress {
  width: 60%;
  height: 100%;
  margin: auto;
  line-height: 80px;
  display: flex;
  justify-content: space-between;
}
.container .head-right .compress span {
  font-size: 18px;
  color: #fff;
  font-weight: 600;
}
.container .head-right .compress span .el-link {
  font-size: 18px;
  font-weight: 600;
}
.container .head-left img {
  width: 4.375rem;
}
.container .head-left span {
  font-size: 2.25rem;
  font-weight: 700;
  color: #fff;
  padding-left: 0.9375rem;
}
</style>
