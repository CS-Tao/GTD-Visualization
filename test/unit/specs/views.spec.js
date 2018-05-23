/* eslint-disable */
import { createTest, destroyVM } from '../util'
import GeneralAnalysis from '@/views/GeneralAnalysis'
import TrendAnalysis from '@/views/TrendAnalysis'
import TimeAnalysis from '@/views/TimeAnalysis'
import WordcloudAnalysis from '@/views/WordCloudAnalysis'

describe('Views', () => {
  it('General Analysis', () => {
    let vm = createTest(GeneralAnalysis, {}, true);
    let el = vm.$el;
    expect(el.classList.contains('general-analysis-container')).to.be.true
  })

  it('Trend Analysis', () => {    
    let vm = createTest(TrendAnalysis, {}, true);
    let el = vm.$el;
    expect(el.classList.contains('trend-analysis')).to.be.true
  })

  it('Time Analysis', () => {
    let vm = createTest(TimeAnalysis, {}, true);
    let el = vm.$el;
    expect(el.classList.contains('time-analysis-container')).to.be.true
  })

  it('Wordcloud Analysis', () => {
    let vm = createTest(WordcloudAnalysis, {}, true);
    let el = vm.$el;
    expect(el.classList.contains('wrap')).to.be.true
  })
})
