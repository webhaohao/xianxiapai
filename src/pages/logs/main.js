/*
 * @Author: your name
 * @Date: 2019-12-03 18:35:21
 * @LastEditTime: 2019-12-03 19:02:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\logs\main.js
 */
import Vue from 'vue'
import App from './index'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
// 添加全局配置、拦截器等
Vue.prototype.$http = fly // 将fly实例挂在vue原型上
const app = new Vue(App)
app.$mount()
