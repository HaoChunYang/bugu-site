import { createRouter, createWebHashHistory } from 'vue-router'
import defaultRoutes from './defaultRoutes'

/**
 * roles: visitor 游客 user 普通用户 admin 管理员
 */
const routes = [
  ...defaultRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
