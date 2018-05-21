import Mock from 'mockjs'
import dashboardApi from './api/dashboardApi'
import trendAnalysisApi from './api/trendAnalysisApi'
import generalAnalydsisApi from './api/generalAnalysisApi'
import wordCloudAnalysisApi from './api/wordCloudAnalysisApi'

Mock.setup({
  timeout: '10-300'
})

// 主页
Mock.mock(/\/gtd\/api\/tdgeneral/, 'get', dashboardApi.getGeneral)

// 趋势分析
Mock.mock(/\/gtd\/api\/tdinfo\/trend/, 'get', trendAnalysisApi.getTrend)

// 时段分析
// 不拦截

// 总体分析
Mock.mock(/\/gtd\/api\/tdinfo\/statistics/, 'get', generalAnalydsisApi.getStatisticData)
Mock.mock(/\/gtd\/api\/tdinfo\/globalStatistics/, 'get', generalAnalydsisApi.getGlobalStatisticData)

// 词云分析页面
Mock.mock(/\/gtd\/api\/wordcloud/, wordCloudAnalysisApi.getWordCloudData)
Mock.mock(/\/gtd\/api\/tdinfo/, wordCloudAnalysisApi.getTdInfo)
