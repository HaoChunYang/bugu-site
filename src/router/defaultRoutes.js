import Layout from '@/components/Layout'

const defaultRoutes = [
  {
    // path: '/404',
    path: '/:pathMatch(.*)*',
    name: 'NoFound',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-pages/404.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login')
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/home/Home')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  },
  {
    path: '/article',
    name: 'Article',
    component: Layout,
    children: [
      {
        path: 'detail',
        name: 'ArticleDetail',
        component: () => import('@/views/article/ArticleDetail')
      }
    ]
  }
]
export default defaultRoutes
