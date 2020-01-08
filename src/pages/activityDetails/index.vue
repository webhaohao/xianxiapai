<!--
 * @Author: your name
 * @Date: 2019-12-26 10:26:00
 * @LastEditTime : 2020-01-08 15:26:02
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
                fit="cover"
                :src="activityItem.main_img_url"
              />
        </div>
        <div class="main">
            <div class="activ-intr">
                  <div class="flex-row">
                        <div class="title">{{activityItem.title}}</div>
                        <div class="type">{{categroyInfo.name}}</div> 
                  </div> 
                  <div class="flex-row activ-msg">
                        <div class="left-con">
                          <!--时间-->
                          <div class="time">
                              <div class="icon iconfont icon-shijian">
                              </div>
                              <div class="start-time-and-end-time">
                                    <span>{{activityItem.start_time}}起</span>
                                    <span>{{activityItem.end_time}}止</span>
                              </div>
                          </div>
                          <!--地点-->
                          <div class="location">
                                <div class="icon iconfont icon-dingwei"></div>
                                <div class="addr">
                                    <span>{{activityItem.location}}</span>
                                </div> 
                          </div>
                        </div>
                        <div class="right-con">
                            <!--积分-->  
                            <div class="integral">
                                <div class="icon iconfont icon-jifen"></div> 
                                <div class="integral-value">
                                    <span>{{activityItem.integral}}</span>
                                </div> 
                            </div>
                        </div>
                  </div>
                  
            </div> 
            <div class="activity-status">
                  <div class="activity-process">
                        <div class="icon iconfont icon-yonghu"></div>
                        <div class="proccess-bar">
                                <div class="proccess-bar-current" :style="{width:percentage}"></div>
                                <div class="number">{{joinPoeple}}/{{activityItem.number}}</div>
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
                                  :current="swiperCurrentIndex"
                                  :display-multiple-items="swiperItem"
                                >
                                <block v-for="(item,index) in users" :key="index">
                                  <swiper-item>
                                        <img              
                                            class='slide-image' 
                                            mode='aspectFit' 
                                            :src="item.avatar" 
                                        />
                                  </swiper-item>   
                                </block>  
                                  <swiper-item  v-for="(item,i) in holder" :key="i">
                                      <!-- <img class='slide-image' 
                                          src="/static/images/user-photo.png" 
                                          :data-index="index"
                                      /> -->
                                  </swiper-item>
                            </swiper>  
                        </div> 
                        <van-icon name="arrow" color="#eff0f2" @click="arrowClick"/>
                  </div>
            </div>  
            <van-divider />
            <div class="activity-detail">
                    <div class="title"><span class="icon iconfont icon-tishi"></span>活动详情</div>
                    <div class="detail-c">
                            {{activityItem.detail}}
                    </div>
                    <div class="detail-imgs">
                            <div class="img"  v-for="(item,index) in activityItem.items" :key="index">
                                <van-image
                                    width="224rpx"
                                    height="203rpx"
                                    fit="contain"
                                    :src="item.img.url"
                                />
                            </div>
                    </div>
            </div>   
        </div>
        <van-submit-bar
            :button-text="buttonText"
            @submit="onSubmit"
            button-class="sign-up-btn"
            :loading="isLoading"
            :disabled="disabled"
        >
          <div class="is-agree">
              <van-checkbox :value="isAgree" @change="checkboxChange" checked-color="#90cb93">
                  请勾选线下派用户协议
              </van-checkbox>
          </div>
        </van-submit-bar>
        <van-toast id="van-toast" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Toast from '@/../static/vant/toast/toast'
import { getCategoryByAccId, getActivityDetailById, checkUserIsJoinActivity, joinActivity } from '@/api/serverApi'
export default {
  data () {
    return {
      activityItem: {},
      swiperCurrentIndex: 0,
      isLoading: false,
      isAgree: false,
      categroyInfo: {},
      releaserInfo: {},
      buttonText: '报名',
      disabled: false,
      swiperItem: 3,
      users: []
    }
  },

  components: {},

  computed: {
    ...mapState(['activityItem']),
    percentage () {
      return `${this.users.length / this.activityItem.number * 100}%`
    },
    joinPoeple () {
      return this.users.length
    },
    holder () {
      const count = this.swiperItem - (this.users.length % this.swiperItem)
      console.log([...String(count).repeat(count)])
      return [...String(count).repeat(count)]
    }
  },

  mounted () {
    console.log('root', this.$root)
    const {id} = this.$root.$mp.query
    this.init(id)
  },

  methods: {
    arrowClick () {
      // this.swiperCurrentIndex++
    },
    init (id) {
      (async () => {
        this.activityItem = await getActivityDetailById(id)
        this.categroyInfo = await getCategoryByAccId({
          categoryId: this.activityItem.category_id
        })
        this.users = this.activityItem.users
        console.log('users', this.users)
        const {isExist} = await checkUserIsJoinActivity(id)
        if (isExist) {
          this.buttonText = '已报名'
          this.disabled = true
        } else {
          this.buttonText = '报名'
          this.disabled = false
        }
      })()
    },
    async onSubmit () {
      this.isLoading = true
      const result = await joinActivity({activityId: this.activityItem.id})
      if (result.code === 201) {
        console.log('报名成功')
        Toast.success('报名成功')
        const {id} = this.$root.$mp.query
        // this.activityItem = null
        this.init(id)
      }
      this.isLoading = false
      console.log(result)
    },
    checkboxChange (event) {
      this.isAgree = !this.isAgree
    }
  }
}
</script>
<style lang='scss' scoped>
.page{
    padding-bottom:100rpx;
}
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
     .detail-c{
         color:#737a7c;
         font-size:24rpx;
         margin:40rpx 0rpx;
     }
     .detail-imgs{
          display:flex;
          flex-wrap:wrap;
          &>.img{
               margin-right:10rpx;
          }
          &>.img:nth-child(3n){
              margin-right:0rpx;
          }
     }
}
</style>