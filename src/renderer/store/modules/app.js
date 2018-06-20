import Vue from 'vue'

const nextTickInterval = 300 // 更新时长由 styles/sidebar.scss 的 hideSidebar 类的动画决定

function reactForSidebar () {
  Vue.nextTick(() => {
    let timer = setInterval(() => {
      Vue.triggerResize()
    }, 300 / 30)
    setTimeout(() => {
      clearInterval(timer)
      Vue.triggerResize()
    }, nextTickInterval)
  })
}

const app = {
  state: {
    sidebar: {
      opened: false
    },
    routerView: {
      showMode: 0 // 0 for hidden, 1 for normal, 2 for maxsize
    },
    isAppFullScreen: false,
    timeAnalysisMode: {mode: 'global', display: [], enable: false}
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      reactForSidebar()
    },
    CHANGE_TOGGLE_SIDEBAR_STATUS: (state, bool) => {
      state.sidebar.opened = bool
      reactForSidebar()
    },
    CHANGE_ROUTER_VIEW_SHOW_MODE: (state, mode) => {
      state.routerView.showMode = mode
      Vue.triggerResize()
    },
    TOGGLE_FULL_SCREEN: (state, bool) => {
      state.isAppFullScreen = bool
    },
    CHANGE_TIME_ANALYSIS_MODE: (state, mode) => {
      state.timeAnalysisMode = mode
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    changeSideBarStatus ({ commit }, bool) {
      commit('CHANGE_TOGGLE_SIDEBAR_STATUS', bool)
    },
    changeRouterViewShowMode ({ commit }, mode) {
      commit('CHANGE_ROUTER_VIEW_SHOW_MODE', mode)
    },
    toggleFullScreen ({ commit }, bool) {
      commit('TOGGLE_FULL_SCREEN', bool)
    },
    changeTimeAnalysisMode ({ commit }, mode) {
      commit('CHANGE_TIME_ANALYSIS_MODE', mode)
    }
  }
}

export default app
