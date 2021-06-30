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
          placeholder="使用 markdown 语法进行编辑……"
          v-model="articleForm.content"
          type="textarea"
          :rows="15"
        ></el-input>
      </el-form-item>
    </el-form>

    <div class="bottom-button">
      <el-button
        @click="publish"
        type="primary"
      >发布</el-button>
      <el-button @click="toHtml">预览</el-button>
      <el-button>取消</el-button>
    </div>
    <div
      v-html="contentToHtml"
      class="markdown-body"
    ></div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/atom-one-light.css'
export default {
  name: 'ArticleEdit',
  setup () {
    const state = reactive({
      articleForm: {
        title: '',
        content: ''
      },
      contentToHtml: '<h1>hello</h1>'
    })

    function publish () { }

    const toHtml = () => {
      // const md = require('markdown-it')()
      const hljs = require('highlight.js') // https://highlightjs.org/

      const emoji = require('markdown-it-emoji')
      // Actual default values
      const md = require('markdown-it')({
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                '</code></pre>'
            } catch (__) { }
          }

          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
        }
      }).use(emoji)
      const result = md.render(state.articleForm.content)
      console.log('md result', result)
      state.contentToHtml = result
    }

    return {
      ...toRefs(state),
      publish,
      toHtml
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
pre.hljs {
  padding: 12px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;
  code {
    display: block !important;
    margin: 0 10px !important;
    overflow-x: auto !important;
  }
  .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 12px;
    bottom: 12px;
    left: 0;
    font-size: 100%;
    width: 40px;
    text-align: center;
    letter-spacing: -1px;
    border-right: 1px solid rgba(0, 0, 0, 0.66);
    user-select: none;
    counter-reset: linenumber;
    span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
      &:before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
    }
  }
  b.name {
    position: absolute;
    top: 2px;
    right: 50px;
    z-index: 10;
    color: #999;
    pointer-events: none;
  }
  .copy-btn {
    position: absolute;
    top: 2px;
    right: 4px;
    z-index: 10;
    color: #333;
    cursor: pointer;
    background-color: #fff;
    border: 0;
    border-radius: 2px;
  }
}
</style>
