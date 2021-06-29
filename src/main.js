import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/style/reset.css'
import {
  ElButton,
  ElCol,
  ElContainer,
  ElMain,
  ElAside,
  ElHeader,
  ElForm,
  ElFormItem,
  ElInput
} from 'element-plus'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const app = createApp(App)

app.use(mavonEditor)

app.component(ElButton.name, ElButton)
app.use(ElCol)
app.use(ElContainer).use(ElHeader).use(ElAside).use(ElMain)
app.use(ElForm).use(ElFormItem).use(ElInput)

app.use(store).use(router).mount('#app')
