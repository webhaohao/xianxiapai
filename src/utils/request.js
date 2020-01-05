/**
 * Created by zhengyi.fu on 2018/8/31.
 */
import { Token } from './token'
const host = process.env.API_BASE_URL
function request (url, method, data, header = {}, noRefetch = false) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, // 仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        wx.hideLoading()
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        const code = res.statusCode.toString()
        console.log('statusCode', code)
        const startChar = code.charAt(0)
        if (startChar === '2') {
          resolve(res.data)
        } else {
          if (code === '401') {
            if (!noRefetch) {
              _refetch(url, method, data)
            }
          }
          resolve(res.data)
        }
        // resolve(res.data)
      },
      fail: function (error) {
        wx.hideLoading()
        reject(error)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}
function _refetch (url, method, data) {
  const token = new Token()
  token.getTokenFromServer((token) => {
    request(url, method, data, {}, true)
  })
}

export default request
