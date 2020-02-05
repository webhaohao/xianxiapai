<!--
 * @Author: your name
 * @Date: 2019-12-19 14:13:18
 * @LastEditTime : 2020-01-31 17:52:19
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\news\index.vue
 -->
<!--  -->
<template>
  <div class="news">
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
        <div class="keywords-content">
              <div class="icon">
                    <img src="/static/images/_paijihua.png">
              </div>
              <div class="items">
                    <div :class="[{'active':item.active},'item']" v-for="(item,index) in items" :key="index" @click="itemClick(item)">
                          {{item.name}}
                    </div>
                    <div class="item holder" v-for="(i,index) in holder" :key="index">
                    </div>
              </div>
        </div>
        <div class="list">
              <div class="group" v-for="(item,index) in list" :key="index" @click="newsItemClick(item,index)">
                    <div class="news-thumb">
                          <img :src="item.main_img_url">
                    </div>
                    <div class="news-detail">
                         <div class="title">
                            {{item.title}}
                         </div>
                         <div class="desc">
                              {{item.abstract}}
                         </div>
                    </div>
              </div>
        </div>
       <tab-bar :tabbar="tabbar"></tab-bar> 
  </div>
</template>

<script>
import tabBar from '@/components/tabBar'
import { getNewsCategories, getNewsDetailByCategoryId, getBanner } from '@/api/serverApi'
export default {
  data () {
    return {
      items: [
        {
          name: '全部',
          active: true
        },
        {
          name: '体育',
          active: false
        },
        {
          name: '法律',
          active: false
        },
        {
          name: '电玩',
          active: false
        },
        {
          name: '学术',
          active: false
        },
        {
          name: '设计',
          active: false
        },
        {
          name: '艺术',
          active: false
        }
      ],
      list: [],
      bannerItems: []
    }
  },

  components: {tabBar},

  computed: {
    holder () {
      return 4 - (this.items.length % 4)
    }
  },

  mounted () {
    (async () => {
      const categories = await getNewsCategories()
      categories.map(item => {
        item.active = false
        return item
      })
      const result = await getBanner(2)
      this.bannerItems = result.items
      this.items = categories
      this.items.unshift({name: '全部', active: true, id: ''})
      this.getNewsDetail('')
    })()
  },

  methods: {
    async itemClick (item) {
      this.items.map(item => { item.active = false })
      item.active = true
      this.getNewsDetail(item.id)
    },
    bannerItemClick (item) {
      // console.log(item)
      const url = `/pages/newsDetail/main?id=${item.key_word}`
      wx.navigateTo({url})
    },
    async getNewsDetail (id) {
      this.list = await getNewsDetailByCategoryId({id})
    },
    newsItemClick (item, index) {
      // const { item } = event.currentTarget.dataset
      // console.log(item)
      const url = `/pages/newsDetail/main?id=${item.id}`
      wx.navigateTo({url})
    }
  }
}
</script>
<style lang='scss' scoped>
.banner img{
    width:750rpx;
    height:416rpx;
}
.keywords-content{
    background:#f7f8fa;
    display:flex;
    align-items:center;
    padding:30rpx 15rpx;  
    .icon{
        width:126rpx;
        height:158rpx;
        display:flex;
        justify-content:center;
        align-items:center;
        margin-right:30rpx;
        img{
         width:74rpx;
         height:136rpx;
        }
    } 
    .items{
        flex-grow:1;
        display:flex;
        flex-wrap:wrap;
        align-content: flex-center;
        width:calc(100% - 170rpx);
        align-items: center;
        justify-content:space-around;
        .item{
             display:flex;
             justify-content:center;
             align-items:center;
             width:120rpx;
             height:68rpx;
             border-radius:20rpx;
             background:#fff;
             color:#737a7c;
             font-size:24rpx;
             margin-top:24rpx;
        }
        .item.active{
          color:#fff;
          background: linear-gradient(#89c99a,#00b1e2);
        } 
        .item:nth-child(-n+4){
            margin-top:0rpx;
        }
        .holder{
            opacity:0;
        }
    }
}
.list{
    padding-bottom:108rpx;
    .group{
        display:flex;
        align-items:center;
        padding:28rpx 0rpx;
        margin:0rpx 16rpx;
        border-bottom:1rpx solid #f7f8fa;
        .news-thumb{
          img{
              width:313rpx;
              height:202rpx;
          }
        }
        .news-detail{
            padding-left:24rpx;
            .title{
                font-size:26rpx;
                color:#737a7c;
                margin-bottom:20rpx;
            }
            .desc{
                line-height:2;
                color:#737a7c;
                font-size:20rpx;
            }
        }
        
    }
}
</style>