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
  }
]

export default asyncRoutes
