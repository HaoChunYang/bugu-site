<template>
  <div class="about">
    <h1>This is an about page</h1>

    <el-carousel height="40px">
      <el-carousel-item
        v-for="item in 3"
        :key="item"
      >
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default ({
  setup () {
    const state = reactive({
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: []
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
