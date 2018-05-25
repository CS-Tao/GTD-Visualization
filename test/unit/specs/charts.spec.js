/* eslint-disable */
import { createTest, destroyVM } from '../util'
import Bar from '@/components/Charts/bar'
import Country3ModelRadar from '@/components/Charts/country3ModelRadar'
import CountryBar from '@/components/Charts/countryBar'
import CountryScatter from '@/components/Charts/countryScatter'
import EPolyline from '@/components/Charts/ePolyline'
import GlobeTrendLine from '@/components/Charts/globeTrendLine'
import Keyboard from '@/components/Charts/keyboard'
import Pie from '@/components/Charts/pie'
import Radar from '@/components/Charts/radar'
import RegionCountBar from '@/components/Charts/regionCountBar'
import RegionStatisticsBar from '@/components/Charts/regionStatisticsBar'
import Scatter from '@/components/Charts/scatter'
import Year3ModelPie from '@/components/Charts/year3ModelPie'

describe('Charts', () => {
  it('Bar', () => {
    let vm = createTest(Bar, {id: 'bar'}, true);
    let el = vm.$el;
    expect(el.id === 'bar').to.be.true
  })
  
  it('Country3ModelRadar', () => {
    let vm = createTest(Country3ModelRadar, {id: 'Country3ModelRadar'}, true);
    let el = vm.$el;
    expect(el.id === 'Country3ModelRadar').to.be.true
  })
  
  it('CountryBar', () => {
    let vm = createTest(CountryBar, {id: 'CountryBar'}, true);
    let el = vm.$el;
    expect(el.id === 'CountryBar').to.be.true
  })
  
  it('CountryScatter', () => {
    let vm = createTest(CountryScatter, {id: 'CountryScatter'}, true);
    let el = vm.$el;
    expect(el.id === 'CountryScatter').to.be.true
  })
  
  it('EPolyline', () => {
    let vm = createTest(EPolyline, {id: 'EPolyline'}, true);
    let el = vm.$el;
    expect(el.id === 'EPolyline').to.be.true
  })
  
  it('GlobeTrendLine', () => {
    let vm = createTest(GlobeTrendLine, {id: 'GlobeTrendLine'}, true);
    let el = vm.$el;
    expect(el.id === 'GlobeTrendLine').to.be.true
  })
  
  it('Keyboard', () => {
    let vm = createTest(Keyboard, {id: 'Keyboard'}, true);
    let el = vm.$el;
    expect(el.id === 'Keyboard').to.be.true
  })
  
  it('Pie', () => {
    let vm = createTest(Pie, {id: 'Pie'}, true);
    let el = vm.$el;
    expect(el.id === 'Pie').to.be.true
  })
  
  it('Radar', () => {
    let vm = createTest(Radar, {id: 'Radar'}, true);
    let el = vm.$el;
    expect(el.id === 'Radar').to.be.true
  })
  
  it('RegionCountBar', () => {
    let vm = createTest(RegionCountBar, {id: 'RegionCountBar'}, true);
    let el = vm.$el;
    expect(el.id === 'RegionCountBar').to.be.true
  })
  
  it('RegionStatisticsBar', () => {
    let vm = createTest(RegionStatisticsBar, {id: 'RegionStatisticsBar'}, true);
    let el = vm.$el;
    expect(el.id === 'RegionStatisticsBar').to.be.true
  })
  
  it('Scatter', () => {
    let vm = createTest(Scatter, {id: 'Scatter'}, true);
    let el = vm.$el;
    expect(el.id === 'Scatter').to.be.true
  })
  
  it('Year3ModelPie', () => {
    let vm = createTest(Year3ModelPie, {id: 'Year3ModelPie'}, true);
    let el = vm.$el;
    expect(el.id === 'Year3ModelPie').to.be.true
  })
})
