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
}

.el-aside {
  background-color: rgb(223, 250, 216);
  width: 100px !important;
}
</style>
