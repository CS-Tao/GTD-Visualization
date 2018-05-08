import { param2Obj } from '@/utils'
import { Notification } from 'element-ui'

export default {
  getTest: config => {
    const { param1 } = param2Obj(config.url)
    Notification.success('Get 测试成功, 传入 param1 参数的值为: ' + param1)
  },
  postTest: config => {
    const { param1 } = JSON.parse(config.body)
    Notification.success('Post 测试成功, 传入 param1 参数的值为: ' + param1)
  }
}
