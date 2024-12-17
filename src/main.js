import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import 'xe-utils'

import VXETable from 'vxe-table'
import VXETablePluginElement from 'vxe-table-plugin-element'

import 'vxe-table/lib/style.css'
import 'vxe-table-plugin-element/dist/style.css'

import '@/styles/index.scss' // global css

import App from './App'
import _ from "lodash"
import VueSocketIO from 'vue-socket.io'

import XEUtils from 'xe-utils'


import store from './store'
import { i18n } from './i18n'
import router from './router'
import filters from  '@/filters'
//自定义中英文包


import '@/icons' // icon
import '@/permission' // permission control
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
Vue.prototype._ = _
Vue.prototype.$XModal = VXETable.modal
Vue.prototype.$utils = XEUtils

Date.prototype.format = function (fmt) {

  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "S": this.getMilliseconds(),//毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1))
    for (var k in o){
      if (new RegExp("(" + k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr((""+o[k]).length)))
      }
    }
    return fmt
  }
}


if (0 && process.env.NODE_ENV === 'production') {
 const { mockXHR } = require('../mock')
 mockXHR()
}
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
VXETable.use(VXETablePluginElement)
Vue.use(VXETable)
Vue.use(filters)
import '@/plugins'


// console.log('process.env.WEBSOCKET_ADDR  ==> ',process.env)
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: process.env.VUE_APP_WEBSOCKET_ADDR,
//   // options: {path: "/", transports:["websocket", "polling", "flashsocket"]}
//   // connection: 'http://172.16.1.33:8001',
//   // connection: 'http://172.16.2.229:58990',
//   // connection: `${window.location.protocol}//${window.location.port}/OMS`,
//
//   // options: { path: "/test/" } //Optional options
// }))

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
