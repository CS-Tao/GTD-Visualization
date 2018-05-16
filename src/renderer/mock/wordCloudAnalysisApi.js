import { param2Obj } from '@/utils'
import wordCloudData from './wordCloudData'
import eventsInfoData from './eventsInfoData'

export default {
  getWordCloudData: config => {
    const { limit } = param2Obj(config.url)
    return wordCloudData.filter((item, index) => {
      return index < limit
    })
  },
  getTdInfo: config => {
    return eventsInfoData
  }
}
