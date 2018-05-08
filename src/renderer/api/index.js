import request from '@/utils/request'

export function getTest (data) {
  return request({
    url: '/gettest',
    method: 'get',
    params: data
  })
}

export function postTest (data) {
  return request({
    url: '/posttest',
    method: 'post',
    params: data
  })
}
