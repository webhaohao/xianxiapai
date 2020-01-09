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
          >
          <van-tab title="热门搜索">
                <div class="banner">
                      <img src="/static/images/banner.png" alt="">
                </div>      
                <div class="list">
                  <van-tabs @change="tabItemChange" :active="tabs_item_active" :border="false">
                    <van-tab title="按热度">
                          <card></card>
                    </van-tab>
                    <van-tab title="按时间">内容 2</van-tab>
                    <van-tab title="按距离">内容 3</van-tab>
                    <van-tab title="按积分">内容 4</van-tab>
                  </van-tabs>
                  </div>
                
          </van-tab>
          <van-tab title="个人活动">
                  <card :list ="activity"></card>
          </van-tab>
          <van-tab title="组织活动">
                   <card :list ="activity"></card>
          </van-tab>
          <van-tab title="体育活动">内容 4</van-tab>
        </van-tabs>
    </div>
    <!-- <van-button>测试</van-button> -->
    <tab-bar :tabbar="tabbar"></tab-bar>
  </div>
</template>

<script>
// import { getCurrentPageUrl } from '@/utils/index'
import card from '@/components/card'
import tabBar from '@/components/tabBar'
import searchBox from '@/components/searchBox'
import {wxLogin} from '@/api/wxApi'
import { getToken, getActivitesByScope } from '@/api/serverApi'
// import list from '@/components/list'
export default {
  components: {
    card, tabBar, searchBox
  },
  data () {
    return {
      active: 0,
      tabs_item_active: 0,
      activity: []
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
    async onChange (event) {
      console.log(event)
      const title = event.target.title
      let scope = 16
      if (title === '个人活动') {
        scope = 16
      } else if (title === '组织活动') {
        scope = 32
      }
      this.activity = await getActivitesByScope(scope)
      console.log(this.activity)
    },
    tabItemChange (event) {
      console.log(event)
    }
  },
  created () {
    const baseURL = process.env.API_BASE_URL
    console.log('baseURL', baseURL)
    // let app = getApp()
    return (async () => {
      const code = await wxLogin()
      console.log('code', code)
      const tokenResult = await getToken({code})
      wx.setStorageSync('token', tokenResult.token)
      console.log(tokenResult)
    })()
  },
  mounted () {
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
.banner img{
    width:750rpx;
    height:418rpx;
}
.list >>> .van-tab{
    color:#666;
}
.list >>> .van-tabs__line{
    background:#97cc92;
}
</style>
