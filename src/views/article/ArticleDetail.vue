<template>
  <div>
    <h1 class="title">{{ article.title }}</h1>
    <div class="article-info-box">
      <span>{{ article.author }}</span>
      <span>阅读({{ article.count }})</span>
      <span>发布于:{{ article.createTime }}</span>
      <span v-if="article.createTime !== article.updateTime">最后更新:{{ article.updateTime }}</span>
    </div>
    <div
      v-html="article.contentHtml"
      class="markdown-body article-content-box"
    ></div>
    <div class="tools-box">
      <el-button
        type="primary"
        @click="toEdit"
      >编辑</el-button>
    </div>
  </div>
</template>

<script>
import { queryDetail, wantNewOneArticle } from '@/api/article'
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/atom-one-light.css'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  name: 'ArticleDetail',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      article: {}
    })
    onMounted(() => {
      const id = route.params.id
      queryDetail({ id }).then(res => {
        console.log('detail: ', res)
        if (res.retCode === 200) {
          state.article = res.result
        }
      }).catch(e => {

      })
    })

    const toEdit = () => {
      wantNewOneArticle().then(res => {
        if (res.retCode === 200) {
          router.push({
            name: 'ArticleEdit',
            params: {
              ...state.article
            }
          })
        } else {
          ElMessage.warning(res.retMsg)
        }
      }).catch(e => {
        ElMessage.warning('请先登录')
      })
    }

    return {
      ...toRefs(state),
      toEdit
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 36px;
  font-weight: bold;
  margin: 20px;
}
.article-info-box {
  // display: flex;
  // justify-content: space-between;
  margin: 20px;
  padding: 20px;
  box-shadow: 0 1px 2px rgb(150 150 150 / 30%);
  span:nth-child(n + 2) {
    margin-left: 20px;
  }
}
.article-content-box {
  padding: 20px;
}
// .markdown-body {
//   // width: 100%;
//   // height: 500px;
// }
</style>
