<!--
 * @Author: your name
 * @Date: 2019-12-16 12:30:45
 * @LastEditTime : 2020-01-14 16:35:18
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\components\searchBox.vue
 -->
<template>
  <div>
    <div class="search-box">
          <div class="search-input">
              <!-- <input/> -->
              <span>
                  <van-icon name="search" size="40rpx" color="#666"/>
              </span>
          </div>
          <div class="search-btn">
                搜索
          </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
.search-box {
  display: flex;
  padding:52rpx 7rpx 30rpx;
  align-items:center;
}
.search-input{
    width:610rpx;
    height:76rpx;
    background:#fff;
    border-radius:50rpx;
    margin-right:10rpx;
    display:flex;
    align-items:center;
}
.search-input input{
    padding:0rpx 25rpx;
    height:100%;
}
.search-input span{
    padding:0rpx 25rpx;
    height:100%;
    display:flex;
    align-items:center;
}
.search-box .search-btn{
   color:#fff;
   font-size:30rpx;
}
</style>
