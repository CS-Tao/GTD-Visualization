const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.cachedViews.visitedViews,
  cachedViews: state => state.cachedViews.cachedViews
}
export default getters
