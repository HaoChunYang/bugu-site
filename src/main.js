import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/style/reset.css'

import {
  ElButton,
  ElRow,
  ElCol,
  ElContainer,
  ElMain,
  ElAside,
  ElHeader,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElIcon,
  ElTabPane,
  ElTabs,
  ElMessage,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu
} from 'element-plus'

import './permission'

const app = createApp(App)

app.component(ElButton.name, ElButton)
app.use(ElRow).use(ElCol)
app.use(ElContainer).use(ElHeader).use(ElAside).use(ElMain)
app.use(ElForm).use(ElFormItem).use(ElInput)
app.use(ElSelect).use(ElOption).use(ElIcon)
app.use(ElTabs).use(ElTabPane)
app.use(ElDropdown).use(ElDropdownMenu).use(ElDropdownItem)

app.use(ElMessage)

app.use(store).use(router).mount('#app')
