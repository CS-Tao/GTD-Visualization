import statisticData from '../dataset/generalAnalysis/statisticData'
import globalStatisticData from '../dataset/generalAnalysis/globalStatisticData'

export default {
  getStatisticData: config => {
    console.log('Mock: ' + config.url)
    return statisticData()
  },
  getGlobalStatisticData: config => {
    console.log('Mock: ' + config.url)
    return globalStatisticData()
  }
}
