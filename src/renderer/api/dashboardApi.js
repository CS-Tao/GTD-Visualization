import request from '@/utils/request'

// 获得整体数据
export function getGeneral (params) {
  return request({
    url: '/gtd/api/tdgeneral',
    method: 'get',
    params
  })
}
