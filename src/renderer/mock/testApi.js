import { param2Obj } from '@/utils'

export default {
  getTest: config => {
    const { param1 } = param2Obj(config.url)
    return ('Get 测试成功, 传入 param1 参数的值为: ' + param1)
  },
  postTest: config => {
    const { param1 } = JSON.parse(config.body)
    return ('Post 测试成功, 传入 param1 参数的值为: ' + param1)
  }
}
