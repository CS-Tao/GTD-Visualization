import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'
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
    mode: 0                      aside, 0 for hidden, 1 for normal, 2 for maxsize
  }
**/
export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: require('@/views/Blank').default,
        name: 'space-time',
        meta: { title: 'Overview', icon: 'international', noCache: false, mode: 0 }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'trend-analysis',
        component: require('@/views/TrendAnalysis').default,
        name: 'trend-analysis',
        meta: { title: 'Occurrence Trend', icon: 'form', noCache: false, mode: 1 }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'time-analysis',
        component: require('@/views/TimeAnalysis').default,
        name: 'time-analysis',
        meta: { title: 'Period Analysis', icon: 'example', noCache: false, mode: 2 }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'general-analysis',
        component: require('@/views/GeneralAnalysis').default,
        name: 'general-analysis',
        meta: { title: 'Attack Details', icon: 'component', noCache: false, mode: 2 }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'wordcloud-analysis',
        component: require('@/views/WordCloudAnalysis').default,
        name: 'wordcloud-analysis',
        meta: { title: 'Motive Analysis', icon: 'message', noCache: false, mode: 2 }
      }
    ]
  },
  { path: '/404', component: _import('ErrorPages/404'), hidden: true, mode: 2 }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{ path: '*', redirect: '/404', hidden: true }]
