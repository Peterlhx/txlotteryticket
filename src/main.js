// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import defaultFontSize from '@/utils/rem'
import '@/assets/css/sprites.css'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false

/* px转换rem */
defaultFontSize()

/**
* 自定义过滤器 zeroFill
* 小于10的数字补0
*/
Vue.filter('zeroFill', function (value) {
  return value < 10 ? '0' + value : value
})

/**
* 自定义过滤器 formatAmount
* 根据数值大小，填充亿，万
*/
Vue.filter('formatAmount', function (value) {
  value = parseInt(value)

  if (isNaN(value)) return ''

  let x = parseInt(value / 10000) % 10000
  let y = parseInt(value / 100000000)
  let result = []

  if (y) {
    result = [y, '亿']

    if (x) result = result.concat([x, '万'])
  } else if (x) {
    result = [x, '万']
  }
  return result.join('')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
