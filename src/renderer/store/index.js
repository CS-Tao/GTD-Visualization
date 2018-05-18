import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import cachedViews from './modules/cachedViews'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    cachedViews
  },
  getters
})

export default store
