import Mock from 'mockjs'
import testApi from './testApi'
import dashboardApi from './dashboardApi'
import wordCloudAnalysisApi from './wordCloudAnalysisApi'

// 测试
Mock.mock(/\/test\/gettest/, 'get', testApi.getTest)
Mock.mock(/\/test\/posttest/, 'post', testApi.postTest)

// 主页
Mock.mock(/\/gtd\/api\/tdgeneral/, 'get', dashboardApi.getGeneral)

// 词云分析页面
Mock.mock(/\/gtd\/api\/wordcloud/, wordCloudAnalysisApi.getWordCloudData)
Mock.mock(/\/gtd\/api\/tdinfo/, wordCloudAnalysisApi.getTdInfo)
