<!--
 * @Author: your name
 * @Date: 2019-12-31 17:00:14
 * @LastEditTime : 2020-01-01 19:31:10
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\auth\index.vue
 -->
<!--  -->
<template>
  <div class="pages">
      <div class="img-wrapper">
         <van-image width="219rpx" height="305rpx" src="/static/images/logB.png" />
      </div>    
      <van-button type="primary" open-type="getUserInfo" color="linear-gradient(to right,#89c99a,#00b1e2)" @getuserinfo="bindGetUserInfo">获取用户信息</van-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},
  mounted () {},

  methods: {
    bindGetUserInfo (e) {
      console.log(e)
      this._wxGetuserInfo()
    },
    ...mapActions(['_wxGetuserInfo'])
  }
}
</script>
<style lang='scss' scoped>
.pages{
    height:100%;
    width:100%;
    background:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    position: fixed;
    top:0;
    left:0;
    z-index:50;
    .img-wrapper{
        margin-bottom:100rpx;
    }
}
</style>