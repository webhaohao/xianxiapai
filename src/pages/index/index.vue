<template>
  <div class="page">
    <div class="header">
          <img src="/static/images/header.jpg" alt="" class="header_bg">
          <div class="content">
              <div class="logo">
                    <img src="/static/images/logo.png" alt="" class="logoImg">
              </div>
              <search-box></search-box>
          </div>
    </div> 
    <div class="vant-tabs-content">
        <van-tabs 
            :active="active" 
            @change="onChange" 
            :border="false" 
             swipeable
            :sticky="true"
        >
          <van-tab title="热门搜索">内容 1</van-tab>
          <van-tab title="个人活动">内容 2</van-tab>
          <van-tab title="组织活动">内容 3</van-tab>
          <van-tab title="体育活动">内容 4</van-tab>
        </van-tabs>
    </div>
    <!-- <van-button>测试</van-button> -->
    <tab-bar :tabbar = "tabbar"></tab-bar>
  </div>
</template>

<script>
// import { getCurrentPageUrl } from '@/utils/index'
import card from '@/components/card'
import tabBar from '@/components/tabBar'
import searchBox from '@/components/searchBox'
export default {
  components: {
    card, tabBar, searchBox
  },
  data () {
    return {
      tabbar: {
        backgroundColor: '#ffffff',
        color: '#979795',
        selectedColor: '#1c1c1b',
        list: [
          {
            'pagePath': '/pages/index/main',
            'iconPath': '/static/icon/active.png',
            'selectedIconPath': '/static/icon/active_1.png',
            'text': '活动'
          },
          {
            'pagePath': '/pages/news/main',
            'iconPath': '/static/icon/new.png',
            'selectedIconPath': '/static/icon/new_1.png',
            'text': '新鲜'
          },
          {
            'pagePath': '/pages/middle/middle',
            'iconPath': '/static/icon/icon_release.png',
            'isSpecial': true,
            'text': '发布'
          },
          {
            'pagePath': '/pages/mine/mine',
            'iconPath': '/static/icon/money.png',
            'selectedIconPath': '/static/icon/money_1.png',
            'text': '兑换'
          },
          {
            'pagePath': '/pages/mine/mine',
            'iconPath': '/static/icon/heart.png',
            'selectedIconPath': '/static/icon/heart_1.png',
            'text': '我的'
          }
        ]
      },
      active: 0
    }
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    editTabbar () {
      let tabbar = this.tabbar
      // let currentPages = getCurrentPages()
      // let _this = currentPages[currentPages.length - 1]
      console.log(this.$root.$mp.appOptions.path)
      let pagePath = this.$root.$mp.appOptions.path;
      (pagePath.indexOf('/') !== 0) && (pagePath = '/' + pagePath)
      for (let i in tabbar.list) {
        tabbar.list[i].selected = false;
        (tabbar.list[i].pagePath === pagePath) && (tabbar.list[i].selected = true)
      }
      this.tabbar = tabbar
    }
  },
  created () {
    const baseURL = process.env.API_BASE_URL
    console.log(baseURL)
    // let app = getApp()
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res.code)
          // 发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  mounted () {
    this.editTabbar()
  }
}
</script>

<style scoped>
/* 20191215 */
.header_bg{
   width:750rpx;
   height:391rpx;
}
.header{
    position: relative;
}
.header .content{
    position: absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    display:flex;
    align-items:center;
    flex-direction: column;
}
.logo{
    display:flex;
    justify-content:center;
    padding-top:80rpx;
}
.logo .logoImg{
    width:179rpx;
    height:59rpx;
}
.vant-tabs-content{
    position: relative;
    top:-100rpx;
    background:transparent;
}
.vant-tabs-content >>> .van-tabs__scroll{
  background:transparent;
}
.vant-tabs-content >>> .van-tab{
  color:#fff;
}
.vant-tabs-content >>> .van-tabs__line{
  background:#fff;
}
</style>
