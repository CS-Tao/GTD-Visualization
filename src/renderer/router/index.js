import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      meta: { title: '主页面', icon: 'dashboard', noCache: true }
    },
    { path: '/404', component: require('@/views/ErrorPages/404').default, hidden: true },
    // {
    //   path: '/mapview',
    //   redirect: 'noredirect',
    //   name: 'Visual Map',
    //   meta: {
    //     title: 'visualmap',
    //     icon: 'international'
    //   },
    //   children: [
    //     {
    //       path: 'map',
    //       component: _import('mapview/map'),
    //       name: 'ArcGISMap',
    //       meta: { title: 'arcgismap', noCache: false }
    //     },
    //     {
    //       path: 'scene',
    //       component: _import('mapview/scene'),
    //       name: 'ArcGISScene',
    //       meta: { title: 'arcgissence', noCache: false }
    //     }
    //   ]
    // },
    {
      path: '/test',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      meta: { title: '测试页面', icon: 'dashboard', noCache: true }
    },
    {
      path: '*',
      redirect: '/',
      meta: { title: '主页面', icon: 'dashboard', noCache: true }
    }
  ]
})
