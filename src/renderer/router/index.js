import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Main'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: require('@/views/Dashboard').default,
        name: 'space-time',
        meta: { title: '时空动态分析', icon: 'international', noCache: false }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    meta: {
      title: '测试页面',
      icon: 'password'
    },
    children: [
      {
        path: 'two1',
        component: require('@/components/Charts').default,
        name: 'three',
        meta: { title: 'Echarts 图表', icon: 'chart', noCache: true }
      },
      {
        path: 'two2',
        component: require('@/components/LandingPage').default,
        name: 'four',
        meta: { title: '测试页面2', icon: 'user', noCache: true }
      }
    ]
  },
  { path: '/404', component: _import('ErrorPages/404'), hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{ path: '*', redirect: '/404', hidden: true }]
