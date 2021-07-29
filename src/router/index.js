import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/home',
    redirect: '/index',
    component: () => import('@/views/home/index'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/homepage/index')
      },
      {
        path: '/instructions',
        name: 'instructions',
        component: () => import('@/views/infoRegister/RegularFiles/instructions')
      },
      {
        path: '/getfile',
        name: 'getfile',
        component: () => import('@/views/infoRegister/RegularFiles/getfile')
      },
      {
        path: '/level',
        name: 'level',
        component: () => import('@/views/infoRegister/RegularFiles/level')
      },
      {
        path: '/usermessage',
        name: 'usermessage',
        component: () => import('@/views/infoRegister/RegularFiles/usermessage')
      },
      {
        path: '/other',
        name: 'other',
        component: () => import('@/views/infoRegister/RegularFiles/other')
      },
      {
        path: '/topSupervision',
        name: 'topSupervision',
        component: () => import('@/views/infoRegister/Supervision/topSupervision')
      },
      {
        path: '/hallSupervision',
        name: 'hallSupervision',
        component: () => import('@/views/infoRegister/Supervision/hallSupervision')
      },
      {
        path: '/plan',
        name: 'plan',
        component: () => import('@/views/infoRegister/Proposal/plan')
      },
      {
        path: '/propose',
        name: 'propose',
        component: () => import('@/views/infoRegister/Proposal/propose')
      },
      {
        path: '/examine',
        name: 'examine',
        component: () => import('@/views/toExamine/index')
      },
      {
        path: '/commonlyfile',
        name: 'commonlyfile',
        component: () => import('@/views/infosearch/commonlyfile')
      },
      {
        path: '/supervise',
        name: 'supervise',
        component: () => import('@/views/infosearch/supervise')
      },
      {
        path: '/advise',
        name: 'advise',
        component: () => import('@/views/infosearch/advise')
      },
      {
        path: '/shakyrun',
        name: 'shakyrun',
        component: () => import('@/views/shakyrun/index')
      },
      {
        path: '/allLeadDayForm',
        name: 'allLeadDayForm',
        component: () => import('@/views/reportForm/leadShaky/allLeadDayForm')
      },
      {
        path: '/eachLeadWeekForm',
        name: 'eachLeadWeekForm',
        component: () => import('@/views/reportForm/leadShaky/eachLeadWeekForm')
      },
      {
        path: '/allLeadWeekForm',
        name: 'allLeadWeekForm',
        component: () => import('@/views/reportForm/leadShaky/allLeadWeekForm')
      },
      {
        path: '/roomweekusestate',
        name: 'roomweekusestate',
        component: () => import('@/views/reportForm/roomRun/roomweekusestate')
      },
      {
        path: '/instructionsState',
        name: 'instructionsState',
        component: () => import('@/views/reportForm/fromFile/instructionsState')
      },
      {
        path: '/circularsState',
        name: 'circularsState',
        component: () => import('@/views/reportForm/fromFile/circularsState')
      },
      {
        path: '/superviseState',
        name: 'superviseState',
        component: () => import('@/views/reportForm/fromFile/superviseState')
      },
      {
        path: '/proposalState',
        name: 'proposalState',
        component: () => import('@/views/reportForm/fromFile/proposalState')
      },
      {
        path: '/NpcState',
        name: 'NpcState',
        component: () => import('@/views/reportForm/fromFile/NpcState')
      },
      {
        path: '/system',
        name: 'system',
        component: () => import('@/views/system/index')
      }
    ]
  },
  {
    path: '/404',
    name: 'error',
    component: () => import('@/views/error/404')
  },
  {
    path: '/dw',
    name: 'error1',
    component: () => import('@/views/error/Disconnected')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   const flag = !!token
//   if (to.path === '/login' || to.path === '/') {
//     if (flag) {
//       next({ path: '/home' })
//     } else {
//       next()
//     }
//   } else if (to.path !== '/login' && flag) {
//     next()
//   } else if (to.path !== '/login' && !flag) {
//     next({ path: '/login' })
//   }
// })

export default router
