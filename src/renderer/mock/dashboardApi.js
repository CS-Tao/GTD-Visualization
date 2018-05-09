import { param2Obj } from '@/utils'
import data from './generalData'

export default {
  getGeneral: config => {
    const { year } = param2Obj(config.url)
    console.log(year)
    return data
  }
}
