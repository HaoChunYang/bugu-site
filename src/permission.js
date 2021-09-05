import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import asyncRoutes from '@/router/asyncRoutes'
import store from './store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
/**
 * roles: visitor 游客 outer 退出登录用户 user 普通用户（登录） admin 管理员
 */
router.beforeEach((to, from, next) => {
  const roles = store.getters.roles

  console.log('the roles:', roles, roles.length)

  const token = localStorage.getItem('token')
  if (token) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (!userInfo.roles) {
      console.log('add async routes', asyncRoutes)
      asyncRoutes.forEach(item => router.addRoute(item))
      userInfo.roles = 'user'
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      // localStorage.setItem('userRouter', JSON.stringify(router.getRoutes()))
      next()
    } else if (roles.length === 0) {
      console.log('reset router', to)
      asyncRoutes.forEach(item => router.addRoute(item))
      store.dispatch('user/updateRoles', ['user'])
      next(to.path)
    } else {
      next()
    }
  } else {
    const userRoles = JSON.parse(localStorage.getItem('userRoles'))
    if (userRoles && userRoles.roles === 'visitor') {
      asyncRoutes.forEach(route => {
        console.log('route,', route.name)
        console.log('router,', router)
        router.removeRoute(route.name)
      })
      localStorage.removeItem('userRoles')
      next(to.path)
    } else {
      next()
    }
  }
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})
