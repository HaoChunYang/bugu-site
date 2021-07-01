<template>
  <div>
    <div
      class="container"
      v-for="article in articles"
      :key="article.id"
      @click="toDetial(article.id)"
    >
      <h2>{{ article.title }}</h2>
      <span>{{ article.author }}</span>
      <p v-html="article.contentHtml"></p>
      <span>{{ article.createTime }}</span>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { queryList } from '@/api/article'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

export default {
  name: 'ArticleList',
  setup () {
    const state = reactive({
      articles: []
    })

    const router = useRouter()
    onMounted(() => {
      console.log('Component is mounted!')
      queryList().then(res => {
        console.log('query list:', res)
        state.articles = res.result
      })
    })

    const toDetial = (id) => {
      console.log('to detail')
      router.push({
        path: '/article/detail',
        query: {
          id
        }
      })
    }

    return {
      ...toRefs(state),
      toDetial
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
