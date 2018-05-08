import request from '@/utils/request'

// Get 测试
export function getTest (params) {
  return request({
    url: '/test/gettest',
    method: 'get',
    params
  })
}

// Post 测试
export function postTest (data) {
  return request({
    url: '/test/posttest',
    method: 'post',
    data
  })
}
