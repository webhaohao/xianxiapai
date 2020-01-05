<!--
 * @Author: your name
 * @Date: 2019-12-03 18:35:21
 * @LastEditTime : 2019-12-26 10:49:31
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit  
 * @FilePath: \xianxiapai\src\components\card.vue
 -->
<template>
  <div>
      <div class="cards">
            <div class="card" @click = "itemClick" :data-item="item" v-for="(item,index) in list" :key="index">
                  <div class="card-thumb">
                        <img :src="item.main_img_url" alt="">
                  </div>
                  <div class="card-info">
                        <div class="card-info-left">
                              <span class="title">{{item.title}}</span>
                              <!-- <span class="title-s">中国政法大学昌平校区王者荣耀校内火热开启！</span> -->
                        </div> 
                        <div class="card-info-right">
                              <div class="row">
                                    <div class="time">
                                          <img src="/static/images/time.png" alt="">
                                          <span>{{item.start_time}}</span>
                                    </div>
                              </div>   
                              <div class="row">
                                    <div class="users">
                                          <img src="/static/images/user.png" alt="">
                                          <span>{{item.number}}</span>
                                    </div>
                                    <div class="integral">
                                          <img src="/static/images/yuan.png">
                                          <span>{{item.integral}}</span>
                                    </div>
                              </div>   
                              
                        </div> 
                  </div>
            </div>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          {
            main_img_url: '/static/images/card_1.jpg',
            title: '谁才是王者荣耀中真的的王者',
            start_time: '2019-12-03',
            end_time: '2019-12-03',
            number: '12'
          }
        ]
      }
    }

  },
  methods: {
    itemClick (event) {
      console.log('itemClick')
      console.log(event)
      const { item } = event.currentTarget.dataset
      console.log(item)
      this.getActivityItem(item)
      const url = `/pages/activityDetails/main`
      wx.navigateTo({url})
    },
    ...mapMutations({
      getActivityItem: 'getActivityItem'
    })
  }
}
</script>

<style scoped lang="scss">
.cards{
    padding:0rpx 16rpx;
}
.card{
    overflow:hidden;
    border-radius:20px;
    background:#eff0f2;
    margin:18rpx 0rpx;
}
.card-thumb{
      width:100%;
      height:340rpx;
    
}
.card-thumb img{
     width:100%;
     height:100%;
}  
.card .card-info .title{
    font-size:30rpx;
}
.card .card-info .title-s{
    font-size:24rpx;
}
.card .card-info .card-info-left{
    display:flex;
    flex-direction:column;
}
.card .card-info .card-info-left span{
    color:#737a7c;
}
.card .card-info .card-info-left span:first-child{
    margin-bottom:20rpx;
}
.card {
      .card-info{
            display:flex;
            padding:30rpx 36rpx;
            justify-content:space-between;
            .card-info-right{
                  padding:10rpx 0rpx;
                  display:flex;
                  flex-direction:column;
                  justify-content:space-between;
                  .row{
                      display:flex;
                      justify-content:space-between;
                      align-items: center;
                      span{
                          margin-left:4rpx;
                      }
                  }
                  .time 
                  {
                        display:flex;
                        align-items:center;
                        img{
                              width:26rpx;
                              height:26rpx; 
                        }
                        span{
                              font-size:20rpx;
                              color:#a3a7ac;
                        }
                  }
                  .users {
                         display:flex;
                        align-items:center;
                        img{
                              width:18rpx;
                              height:22rpx;
                        }
                         span{
                              font-size:20rpx;
                              color:#a3a7ac;
                        }
                  }
                
                  .integral {
                        display:flex;
                        align-items:center;
                        img{
                              width:24rpx;
                              height:24rpx; 
                        }
                        span{
                              font-size:20rpx;
                              color:#a3a7ac;
                        }
                  } 
            }
      }
}
</style>
