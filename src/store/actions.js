/*
 * @Author: your name
 * @Date: 2019-12-31 12:46:28
 * @LastEditTime : 2019-12-31 17:14:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\store\actions.js
 */
import {wxSetting, wxGetuserInfo} from '@/api/wxApi'
const actions = {
  async _wxGetuserInfo ({commit, state}) {
    const result = await wxSetting()
    const {authSetting} = result
    console.log(authSetting)
    if (!authSetting['scope.userInfo']) {
      wx.navigateTo({ url: '/pages/auth/main' })
    } else {
      const userInfo = await wxGetuserInfo()
      commit('getWxUserInfo', userInfo)
      console.log(userInfo)
    }
  }
}
export default actions
