<template>
  <div>
    <h1>{{ article.title }}</h1>
    <span>{{ article.author }}</span>
    <span>{{ article.createTime }}</span>
    <div
      v-html="article.contentHtml"
      class="markdown-body"
    ></div>
  </div>
</template>

<script>
import { queryDetail } from '@/api/article'
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/atom-one-light.css'
import { useRoute } from 'vue-router'

export default {
  name: 'ArticleDetail',
  setup () {
    const route = useRoute()
    const state = reactive({
      article: {}
    })
    onMounted(() => {
      console.log('detail on mounted', route.query)
      const id = route.query.id
      queryDetail({ id }).then(res => {
        console.log('detail: ', res)
        if (res.retCode === 200) {
          state.article = res.result
        }
      }).catch(e => {

      })
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
// .markdown-body {
//   // width: 100%;
//   // height: 500px;
// }
</style>
