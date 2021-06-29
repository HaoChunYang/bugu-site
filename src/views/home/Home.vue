<template>
  <div>
    <el-container>
      <el-header>
        <bogu-nav></bogu-nav>
      </el-header>
      <el-container>
        <el-aside></el-aside>
        <el-main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BoguNav from '@/components/BoguNav'
export default {
  name: 'Home',
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
}

.el-aside {
  background-color: lightslategray;
  width: 200px;
}
</style>
