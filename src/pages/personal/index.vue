<!--
 * @Author: your name
 * @Date: 2019-12-18 15:06:28
 * @LastEditTime : 2019-12-18 19:11:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\personal\index.vue
 -->
<template>
  <div class="personal">
      <div class="main">
            <div class="user-info">
                  <div class="user-thumb">
                        <img src="/static/images/user_default.png">
                  </div>
                  <div class="user-detail">
                        <span class="name">Ninja</span>
                        <span class="level">青铜派</span>  
                  </div>
            </div>
            <div class="intergral-group">
                  <div class="row">
                        <div class="item">
                              <div class="left-con con">
                                    <img src="/static/images/intergral.png" class="icon">
                                    <span>积分</span>
                              </div>
                              <div class="right-con con">
                                    <span>100派币</span>
                                    <img src="/static/images/arrow.png" class="icon">      
                              </div>
                        </div>
                  </div>
            </div>
            <div class="items">
                     <div class="row" v-for ="(item,index) in items" :key="index">
                        <div class="item">
                              <div class="left-con con">
                                    <img :src="item.icon" class="icon">
                                    <span>{{item.label}}</span>
                              </div>
                              <div class="right-con con">
                                    <img src="/static/images/arrow.png" class="icon">      
                              </div>
                        </div>   
                  </div>   
            </div>
             <div class="about-group">
                  <div class="row">
                        <div class="item">
                              <div class="left-con con">
                                    <img src="/static/images/about.png" class="icon">
                                    <span>关于</span>
                              </div>
                              <div class="right-con con">
                                    <img src="/static/images/arrow.png" class="icon">      
                              </div>
                        </div>
                  </div>
            </div>
      </div>
     <tab-bar></tab-bar>
  </div>
</template>

<script>
import tabBar from '@/components/tabBar'
export default {
  components: {
    tabBar
  },
  data () {
    return {
      items: [
        {
          label: '活动',
          icon: '/static/images/huodong.png'
        },
        {
          label: '兑换',
          icon: '/static/images/duihuan.png'
        },
        {
          label: '派计划',
          icon: '/static/images/paijihua.png'
        }
      ]
    }
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
.user-info{
    height:316rpx;
    padding:0rpx 90rpx;
    display:flex;
    align-items:center;
    background: linear-gradient(#edf6eb, #e7f4f1);
    //background: radial-gradient(red, green, blue);
    .user-thumb{
          img{
              width:170rpx;
              height:170rpx;
          }
    }
    .user-detail{
          display:flex;
          flex-direction:column;
          margin-left:30rpx;
          .name{
                font-size:30rpx;
                color:#737a7c;
                margin-bottom:11rpx;
          }
          .level{
                padding:9rpx 22rpx;
                background:#90cb93;
                border-radius:25rpx;
                color:#fff;
          }
    }
}
.intergral-group,.about-group{
       margin:28rpx 0rpx;     
}
.row>.item{
      display:flex;
      justify-content:space-between;
      align-items:center;
      width:100%;
      padding:30rpx 0rpx;
      border-bottom:1rpx solid #fff;
}
.row{
      background: linear-gradient(#e6f4f3, #e4f3f4);
      display:flex; 
      justify-content:space-between;
      padding:0rpx 26rpx;
      align-items:center;
      span{
      color:#808789;
      }
      .con{
      display:flex;
      align-items:center;
      }
      .left-con{
            .icon{
                  width:27rpx;
                  height:27rpx;
                  margin-right:17rpx;
            }
      }
      .right-con{
            .icon{
                  width:16rpx;
                  height:27rpx;
                  margin-left:13rpx;
            }
      }
}
</style>
