import request from '@/utils/request'

// get Trend json
export function getTrend (params) {
  return request({
    url: '/gtd/api/tdinfo/trend',
    method: 'get',
    params
  })
}
