import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    routerView: {
      showMode: !+Cookies.get('routerViewShowMode') // 0 for hidden, 1 for normal, 2 for maxsize
    }
  },
  getters: {
    routerViewCanVisiable (state) {
      return state.routerView.showMode !== 0
    }
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
    Change_ROUTER_VIEW_SHOW_MODE: state => (mode) => {
      Cookies.set('routerViewShowMode', mode)
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    changeRouterViewShowMode ({commit}, mode) {
      commit('Change_ROUTER_VIEW_SHOW_MODE', mode)
    }
  }
}

export default app
