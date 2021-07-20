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
    <div class="nav_mottes">
      <el-carousel
        height="40px"
        indicator-position="none"
        arrow="never"
        direction="vertical"
      >
        <el-carousel-item
          v-for="item in mottos"
          :key="item"
        >
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="nav__right">
      <div id="nav">
        <router-link to="/">首页</router-link>
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
            <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
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
import { computed, onMounted, reactive, toRefs } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  name: 'BoguNav',
  setup () {
    const router = useRouter()
    const store = useStore()

    const state = reactive({
      isLogin: computed(() => {
        if (localStorage.getItem('token')) {
          store.dispatch('user/updateLoginStatus', true)
        }
        return store.getters.isLogin
      }),
      userName: '',
      mottos: ['一笔一画写代码，一笔一画做记录', '种树的最好时间是十年前，其次是现在', '为你写诗，为你敲代码']
    })

    // watch(() => store.getters.isLogin, (newVal) => {
    //   console.log('the loginstatue:::', newVal)
    //   state.isLogin = newVal
    // })
    onMounted(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo) {
        state.isLogin = userInfo.isLogin
        state.userName = userInfo.userName
      }
    })
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
        // localStorage.removeItem('userInfo')
        // localStorage.removeItem('token')
        // localStorage.setItem('userRoles', JSON.stringify({ roles: 'visitor' }))
        // store.dispatch('user/updateRoles', [])
        store.dispatch('user/updateLoginStatus', false)
        state.isLogin = store.getters.isLogin
        state.userName = ''
      } else if (command === 'changePwd') {
        router.push({
          path: '/user/setting/pwd'
        })
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
  .nav_mottes {
    width: 400px;
    h3 {
      line-height: 35px;
    }
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
