import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import '../../src/renderer/styles/index.scss' // global css

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

import App from '../../src/renderer/App.vue'
import router from '../../src/renderer/router'
import store from '../../src/renderer/store'

import '../../src/renderer/icons' // icon

import '../../src/renderer/mock' // simulation data

locale.use(lang)

Vue.use(Element, {
  size: 'medium',
  locale
})

Vue.triggerResize = () => {
  let e = document.createEvent('Event')
  e.initEvent('resize', true, true)
  window.dispatchEvent(e)
}

Vue.prototype.$triggerResize = Vue.triggerResize

Vue.changeLayout = (instance) => {
  // console.log(instance.$route.meta.mode)
  if (instance.$route && instance.$route.meta && instance.$route.meta.mode !== undefined) {
    instance.$store.dispatch('changeRouterViewShowMode', instance.$route.meta.mode)
  }
}

Vue.prototype.$changeLayout = function () {
  // console.log(this.$route.meta.mode)
  if (this.$route && this.$route.meta && this.$route.meta.mode !== undefined) {
    this.$store.dispatch('changeRouterViewShowMode', this.$route.meta.mode)
  }
}

Vue.config.productionTip = false

let id = 0;

const createElm = function() {
  const elm = document.createElement('div');

  elm.id = 'app' + ++id;
  document.body.appendChild(elm);

  return elm;
};

/**
 * 回收 vm
 * @param  {Object} vm
 */
exports.destroyVM = function(vm) {
  vm.$destroy && vm.$destroy();
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el);
};

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createVue = function(Compo, mounted = false) {
  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo };
  }
  return new Vue(Compo).$mount(mounted === false ? null : createElm());
};

/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createTest = function(Compo, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData;
    propsData = {};
  }
  const elm = createElm();
  const Ctor = Vue.extend(Compo);
  return new Ctor({ propsData, router, store }).$mount(mounted === false ? null : elm);
};

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
exports.triggerEvent = function(elm, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt);

  return elm;
};

/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} elm
 * @param {*} opts
 */
exports.triggerClick = function(elm, ...opts) {
  exports.triggerEvent(elm, 'mousedown', ...opts);
  exports.triggerEvent(elm, 'mouseup', ...opts);

  return elm;
};