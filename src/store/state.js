/*
 * @Author: your name
 * @Date: 2019-12-18 16:02:00
 * @LastEditTime : 2019-12-20 10:23:58
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\store\state.js
 */
const state = {
  tabbar: {
    backgroundColor: '#ffffff',
    color: '#979795',
    selectedColor: '#1c1c1b',
    list: [
      {
        'pagePath': '/pages/index/main',
        'iconPath': '/static/icon/active.png',
        'selectedIconPath': '/static/icon/active_1.png',
        'text': '活动',
        'selected': false
      },
      {
        'pagePath': '/pages/news/main',
        'iconPath': '/static/icon/new.png',
        'selectedIconPath': '/static/icon/new_1.png',
        'text': '新鲜',
        'selected': false
      },
      {
        'pagePath': '/pages/releaseActi/main',
        'iconPath': '/static/icon/icon_release.png',
        'isSpecial': true,
        'text': '发布',
        'selected': false
      },
      {
        'pagePath': '/pages/exChange/main',
        'iconPath': '/static/icon/money.png',
        'selectedIconPath': '/static/icon/money_1.png',
        'text': '兑换',
        'selected': false
      },
      {
        'pagePath': '/pages/personal/main',
        'iconPath': '/static/icon/heart.png',
        'selectedIconPath': '/static/icon/heart_1.png',
        'text': '我的',
        'selected': false
      }
    ]
  },
  wxUserInfo: {}
}
export default state
