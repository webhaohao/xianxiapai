<!--
 * @Author: your name
 * @Date: 2019-12-03 18:35:21
 * @LastEditTime: 2019-12-17 19:22:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit  
 * @FilePath: \xianxiapai\src\components\card.vue
 -->
<template>
  <div>
      <div class="cards">
            <div class="card">
                  <div class="card-thumb">
                        <img src="/static/images/card_1.jpg" alt="">
                  </div>
                  <div class="card-info">
                        <div class="card-info-left">
                              <span class="title">谁才是王者荣耀中真的的王者</span>
                              <span class="title-s">中国政法大学昌平校区王者荣耀校内火热开启！</span>
                        </div> 
                        <div class="card-info-right">
                              <div class="time">
                                    <img src="/static/images/time.png" alt="">
                              </div>
                        </div> 
                  </div>
            </div>
            <div class="card">
                  <div class="card-thumb">
                        <img src="/static/images/card_1.jpg" alt="">
                  </div>
                  <div class="card-info">
                        <div class="card-info-left">
                              <span class="title">谁才是王者荣耀中真的的王者</span>
                              <span class="title-s">中国政法大学昌平校区王者荣耀校内火热开启！</span>
                        </div> 
                        <div class="card-info-right"></div> 
                  </div>
            </div>
            <div class="card">
                  <div class="card-thumb">
                        <img src="/static/images/card_1.jpg" alt="">
                  </div>
                  <div class="card-info">
                        <div class="card-info-left">
                              <span class="title">谁才是王者荣耀中真的的王者</span>
                              <span class="title-s">中国政法大学昌平校区王者荣耀校内火热开启！</span>
                        </div> 
                        <div class="card-info-right"></div> 
                  </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style scoped>
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
.card .card-info{
  padding:30rpx 36rpx;
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
</style>
