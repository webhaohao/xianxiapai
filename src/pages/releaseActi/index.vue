<!--
 * @Author: your name
 * @Date: 2019-12-20 17:26:00
 * @LastEditTime : 2019-12-20 19:40:53
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\releaseActi\index.vue
 -->
<!--  -->
<template>
  <div>
      <div class="upload-banner">
            <img src="/static/images/camera.png" class="camera-icon"> 
      </div>
      <div class="form-container">
          <van-cell-group>
            <van-field
              value=""
              required
              clearable
              label="用户名"
              :border="false"
              placeholder="请输入用户名"
            />
          </van-cell-group>
      </div>
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
.upload-banner{
      height:372rpx;
      width:100%;
      background: linear-gradient(#89c99a,#00b1e2);
      display:flex;
      justify-content: center;
      align-items:center;
      .camera-icon{
            width:133rpx;
            height:102rpx;
      }

}
</style>