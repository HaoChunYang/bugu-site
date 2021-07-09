<template>
  <div class="nav">
    <div
      class="nav__left"
      @click="toHome"
    >
      <img
        src="@/assets/logo.jpg"
        alt="bogu logo"
      >
      <span>Bogu Site</span>
    </div>
    <div class="nav__right">
      <div id="nav">
        <router-link to="/">Home</router-link>
        <!-- <router-link to="/about">About</router-link> |
        <router-link to="/login">Login</router-link> -->
      </div>
      <el-button
        type="text"
        medium
        @click="toLogin"
        v-if="!isLogin"
      >登录</el-button>
      <el-dropdown
        v-else
        @command="userCommand"
      >
        <span class="user-nav-box">{{ userName }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button
        type="primary"
        @click="articalPublish"
      >发文章</el-button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { wantNewOneArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
export default {
  name: 'BoguNav',
  setup () {
    const state = reactive({
      isLogin: false,
      userName: ''
    })
    onMounted(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo) {
        state.isLogin = userInfo.isLogin
        state.userName = userInfo.userName
      }
    })
    const router = useRouter()
    function toLogin () {
      console.log('I will login')
      router.push({
        path: '/login'
      })
    }

    const articalPublish = () => {
      wantNewOneArticle().then(res => {
        if (res.retCode === 200) {
          router.push({
            path: '/article/new'
          })
        } else {
          ElMessage.warning(res.retMsg)
        }
      }).catch(e => {
        ElMessage.warning('请先登录')
      })
    }

    const userCommand = (command) => {
      console.log('----', command)
      if (command === 'logout') {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
        localStorage.setItem('userRoles', JSON.stringify({ roles: 'visitor' }))
        state.isLogin = false
        state.userName = ''
      }
    }

    const toHome = () => {
      router.push({
        path: '/'
      })
    }

    return {
      ...toRefs(state),
      toLogin,
      articalPublish,
      toHome,
      userCommand
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgb(150 150 150 / 30%);
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  text-align: center;
  padding: 10px 30px;
  &__left {
    cursor: pointer;
  }
  img {
    width: 40px;
    height: 40px;
    vertical-align: middle;
  }
  span {
    font-size: 26px;
    font-weight: bold;
    margin-left: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  .el-button--text {
    color: #42b983;
  }

  .user-nav-box {
    margin: 0 20px;
    font-size: 20px;
    color: 2c3e50;
    text-decoration: underline;
  }
}

#nav {
  display: inline-block;
  margin-right: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    cursor: pointer;
    font-size: 16px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
