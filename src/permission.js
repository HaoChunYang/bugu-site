import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import asyncRoutes from '@/router/asyncRoutes'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 解决路由跳转原路由或者刷新出错
const originalReplace = router.prototype.replace
router.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}
const originalPush = router.prototype.push
router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
/**
 * roles: visitor 游客 outer 退出登录用户 user 普通用户（登录） admin 管理员
 */
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  if (token) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (!userInfo.roles) {
      console.log('add async routes')
      router.addRoute(...asyncRoutes)
      userInfo.roles = 'user'
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  } else {
    const userRoles = JSON.parse(localStorage.getItem('userRoles'))
    if (userRoles && userRoles.roles === 'visitor') {
      asyncRoutes.forEach(route => {
        console.log('route,', route.name)
        router.removeRoute(route.name)
      })
      // router.removeRoute('AsyncArticle')
      localStorage.removeItem('userRoles')
    }
  }
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})
