import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/login/index')
  },
  {
    path: '/home',
    redirect: '/index',
    component: () => import('@/views/home/index'),
    children: [
      {
        path: '/index',
        name: '首页',
        component: () => import('@/views/homepage/index')
      },
      {
        path: '/instructions',
        name: '呈批件',
        component: () => import('@/views/infoRegister/RegularFiles/instructions')
      },
      {
        path: '/getfile',
        name: '上级来文',
        component: () => import('@/views/infoRegister/RegularFiles/getfile')
      },
      {
        path: '/level',
        name: '平级和下级来文',
        component: () => import('@/views/infoRegister/RegularFiles/level')
      },
      {
        path: '/usermessage',
        name: '群众来信',
        component: () => import('@/views/infoRegister/RegularFiles/usermessage')
      },
      {
        path: '/other',
        name: '其他',
        component: () => import('@/views/infoRegister/RegularFiles/other')
      },
      {
        path: '/topSupervision',
        name: '上级督办件',
        component: () => import('@/views/infoRegister/Supervision/topSupervision')
      },
      {
        path: '/hallSupervision',
        name: '厅批督办件',
        component: () => import('@/views/infoRegister/Supervision/hallSupervision')
      },
      {
        path: '/plan',
        name: '政协提案',
        component: () => import('@/views/infoRegister/Proposal/plan')
      },
      {
        path: '/propose',
        name: '人大建议',
        component: () => import('@/views/infoRegister/Proposal/propose')
      },
      {
        path: '/examine',
        name: '呈批件审核',
        component: () => import('@/views/toExamine/index')
      },
      {
        path: '/commonlyfile',
        name: '一般文件',
        component: () => import('@/views/infosearch/commonlyfile')
      },
      {
        path: '/supervise',
        name: '督办件',
        component: () => import('@/views/infosearch/supervise')
      },
      {
        path: '/advise',
        name: '提案建议',
        component: () => import('@/views/infosearch/advise')
      },
      {
        path: '/shakyrun',
        name: '活动管理',
        component: () => import('@/views/shakyrun/index')
      },
      {
        path: '/allLeadDayForm',
        name: '所有厅领导每日行程表',
        component: () => import('@/views/reportForm/leadShaky/allLeadDayForm')
      },
      {
        path: '/eachLeadWeekForm',
        name: '每个厅领导每周行程表',
        component: () => import('@/views/reportForm/leadShaky/eachLeadWeekForm')
      },
      {
        path: '/allLeadWeekForm',
        name: '所有厅领导每周行程表',
        component: () => import('@/views/reportForm/leadShaky/allLeadWeekForm')
      },
      {
        path: '/roomweekusestate',
        name: '会议室一周使用情况表',
        component: () => import('@/views/reportForm/roomRun/roomweekusestate')
      },
      {
        path: '/instructionsState',
        name: '呈批件情况一览表',
        component: () => import('@/views/reportForm/fromFile/instructionsState')
      },
      {
        path: '/circularsState',
        name: '传阅件情况一览表',
        component: () => import('@/views/reportForm/fromFile/circularsState')
      },
      {
        path: '/superviseState',
        name: '督办件情况一览表',
        component: () => import('@/views/reportForm/fromFile/superviseState')
      },
      {
        path: '/proposalState',
        name: '政协提案一览表',
        component: () => import('@/views/reportForm/fromFile/proposalState')
      },
      {
        path: '/NpcState',
        name: '人大建议一览表',
        component: () => import('@/views/reportForm/fromFile/NpcState')
      },
      {
        path: '/system',
        name: '系统设置',
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
