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
                   :name="item.name"
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
                                              mode='widthFix' 
                                              :src="banneritem.img.url" 
                                          />
                                    </swiper-item>   
                                </block>  
                            </swiper>  
                    </div>      
                  </block>
                  <block v-if="item.name === '体育圈'">
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
                                    <swiper-item v-for="(banneritem,i) in tYbannerItems" :key="i" @click="bannerItemClick(banneritem)">
                                          <img              
                                              class='slide-image' 
                                              mode='widthFix' 
                                              :src="banneritem.img.url" 
                                          />
                                    </swiper-item>   
                                </block>  
                            </swiper>  
                    </div>      
                  </block>
          </van-tab>
        </van-tabs>
         <div class="list">
                <div class="tabs">
                  <van-tabs @change="tabItemChange" :active="tabs_item_active" :border="false">
                    <div class="icon" slot="nav-right" @click="iconTypeClick">
                        <van-icon name="apps-o" size="25px" :color="filterIconColor"/>
                    </div>
                    <van-tab :title="o.title" v-for="(o,i) in filterItems" :key="i" :name="o.title">
                          <card :list ="activity"></card>
                    </van-tab>
                  </van-tabs>
                </div>
          </div>
    </div>
    <van-popup
        :show="visiblePopup"
        position="center"
        custom-style="width:80%;"
        round
        @clickOverlay="clickOverlay"
        @close="onClose"
    >
        <div class="activity-category">
              <van-divider contentPosition="center">活动类型</van-divider>
              <van-grid  column-num="3" :border="false">
                <van-grid-item  use-slot v-for="(item,index) in categories" :key="index" @click="filterItemClick(item,index)">
                      <span :class="[{'active':item.active}]">{{item.name}}</span>
                </van-grid-item>
              </van-grid>
        </div>
    </van-popup>
    <tab-bar :tabbar="tabbar"></tab-bar>
  </div>
</template>

<script>
// import { getCurrentPageUrl } from '@/utils/index'
import card from '@/components/card'
import tabBar from '@/components/tabBar'
import searchBox from '@/components/searchBox'
import {wxLogin} from '@/api/wxApi'
import { getToken, getActivitesByFilter, getCategoryByActivityTypeId, getAllActivityType, getBanner } from '@/api/serverApi'
// import list from '@/components/list'
export default {
  components: {
    card, tabBar, searchBox
  },
  data () {
    return {
      active: '',
      bannerItems: [],
      tYbannerItems: [],
      activity: [],
      visiblePopup: false,
      activityType: [],
      swiperCurrentIndex: 0,
      categories: [],
      tabs_item_active: '按热度',
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
      ],
      page: 1,
      size: 10,
      id: '',
      alreadyId: -1,
      categoryId: 0
    }
  },
  computed: {
    filterIconColor () {
      if (this.active !== '热门搜索') {
        return '#00b1e2'
      }
      return '#fff'
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
    async iconTypeClick () {
      if (this.active === '热门搜索') {
        return false
      }
      if (this.id !== this.alreadyId) {
        this.categories = await getCategoryByActivityTypeId({activityTypeId: this.id})
        this.categories.map(item => {
          item.active = false
          return item
        })
        this.categories.unshift({id: 0, name: '全部', active: true})
      }
      this.alreadyId = this.id
      this.visiblePopup = true
    },
    async onChange (event) {
      this.active = event.mp.detail.name
      const {index} = event.mp.detail
      if (index === 0) {
        this.id = ''
      } else {
        this.id = this.activityType[index].id
      }
      this._loadData()
    },
    async _loadData () {
      const result = await this.getActivityByfilter()
      this.activity = result.data
      this.total = result.total
    },
    tabItemChange (event) {
      this.tabs_item_active = event.target.name
      console.log(event)
      this._loadData()
    },
    async getActivityByfilter () {
      const result = await getActivitesByFilter(
        {
          id: this.id,
          tabs_item_active: this.tabs_item_active,
          categoryId: this.categoryId,
          page: this.page,
          size: this.size
        })
      return result
    },
    clickOverlay () {
      this.visiblePopup = false
    },
    bannerItemClick (item) {
      console.log(item)
      const url = `/pages/activityDetails/main?id=${item.key_word}`
      wx.navigateTo({url})
    },
    jumpSearch () {
      const url = `/pages/search/main`
      wx.navigateTo({url})
    },
    async filterItemClick (item, index) {
      this.categories.map(item => {
        item.active = false
      })
      item.active = true
      this.categoryId = item.id
      this.$set(this.categories, index, item)
      this.visiblePopup = false
      this._loadData()
    }
  },
  onPullDownRefresh () {
    console.log('下拉刷新')
  },
  async onReachBottom () {
    console.log('上拉加载')
    if (this.activity.length < this.total) {
      this.page++
      const result = this.getActivityByfilter()
      this.activity.push(...result.data)
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
    this.activityType.unshift({
      id: 0,
      name: '热门搜索',
      scope: 0
    })
    this.id = this.activityType[0].id
    this.active = this.activityType[0].name
    this._loadData()
    const result = await getBanner(1)
    this.bannerItems = result.items
    const tyResult = await getBanner(3)
    this.tYbannerItems = tyResult.items
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
.list{
    display:flex;
    align-items:center;
}
.list>.tabs{
    flex:1;
}
.list .icon{
    display:flex;
    align-items:center;
    width:10%;
    justify-content:left;
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
.activity-category{
  padding:5rpx 10rpx;
}
.activity-category span{
    color:#737a7c;
    border:1rpx solid #737a7c;
    width:160rpx;
    height:60rpx;
    border-radius:30rpx;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:22rpx;  
}
.activity-category span.active{
    color:#fff;
    background: linear-gradient(#89c99a,#00b1e2);
    border:1rpx solid transparent;
}
</style>
