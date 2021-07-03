<template>
  <div>
    <el-container>
      <el-header>
        <bogu-nav></bogu-nav>
      </el-header>
      <el-container>
        <el-aside></el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BoguNav from '@/components/BoguNav'
export default {
  name: 'Layout',
  components: {
    BoguNav
  },
  setup () {

  }

}
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  // position: relative;
  // height: 60px;
  // width: 100%;
}

.el-aside {
  // background-color: rgb(223, 250, 216);
  width: 100px !important;
  // // display: block;
  // position: absolute;
  // left: 0;
  // top: 60px;
  // bottom: 0;
  height: calc(100vh - 60px);
}

.el-main {
  // position: absolute;
  // left: 200px;
  // right: 0;
  // top: 60px;
  // bottom: 0;
  // overflow-y: scroll;
  // 下面是第二种方式
  // padding: 0 !important;
  height: calc(100vh - 60px); // 只用设置主体 main 高度
  padding-right: 100px;
}
</style>
