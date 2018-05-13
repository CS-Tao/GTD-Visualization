const getters = {
  sidebar: state => state.app.sidebar,
  routerViewMode: state => state.app.routerView.showMode,
  isAppFullScreen: state => state.app.isAppFullScreen,
  visitedViews: state => state.cachedViews.visitedViews,
  cachedViews: state => state.cachedViews.cachedViews
}
export default getters
