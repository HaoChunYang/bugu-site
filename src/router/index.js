import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '@/views/home/Home'
import Layout from '@/components/Layout'

const routes = [
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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login')
  },
  {
    path: '/article',
    name: 'Article',
    component: Layout,
    children: [
      {
        path: 'new',
        name: 'ArticleNew',
        component: () => import('@/views/article/ArticleEdit')
      },
      {
        path: 'detail',
        name: 'ArticleDetail',
        component: () => import('@/views/article/ArticleDetail')
      },
      {
        path: 'edit',
        name: 'ArticleEdit',
        component: () => import('@/views/article/ArticleEdit')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
