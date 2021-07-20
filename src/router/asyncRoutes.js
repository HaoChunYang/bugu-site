import Layout from '@/components/Layout'

const asyncRoutes = [
  {
    path: '/article',
    name: 'AsyncArticle',
    component: Layout,
    children: [
      {
        path: 'new',
        name: 'ArticleNew',
        component: () => import('@/views/article/ArticleEdit'),
        meta: { roles: ['user', 'admin'] }
      },
      {
        path: 'edit',
        name: 'ArticleEdit',
        component: () => import('@/views/article/ArticleEdit'),
        meta: { roles: ['user', 'admin'] }
      }
    ]
  },
  {
    path: '/user',
    name: 'AsyncUser',
    component: Layout,
    children: [
      {
        path: 'setting/pwd',
        name: 'SettingPwd',
        component: () => import('@/views/user/SettingPwd')
      }
    ]
  }
]

export default asyncRoutes
