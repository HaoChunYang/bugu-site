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
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/login">Login</router-link>
      </div>
      <el-button
        type="text"
        medium
        @click="toLogin"
      >登录</el-button>
      <el-button
        type="primary"
        @click="articalPublish"
      >发文章</el-button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'BoguNav',
  setup () {
    const router = useRouter()
    function toLogin () {
      console.log('I will login')
      router.push({
        path: '/login'
      })
    }

    const articalPublish = () => {
      router.push({
        path: '/article/new'
      })
    }

    const toHome = () => {
      router.push({
        path: '/'
      })
    }

    return {
      toLogin,
      articalPublish,
      toHome
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
