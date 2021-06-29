<template>
  <div>
    <el-form :model="articleForm">
      <el-form-item label="标题">
        <el-input
          placeholder="请输入标题"
          v-model="articleForm.title"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="请输入内容"
          v-model="articleForm.content"
          type="textarea"
          :rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div id="editor">
          <mavon-editor style="width: 100%;"></mavon-editor>
        </div>
      </el-form-item>
    </el-form>
    <div class="bottom-button">
      <el-button
        @click="publish"
        type="primary"
      >发布</el-button>
      <el-button>保存草稿</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'ArticleEdit',
  setup () {
    const state = reactive({
      articleForm: {
        title: ''
      }
    })

    function publish () { }

    return {
      ...toRefs(state),
      publish
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-button {
  text-align: center;
}
#editor {
  margin: auto;
  width: 80%;
  height: 580px;
}
</style>
