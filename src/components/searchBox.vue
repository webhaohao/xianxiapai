<!--
 * @Author: your name
 * @Date: 2019-12-16 12:30:45
 * @LastEditTime: 2019-12-17 09:14:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\components\searchBox.vue
 -->
<template>
  <div>
    <div class="search-box">
          <div class="search-input">
              <input/>
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
}
.search-input input{
    padding:0rpx 25rpx;
    height:100%;
}
.search-box .search-btn{
   color:#fff;
   font-size:30rpx;
}
</style>
