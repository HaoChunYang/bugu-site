<template>
  <div>
    <el-form :model="articleForm">
      <el-form-item label="标题">
        <el-input
          placeholder="请输入标题"
          v-model="articleForm.title"
        ></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="标签">
            <el-select
              v-model="articleForm.tags"
              clearable
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签"
            >
              <el-option
                v-for="item in tags"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类">
            <el-select
              v-model="articleForm.categoryId"
              clearable
              placeholder="请选择分类"
            >
              <el-option
                v-for="item in categories"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-tabs
          v-model="activeName"
          type="card"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="编辑"
            name="first"
          >
            <el-input
              placeholder="使用 markdown 语法进行编辑……"
              v-model="articleForm.content"
              type="textarea"
              :rows="20"
            ></el-input>
          </el-tab-pane>
          <el-tab-pane
            label="预览"
            name="second"
          >
            <div
              v-html="contentToHtml"
              class="markdown-body"
            ></div>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
    </el-form>

    <div class="bottom-button">
      <el-button
        @click="toPublish"
        type="primary"
      >发布</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/atom-one-light.css'
import { publish, update } from '@/api/article'
import { useRoute } from 'vue-router'

export default {
  name: 'ArticleEdit',
  setup () {
    const route = useRoute()
    const state = reactive({
      articleForm: {
        title: '',
        content: '',
        tags: [],
        categoryId: []
      },
      contentToHtml: '',
      activeName: 'first',
      categories: [{
        value: '1',
        label: '面试'
      }, {
        value: '2',
        label: 'Html'
      }, {
        value: '3',
        label: 'css'
      }, {
        value: '4',
        label: 'javascript'
      }, {
        value: '5',
        label: 'Node.js'
      }],
      tags: [
        {
          label: 'HTML',
          value: 'HTML'
        },
        {
          label: 'CSS',
          value: 'css'
        },
        {
          label: 'JavaScript',
          value: 'javascript'
        }
      ]
    })

    onMounted(() => {
      console.log(route.params)
      if (Object.keys(route.params).length !== 0) {
        state.articleForm = route.params
        state.articleForm.tags = route.params.tags.split(',')
        console.log(state.articleForm)
      }
    })

    function toPublish () {
      toHtml()
      state.articleForm.contentToHtml = state.contentToHtml
      state.articleForm.author = 'bogu'
      if (route.name === 'ArticleEdit') {
        update(state.articleForm).then(res => {
          console.log(res)
        })
      } else {
        publish(state.articleForm).then(res => {
          console.log(res)
        })
      }
    }

    const handleClick = () => {
      if (state.activeName === 'second') {
        toHtml()
      }
    }

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

    const cancel = () => {
      console.log('cancel')
      console.log(typeof publish)
      publish()
    }

    return {
      ...toRefs(state),
      toPublish,
      toHtml,
      cancel,
      handleClick
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
.el-select {
  width: 100%;
}
// pre.hljs {
//   padding: 12px 2px 12px 40px !important;
//   border-radius: 5px !important;
//   position: relative;
//   font-size: 14px !important;
//   line-height: 22px !important;
//   overflow: hidden !important;
//   code {
//     display: block !important;
//     margin: 0 10px !important;
//     overflow-x: auto !important;
//   }
//   .line-numbers-rows {
//     position: absolute;
//     pointer-events: none;
//     top: 12px;
//     bottom: 12px;
//     left: 0;
//     font-size: 100%;
//     width: 40px;
//     text-align: center;
//     letter-spacing: -1px;
//     border-right: 1px solid rgba(0, 0, 0, 0.66);
//     user-select: none;
//     counter-reset: linenumber;
//     span {
//       pointer-events: none;
//       display: block;
//       counter-increment: linenumber;
//       &:before {
//         content: counter(linenumber);
//         color: #999;
//         display: block;
//         text-align: center;
//       }
//     }
//   }
//   b.name {
//     position: absolute;
//     top: 2px;
//     right: 50px;
//     z-index: 10;
//     color: #999;
//     pointer-events: none;
//   }
//   .copy-btn {
//     position: absolute;
//     top: 2px;
//     right: 4px;
//     z-index: 10;
//     color: #333;
//     cursor: pointer;
//     background-color: #fff;
//     border: 0;
//     border-radius: 2px;
//   }
// }
</style>
