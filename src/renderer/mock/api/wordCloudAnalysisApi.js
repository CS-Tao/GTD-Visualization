import { param2Obj } from '@/utils'
import wordCloudData from '../dataset/wordcloudAnalysis/wordCloudData'
import eventsInfoData from '../dataset/wordcloudAnalysis/eventsInfoData'

export default {
  getWordCloudData: config => {
    console.log('Mock: ' + config.url)
    const { limit } = param2Obj(config.url)
    return wordCloudData().filter((item, index) => {
      return index < limit
    })
  },
  getTdInfo: config => {
    console.log('Mock: ' + config.url)
    return eventsInfoData()
  }
}
