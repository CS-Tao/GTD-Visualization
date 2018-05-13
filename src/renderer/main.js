import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import './icons' // icon

import './mock' // simulation data

Vue.use(Element, {
  size: 'medium'
})

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
