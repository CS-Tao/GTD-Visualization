import request from '@/utils/request'

// get fixed time pie data
export function getPie (params) {
  return request({
    url: '/gtd/api/tdinfo/statistics',
    method: 'get',
    params
  })
}
