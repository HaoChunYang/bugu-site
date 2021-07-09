<template>
  <div class="list-box">
    <div
      class="list-item"
      v-for="article in articles"
      :key="article.id"
    >
      <div class="content">
        <div
          class="link"
          @click="toDetial(article.id)"
        >
          <h2>{{ article.title }}</h2>
          <p
            v-html="article.content"
            class="desc"
          ></p>
        </div>
        <div class="operation">
          <a href="">
            <span>{{ article.author }}</span>
          </a>
          <span>{{ article.createTime }}</span>
          <span>99 浏览</span>
        </div>
      </div>
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
        if (res.retCode === 200) {
          state.articles = res.result
        }
      }).catch(e => {
        console.log(e)
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
.list-box {
  // margin: 24px;
}
.list-item {
  padding: 24px;
  // margin-bottom: 24px;
  display: flex;
  border-bottom: 1px solid #f0f0f2;
  h2 {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
  }
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    .link {
      cursor: pointer;
      h2:hover {
        text-decoration: underline;
        color: #42b983;
      }
    }
    .desc {
      line-height: 1.5;
      margin-top: 16px;
      width: 100%;
      font-size: 14px;
      font-weight: 400;
      min-height: 6px;
      color: #555666;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      // overflow-wrap: break-word;
      display: -moz-box;
      -moz-line-clamp: 2;
      -moz-box-orient: vertical;
      word-wrap: break-word;
      white-space: normal;
    }

    .operation {
      margin-top: 16px;
      font-size: 14px;
      color: #999aaa;
      span:nth-child(n + 2) {
        margin-left: 20px;
      }
    }
  }
}
</style>
