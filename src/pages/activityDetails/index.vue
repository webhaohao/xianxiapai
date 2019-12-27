<!--
 * @Author: your name
 * @Date: 2019-12-26 10:26:00
 * @LastEditTime : 2019-12-27 19:41:09
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\activityDetails\index.vue
 -->
<!--  -->
<template>
  <div class="page">
        <div class="detail-banner">
              <van-image
                width="750rpx"
                height="416rpx"
                fit="contain"
                src="/static/images/detail.jpg"
              />
        </div>
        <div class="main">
            <div class="activ-intr">
                  <div class="flex-row">
                        <div class="title">午后时光1V1篮球赛</div>
                        <div class="type">体育</div> 
                  </div> 
                  <div class="flex-row activ-msg">
                        <div class="left-con">
                          <!--时间-->
                          <div class="time">
                              <div class="icon iconfont icon-shijian">
                              </div>
                              <div class="start-time-and-end-time">
                                    <span>2019—12—07 09:00起</span>
                                    <span>2019—12—07 09:00止</span>
                              </div>
                          </div>
                          <!--地点-->
                          <div class="location">
                                <div class="icon iconfont icon-dingwei"></div>
                                <div class="addr">
                                    <span>综合体育馆</span>
                                    <span>学生活动中心</span>
                                </div> 
                          </div>
                        </div>
                        <div class="right-con">
                            <!--积分-->  
                            <div class="integral">
                                <div class="icon iconfont icon-jifen"></div> 
                                <div class="integral-value">
                                    <span>233</span>
                                </div> 
                            </div>
                        </div>
                  </div>
                  
            </div> 
            <div class="activity-status">
                  <div class="activity-process">
                        <div class="icon iconfont icon-yonghu"></div>
                        <div class="proccess-bar">
                                <div class="proccess-bar-current" style="width:50%"></div>
                                <div class="number">20/100</div>
                        </div>
                  </div>
                  <div class="join-user-list">
                        <div class='swiper'>
                            <swiper
                                  class="swiper-contaner"
                                  :indicator-dots="false"
                                  :autoplay="false"
                                  :duration='1000'
                                  :circular="true"
                                  :display-multiple-items="3"
                                  :current="swiperCurrentIndex"
                                >
                                <swiper-item>
                                      <img              
                                          class='slide-image' 
                                          mode='aspectFit' 
                                          src="/static/images/user-photo.png" 
                                      />
                                </swiper-item>
                                <swiper-item>
                                      <img              
                                          class='slide-image' 
                                          mode='aspectFit' 
                                          src="/static/images/user-photo.png" 
                                      />
                                </swiper-item>
                                <swiper-item>
                                      <img              
                                          class='slide-image' 
                                          mode='aspectFit' 
                                          src="/static/images/user-photo.png" 
                                      />
                                </swiper-item>
                            </swiper>  
                        </div> 
                        <van-icon name="arrow" color="#eff0f2" @click="arrowClick"/>
                  </div>
            </div>  
            <van-divider />
            <div class="activity-detail">
                    <div class="title"><span class="icon iconfont icon-tishi"></span>活动详情</div>
                    <div class="detail-c"></div>
            </div>   
        </div>
        <van-submit-bar
            button-text="报名"
            @submit="onSubmit"
            button-class="sign-up-btn"
            :loading="isLoading"
        >
          <div class="is-agree">
              <van-checkbox :value="isAgree" @change="checkboxChange" checked-color="#90cb93">
                  请勾选线下派用户协议
              </van-checkbox>
          </div>
        </van-submit-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperCurrentIndex: 0,
      isLoading: false,
      isAgree: false
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    arrowClick () {
      // this.swiperCurrentIndex++
    },
    onSubmit () {
      this.isLoading = true
    },
    checkboxChange (event) {
      this.isAgree = !this.isAgree
    }
  }
}
</script>
<style lang='scss' scoped>
.icon{
      font-size:40rpx;  
      background-image:linear-gradient(#89c99a,#00b1e2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; 
      margin-right:7rpx;
}
.main {
     padding:0rpx 16rpx;
}
.activ-intr,.activity-status{
    padding:32rpx 0rpx;
    .activ-msg{
        padding:36rpx 0rpx 0rpx;
    }
    .flex-row{
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
    .time,.location,.left-con,.integral{
        display:flex;
        align-items:center;
    }
    .time{
        margin-right:54rpx;
    }
    .title{
        font-size:26rpx;
        color:#737a7c;
    }
    .type{
         width:132rpx;
         height:48rpx;
         display:flex;
         justify-content:center;
         align-items:center;
         background-color:#90cb93;
         border-radius:20rpx;
         color:#fff;
         font-size:23rpx;
    }
    .integral-value{
         color:#737a7c;
         font-size:20rpx;
    }
    .start-time-and-end-time,.addr{
         display: flex;
         flex-direction:column;
         &>span{
             color:#737a7c;
             font-size:20rpx;
         }
         &>span:first-child{
              margin-bottom:10rpx;
         }
    }
    .activity-process{
         display:flex;
         align-items:center;
        .proccess-bar{
            width:304rpx;
            height:36rpx;
            border-radius:20rpx;
            background: #eff0f2;
            overflow:hidden;
            position: relative;
            .proccess-bar-current{
                 position:absolute;
                 top:0;
                 left:0;
                 height:100%;
                 border-radius:20rpx;
                 background-image:linear-gradient(to right,#89c99a,#00b1e2);
            }
            .number{
                  position: absolute;
                  right:22rpx;
                  height:100%;
                  line-height:36rpx;
                  font-size:20rpx;
                  color:#737a7c;
            }
        }
    }
    
}
.activity-status{
    padding:0rpx;
    display:flex;
    justify-content: space-between;
}
.page /deep/ .sign-up-btn{
      background:linear-gradient(to right,#89c99a,#00b1e2);
      border:none;
}
.is-agree{
    padding-right:30rpx;
}
.join-user-list {
       display:flex;
      .swiper-contaner{
          width:144rpx;
          height:48rpx;
          margin-right:20rpx;
      }
      .slide-image{
             width:48rpx;
             height:48rpx;
             border-radius:50%;
             overflow: hidden;
      }
}
.activity-detail{
     .title{
           font-size:26rpx;
           color:#737a7c;
           display:flex;
           align-items:center;
           &>span{
              margin-right:13rpx;
           }
     }
}
</style>