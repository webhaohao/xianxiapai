<!--
 * @Author: your name
 * @Date: 2019-12-20 10:22:53
 * @LastEditTime : 2020-01-14 15:23:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\exChange\index.vue
 -->
<!--  -->
<template>
  <div class="ex-change">
      <div v-if="isOpen">
            <div class="menus">
                  <div class="item" v-for="(item,index) in items" :key="index" @click="itemClick(item)">
                        <div class="item-c">
                        <div :class="[{'active':item.active},'icon']">
                              <i :class="['i-icon','iconfont',item.icon]"></i>
                        </div>
                        </div>
                        <div class="name">
                              {{item.name}}
                        </div>
                  </div>
                  <div class="item holder" v-for="(i,index) in holder" :key="index">
                        <div class="item-c">
                        </div>
                        <div class="name">
                        </div>
                  </div>
            </div>
            <div class="ex-change-c">
                  <van-tabs @change="tabItemChange($event)" :active="active" :border="false">
                        <van-tab title="按热度">
                              <div class="cards-c">
                                    <div class="card">
                                          <div class="thumb">
                                                <img src="/static/images/card_1.jpg">
                                          </div>
                                          <div class="detail">
                                                <div class="label">奶茶券</div>
                                                <div class="info">
                                                      <img class="icon" src="/static/images/intergral.png">
                                                      <span class="value">255</span>
                                                </div>
                                          </div>
                                    </div>
                                    <div class="card">
                                          <div class="thumb">
                                                <img src="/static/images/card_1.jpg">
                                          </div>
                                          <div class="detail">
                                                <div class="label">奶茶券</div>
                                                <div class="info">
                                                      <img class="icon" src="/static/images/intergral.png">
                                                      <span class="value">255</span>
                                                </div>
                                          </div>
                                    </div>
                                    <div class="card">
                                          <div class="thumb">
                                                <img src="/static/images/card_1.jpg">
                                          </div>
                                          <div class="detail">
                                                <div class="label">奶茶券</div>
                                                <div class="info">
                                                      <img class="icon" src="/static/images/intergral.png">
                                                      <span class="value">255</span>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </van-tab>
                        <van-tab title="按时间">内容 2</van-tab>
                  </van-tabs>
            </div>
      </div>  
      <div v-else style="display:flex;justify-content:center;align-items:center;height:100vh;color:#666;">
                  {{'暂不开放,敬请期待'}}
      </div>
     <tab-bar></tab-bar> 
  </div>
</template>

<script>
import tabBar from '@/components/tabBar'
export default {
  data () {
    return {
      items: [
        {
          name: '全部',
          icon: 'icon-quanbu',
          active: true
        },
        {
          name: '票务卡券',
          icon: 'icon-wodeqiaquan',
          active: false
        },
        {
          name: '图书教材',
          icon: 'icon-shujijiaocai',
          active: false
        },
        {
          name: '律师实习',
          icon: 'icon-shixi',
          active: false
        },
        {
          name: '生活用品',
          icon: 'icon-shenghuoyongpin',
          active: false
        },
        {
          name: '纪念礼品',
          icon: 'icon-liwu',
          active: false
        }
      ],
      active: 0,
      isOpen: false
    }
  },

  components: { tabBar },

  computed: {
    holder () {
      return 4 - (this.items.length % 4)
    }
  },

  mounted () {},

  methods: {
    tabItemChange (event) {

    },
    itemClick (item) {
      this.items.map(item => { item.active = false })
      item.active = true
    }
  }
}
</script>
<style lang='scss' scoped>
.menus{
       padding:32rpx 16rpx;
       display:flex;
       flex-wrap:wrap;
       justify-content:space-around;
       background:#f7f8fa;
      .item{
           
            margin-top:30rpx;
            .item-c{
               border-radius:50%;
                width:154rpx;
                height:154rpx;
                background: linear-gradient(#89c99a,#00b1e2);
                padding:4rpx;
                .icon{
                      width:100%;
                      height:100%;
                      background:#fff;
                      border-radius:50%;
                      display:flex;
                      justify-content:center;
                      align-items:center;
                      &>i.i-icon{
                         font-size:80rpx;  
                         background-image:linear-gradient(#89c99a,#00b1e2);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent; 
                      }
                }
                .icon.active{
                     background:linear-gradient(#89c99a,#00b1e2); 
                      &>i.i-icon{
                        font-size:80rpx;  
                        background-image:none;
                        background-color:#fff;
                      }
                }
            }
            .name{
                color:#737a7c;
                font-size:20rpx;
                text-align:center;
                margin-top:11rpx;
            }
      }
      .item:nth-child(-n+4){
          margin-top:0rpx;
      }
      .holder.item{
          opacity:0;
      }
}
.ex-change-c{
      /deep/ .van-tabs__line{
          background:#97cc92;
      }
}
.cards-c{
      padding:0rpx 18rpx;
      display:flex;
      justify-content:space-between;
      flex-wrap:wrap;
      .card{
          margin-top:21rpx;
          border-radius:30rpx;
          overflow: hidden;
          width:342rpx;
          background:#eff0f2;
          .thumb{
                img{
                    width:100%;
                    height:381rpx;
                }
          }
          .detail{
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding:24rpx 22rpx;
                .icon{
                    width:24rpx;
                    height:24rpx;
                }
                .label,.value{
                    font-size:26rpx;
                    color:#a3a7ac;
                }
                .value{
                    margin-left:7rpx;
                }
          }
      }
}
</style>