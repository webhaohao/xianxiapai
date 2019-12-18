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
                        <span>Ninja</span>
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
    .user-thumb{
          img{
              width:170rpx;
              height:170rpx;
          }
    }
}
</style>
