import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

import App from './App'
import router from './router'
import store from './store'

import './icons' // icon

import './mock' // simulation data

locale.use(lang)

Vue.use(Element, {
  size: 'medium',
  locale
})

Vue.triggerResize = () => {
  let e = document.createEvent('Event')
  e.initEvent('resize', true, true)
  window.dispatchEvent(e)
}

Vue.prototype.$triggerResize = Vue.triggerResize

Vue.changeLayout = (instance) => {
  // console.log(instance.$route.meta.mode)
  if (instance.$route && instance.$route.meta && instance.$route.meta.mode !== undefined) {
    instance.$store.dispatch('changeRouterViewShowMode', instance.$route.meta.mode)
  }
}

Vue.prototype.$changeLayout = function () {
  // console.log(this.$route.meta.mode)
  if (this.$route && this.$route.meta && this.$route.meta.mode !== undefined) {
    this.$store.dispatch('changeRouterViewShowMode', this.$route.meta.mode)
  }
}

Vue.config.productionTip = false

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: h => h(App),
  components: { App },
  mounted () {
    this.$router.push({ path: '/dashboard' })
  }
})
