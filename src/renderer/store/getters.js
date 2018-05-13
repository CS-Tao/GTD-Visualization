const getters = {
  sidebar: state => state.app.sidebar,
  routerViewMode: state => state.app.routerViewMode,
  routerViewCanShow: state => state.app.routerViewCanShow,
  visitedViews: state => state.cachedViews.visitedViews,
  cachedViews: state => state.cachedViews.cachedViews
}
export default getters
