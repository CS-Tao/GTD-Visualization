/* eslint-disable */
import { createTest, destroyVM } from '../util'
import { AppHeader, Sidebar, AppMain } from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'
import Charts from '@/components/Charts'
import Hamburger from '@/components/Hamburger'
import LandingPage from '@/components/LandingPage'
import LedDateDisplay from '@/components/LedDateDisplay'
import LeafletView from '@/components/MapView/LeafletView'
import RotateSelector from '@/components/RotateSelector'
import Screenfull from '@/components/Screenfull'
import SvgIcon from '@/components/SvgIcon'
import WordCloud from '@/components/WordCloud'

describe('Components', () => {
  it('AppHeader', () => {
    let vm = createTest(AppHeader, {}, true);
    let el = vm.$el;
    expect(el.classList.contains('navbar')).to.be.true
  })

  it('Sidebar', () => {
    let vm = createTest(Sidebar, {}, true);
    let el = vm.$el;
    expect(el.classList.contains('scroll-container')).to.be.true
  })

  it('AppMain', () => {
    let vm = createTest(AppMain, {}, true);
    let el = vm.$el;
    expect(el.classList.contains('app-main')).to.be.true
  })

  it('Breadcrumb', () => {
    let vm = createTest(Breadcrumb, {}, true);
    let el = vm.$el;
    expect(el.classList.contains('app-breadcrumb')).to.be.true
  })

  it('Charts', () => {
    let vm = createTest(Charts, {}, true);
    let el = vm.$el;
    expect(el.classList.contains('chart-container')).to.be.true
  })

  it('Hamburger', () => {
    let vm = createTest(Hamburger, {}, true);
    let el = vm.$el;
    expect(el.querySelector('.hamburger')).to.be.ok
  })

  it('LandingPage', () => {
    let vm = createTest(LandingPage, {}, true);
    let el = vm.$el;
    expect(el.querySelector('.title').textContent).to.contain('Welcome to your new project!')
  })

  it('LedDateDisplay', () => {
    let vm = createTest(LedDateDisplay, {}, true);
    let el = vm.$el;
    expect(el.classList.contains('wrap')).to.be.true
  })

  it('LeafletView', () => {
    let vm = createTest(LeafletView, {mapId: 'LeafletViewTestId'}, true);
    let el = vm.$el;
    expect(el.classList.contains('leaft-map-view')).to.be.true
    expect(el.id === 'LeafletViewTestId').to.be.true
  })

  it('RotateSelector', () => {
    let vm = createTest(RotateSelector, {}, true);
    let el = vm.$el;
    expect(el.querySelector('.col-wrapper')).to.be.ok
  })

  it('Screenfull', () => {
    let vm = createTest(Screenfull, {}, true);
    let el = vm.$el;
    expect(el.querySelector('svg')).to.be.ok
  })

  it('SvgIcon', () => {
    let vm = createTest(SvgIcon, {iconClass: 'example'}, true);
    let el = vm.$el;
    expect(el.classList.contains('svg-icon')).to.be.true
  })

  it('WordCloud', () => {
    let vm = createTest(WordCloud, {data: []}, true);
    let el = vm.$el;
    expect(el.classList.contains('wordCloud')).to.be.true
  })

})
