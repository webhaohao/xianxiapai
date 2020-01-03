/*
 * @Author: your name
 * @Date: 2019-12-30 19:38:15
 * @LastEditTime : 2020-01-02 12:51:14
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
export function wxGetuserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: function (res) {
        resolve(res.userInfo)
      }
    })
  })
}

// 微信上传

export function wxUploadFile (data) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      ...data,
      success (res) {
        resolve(JSON.parse(res.data))
      }
    })
  })
}
