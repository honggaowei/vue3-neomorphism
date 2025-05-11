import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: 'form',
          component: () => import('@/views/FormDemo.vue')
        },
        {
          path: 'table',
          component: () => import('@/views/TableDemo.vue')
        },
        {
          path: 'button',
          component: () => import('@/views/ButtonDemo.vue')
        },
        {
          path: 'icon',
          component: () => import('@/views/IconDemo.vue')
        },
        {
          path: 'components',
          component: () => import('@/views/ComponentDemo.vue')
        }
      ]
    }
  ]
})

export default router