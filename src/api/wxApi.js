/*
 * @Author: your name
 * @Date: 2019-12-30 19:38:15
 * @LastEditTime : 2019-12-31 12:43:23
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\api\wxApi.js
 */
export function wxLogin () {
  return new Promise((resolve, reject) => {
    wx.login({
      success (res) {
        if (res.code) {
          resolve(res.code)
        } else {
          reject(res.errMsg)
        }
      }
    })
  })
}
// 查看是否授权
export function wxSetting () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success (res) {
        resolve(res)
      }
    })
  })
}

// 获取用户信息
export function wxGetuserInfo (resolve, reject) {
  return new Promise(() => {
    wx.getUserInfo({
      success: function (res) {
        resolve(res.userInfo)
      }
    })
  })
}
