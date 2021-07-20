<template>
  <div class="login-box">
    <div class="center-box">
      <div class="center-box-title">
        登录
      </div>
      <el-form
        :model="loginForm"
        class="login-input"
      >
        <el-form-item>
          <el-input
            v-model="loginForm.userName"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.userPassword"
            placeholder="密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        @click="userLogin"
        type="primary"
      >Login</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { login } from '@/api/account'
import { useRouter } from 'vue-router'
import crypto from 'crypto'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
export default {
  name: 'Login',
  setup () {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      loginForm: {
        userName: '',
        userPassword: ''
      },
      userName: '',
      userPassword: ''
    })

    onMounted(() => {
      console.log('on')
    })

    function userLogin () {
      const md5 = crypto.createHash('md5')
      md5.update(state.loginForm.userPassword)
      md5.update(state.loginForm.userPassword).toString()
      const pwd = md5.update(md5.update(state.loginForm.userPassword).toString())
      const params = Object.create(state.loginForm)
      params.userPassword = pwd.digest('hex')
      params.userName = state.loginForm.userName
      login(params).then(res => {
        if (res.retCode === 200) {
          localStorage.setItem('token', res.token)
          localStorage.setItem('userInfo', JSON.stringify({ userName: state.loginForm.userName, isLogin: true }))
          store.dispatch('user/updateRoles', ['user'])
          store.dispatch('user/updateLoginStatus', true)
          router.push({
            path: '/'
          })
        } else {
          ElMessage.error(res.retMsg)
        }
      })
    }

    const userRegister = () => {
      console.log('user register')
    }

    return {
      ...toRefs(state),
      userLogin,
      userRegister
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  text-align: center;
}
.center-box {
  width: 400px;
  height: 300px;
  border-radius: 10px;
  border: 1px solid #999999;
  margin: 0 auto;
  transform: translateY(50%);
  .center-box-title {
    line-height: 50px;
    border-bottom: 1px solid #999999;
  }
  .login-input {
    margin: 20px 20px;
  }
}
</style>
