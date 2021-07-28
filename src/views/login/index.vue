<template>
  <div class="bg-container">
    <div class="login-form">
      <h2>Copyright YiEn & 湖南省公安厅文件管理系统</h2>
      <div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" type="text" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button style="width:230px;" type="primary" @click="onSubmit('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <div class="copyright">
        <span>Copyright &copy; 湖南亿恩科技有限公司</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Login, searchLogin } from '@/api/login/login'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: 'wangwu',
        password: 'wangwu'
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [{ required: true, message: '账号不可为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不可为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          Login({ ...this.form }).then(res => {
            if (res.code === 1) {
              this.$message.success('登录成功')
              localStorage.setItem('token', `Bearer ${res.data.token}`)
              this.$router.push('/home')
              this.searchLogin()
            } else {
              this.$message.error('账号或密码错误！')
            }
          })
        } else {
          return false
        }
      })
    },
    searchLogin() {
      searchLogin()
        .then(res => {
          console.log(res)
          if (res.code === 1) {
            this.$store.commit('registrant', res.data.name)
            this.$store.commit('Registered_unit', res.data.organization)
            console.log(this.$store.state.registrant)
            console.log(this.$store.state.Registered_unit)
          } else {
            this.$message.error('获取用户信息失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style>
.bg-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  background-image: url('../../assets/images/loginbackground.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  height: 30px;
  line-height: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.footer .copyright {
  font-size: 12px;
  text-align: center;
  width: 100%;
  color: #fff;
  opacity: 0.5;
}

.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-form h2 {
  color: #fff;
}

.login-box {
  border: 1px solid #dcdfe6;
  width: 450px;
  margin: 80px auto;
  padding: 80px 80px 50px 60px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  background-color: #fff;
}
</style>
