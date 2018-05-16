import request from '@/utils/request'

// get a certain year pie data
export function getPie (params) {
  return request({
    url: '/gtd/api/tdinfo/statistics',
    method: 'get',
    params
  })
}

// get a certain year bar data
export function getBar (params) {
  // console.log(JSON.stringify(params))
  return request({
    url: '/gtd/api/tdinfo/globalStatistics',
    method: 'get',
    params
  })
}
