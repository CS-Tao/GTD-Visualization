import trendData from '../dataset/trendAnalysis/trendData'

export default {
  getTrend: config => {
    console.log('Mock: ' + config.url)
    return trendData()
  }
}
