<!--
 * @Author: your name
 * @Date: 2019-12-31 17:00:14
 * @LastEditTime : 2019-12-31 18:23:47
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\auth\index.vue
 -->
<!--  -->
<template>
  <div class="pages">
      <van-image width="219rpx" height="305rpx" src="/static/images/logB.png" />
      
      <van-button type="primary" open-type="getUserInfo" color="linear-gradient(to right,#89c99a,#00b1e2)">获取用户信息</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},
  mounted () {},

  methods: {}
}
</script>
<style lang='scss' scoped>
.pages{
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
}
</style>