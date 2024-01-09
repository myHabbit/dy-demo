import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/components/user/index.vue')
      },
      {
        path: '',  // 默认加载的子路由
        name: 'child',
        redirect: '/person/chart'  // 重定向到'/chart'
      },
      {
        path: 'chart',
        name: 'Chart',
        component: () => import('@/components/Home-Chart/index.vue')
      },
    ]
  },
  {
    path: '/person',
    name: "Person",
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: '',  // 默认加载的子路由
        name: 'child',
        redirect: '/person/pesourcePool'  // 重定向到'/chart'
      },
      {
        path: "pesourcePool",
        name: "ResourcePool",
        component: () => import('@/components/layout-ResourcePool/index.vue')
      },
      {
        path: 'personnelList',
        name: "PersonnelList",
        component: () => import('@/components/layout-PersonnelList/index.vue')
      },
    ]
  },
  {
    path: '/skill',
    name: "Skill",
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: '',  // 默认加载的子路由
        name: 'child',
        redirect: '/skill/skillTag'  // 重定向到'/chart'
      },
      {
        path: "skillTag",
        name: "SkillTag",
        component: () => import('@/components/layout-SkillTag/index.vue'),
        children: [
          {
            path: 'setSkillTag',
            name: "setSkillTag",
            component: () => import('@/components/Home-setSkillTag/index.vue')
          }
        ]
      },
    ]
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'router-link-active' // 设置全局激活类名
})

export default router




