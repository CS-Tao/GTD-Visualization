import Mock from 'mockjs'
import testApi from './testApi'
import dashboardApi from './dashboardApi'

// 测试
Mock.mock(/\/test\/gettest/, 'get', testApi.getTest)
Mock.mock(/\/test\/posttest/, 'post', testApi.postTest)

// 主页
Mock.mock(/\/gtd\/api\/tdgeneral/, 'get', dashboardApi.getGeneral)
