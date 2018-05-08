import Mock from 'mockjs'
import testApi from './testApi'

Mock.mock(/\/test\/gettest/, 'get', testApi.getTest)
Mock.mock(/\/test\/posttest/, 'post', testApi.postTest)
