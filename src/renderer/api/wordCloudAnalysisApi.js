import request from '@/utils/request'

// 获得词云数据
export function getWordcloudData (params) {
  return request({
    url: '/gtd/api/wordcloud/',
    method: 'get',
    params
  })
}

// 返回某一id对应的袭击详细数据
export function getTdInfo (params) {
  return request({
    url: '/gtd/api/tdinfo/',
    method: 'get',
    params
  })
}
