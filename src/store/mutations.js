/*
 * @Author: your name
 * @Date: 2019-12-18 16:01:18
 * @LastEditTime: 2019-12-18 16:29:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\store\mutations.js
 */
const mutations = {

  editTabbar (state, pagePath) {
    // state.houseContent = result
    (pagePath.indexOf('/') !== 0) && (pagePath = '/' + pagePath)
    const list = state.tabbar.list
    for (let i in list) {
      list[i].selected = false;
      (list[i].pagePath === pagePath) && (list[i].selected = true)
    }
    state.tabbar.list = list
  },
  getWxUserInfo (state, value) {
    state.wxUserInfo = value
  },
  getActivityItem (state, item) {
    state.activityItem = item
  }
}

export default mutations
