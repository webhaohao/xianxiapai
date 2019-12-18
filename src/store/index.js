/*
 * @Author: your name
 * @Date: 2019-12-18 16:00:21
 * @LastEditTime: 2019-12-18 16:43:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\store\index.js
 */
import Vue from 'vue'

import Vuex from 'vuex'

import state from './state'

import mutations from './mutations'

import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({

  state,

  mutations,

  getters

})
