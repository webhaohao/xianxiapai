// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头
class Token {
  constructor () {
    this.verifyUrl = process.env.API_BASE_URL + '/token/verify'
    this.tokenUrl = process.env.API_BASE_URL + '/token/user'
  }

  verify () {
    var token = wx.getStorageSync('token')
    if (!token) {
      this.getTokenFromServer()
    } else {
      this._veirfyFromServer(token)
    }
  }

  _veirfyFromServer (token) {
    var that = this
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.isValid
        if (!valid) {
          that.getTokenFromServer()
        }
      }
    })
  }

  getTokenFromServer (callBack) {
    wx.login({
      success: (res) => {
        wx.request({
          url: this.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.token)
            callBack && callBack(res.data.token)
          }
        })
      }
    })
  }
}

export {Token}
