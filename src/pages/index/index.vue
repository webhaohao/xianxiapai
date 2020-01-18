<template>
  <div class="page">
    <div class="header">
          <img src="/static/images/header.jpg" alt="" class="header_bg">
          <div class="content">
              <div class="logo">
                    <img src="/static/images/logo.png" alt="" mode="aspectFill"  class="logoImg">
              </div>
              <div @click="jumpSearch">
                    <search-box></search-box>
              </div>
          </div>
    </div> 
    <div class="vant-tabs-content">
          <van-tabs 
            :active="active" 
            @change="onChange" 
            :border="false" 
             swipeable
          >
          <van-tab :title="item.name" 
                   v-for="(item,index) in activityType" 
                   :key="index"
          >
                  <block v-if="item.name === '热门搜索'">
                    <div class="banner">
                         <swiper
                                  class="swiper-contaner"
                                  :indicator-dots="false"
                                  :autoplay="true"
                                  :duration='1500'
                                  :circular="true"
                                  :current="swiperCurrentIndex"
                                >
                                <block >
                                    <swiper-item v-for="(banneritem,i) in bannerItems" :key="i" @click="bannerItemClick(banneritem)">
                                          <img              
                                              class='slide-image' 
                                              mode='aspectFit' 
                                              :src="banneritem.img.url" 
                                          />
                                    </swiper-item>   
                                </block>  
                            </swiper>  
                    </div>      
                    <div class="list">
                      <van-tabs @change="tabItemChange" :active="tabs_item_active" :border="false">
                        <van-tab :title="o.title" v-for="(o,i) in filterItems" :key="i">
                              <card :list ="activity"></card>
                        </van-tab>
                      </van-tabs>
                    </div>
                  </block>
                  <block v-else>
                    <div>
                        <card :list ="activity"></card>
                    </div>
                  </block>
          </van-tab>
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
import { getToken, getActivitesByActivityTypeId, getActivityByKeywords, getAllActivityType, getBanner } from '@/api/serverApi'
// import list from '@/components/list'
export default {
  components: {
    card, tabBar, searchBox
  },
  data () {
    return {
      active: 0,
      tabs_item_active: 0,
      bannerItems: [],
      activity: [],
      activityType: [],
      swiperCurrentIndex: 0,
      filterItems: [
        {
          title: '按热度'
        },
        {
          title: '按时间'
        },
        {
          title: '按积分'
        }
      ]
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
      const {index} = event.mp.detail
      if (index === 0) {
        return false
      } else {
        const {id} = this.activityType[index]
        const result = await getActivitesByActivityTypeId({id, page: 1, size: 10})
        this.activity = result.data
      }
      console.log(index)
      // let scope = 16
      // if (title === '个人活动') {
      //   scope = 16
      // } else if (title === '组织活动') {
      //   scope = 32
      // }
    },
    async tabItemChange (event) {
      console.log(event)
      this.activity = await getActivityByKeywords()
    },
    bannerItemClick (item) {
      console.log(item)
      const url = `/pages/activityDetails/main?id=${item.key_word}`
      wx.navigateTo({url})
    },
    jumpSearch () {
      const url = `/pages/search/main`
      wx.navigateTo({url})
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
    })()
  },
  async mounted () {
    this.activityType = await getAllActivityType()
    this.activityType.splice(0, 0, {
      name: '热门搜索',
      scope: 0
    })
    console.log(this.activityType)
    this.activity = await getActivityByKeywords()
    const result = await getBanner(1)
    this.bannerItems = result.items
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
.banner swiper{
   height:418rpx;
}
</style>
