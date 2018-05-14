import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    routerView: {
      showMode: 0 // 0 for hidden, 1 for normal, 2 for maxsize
    },
    isAppFullScreen: false
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (!state.sidebar.opened) {
        Cookies.set('sidebarStatus', 0)
      } else {
        Cookies.set('sidebarStatus', 1)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    CHANGE_ROUTER_VIEW_SHOW_MODE: (state, mode) => {
      state.routerView.showMode = mode
    },
    TOGGLE_FULL_SCREEN: (state, bool) => {
      state.isAppFullScreen = bool
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    changeRouterViewShowMode ({ commit }, mode) {
      commit('CHANGE_ROUTER_VIEW_SHOW_MODE', mode)
    },
    toggleFullScreen ({ commit }, bool) {
      commit('TOGGLE_FULL_SCREEN', bool)
    }
  }
}

export default app
