/*
 * @Author: your name
 * @Date: 2019-12-03 18:35:21
 * @LastEditTime: 2019-12-18 16:21:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\main.js
 */
import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue(App)
console.log(app)
app.$mount()
export default {
}
