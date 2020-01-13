<!--
 * @Author: your name
 * @Date: 2020-01-10 12:34:30
 * @LastEditTime : 2020-01-13 15:04:30
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\newsDetail\index.vue
 -->
<!--  -->
<template>
  <div class="page">
        <div class="detail-banner">
              <van-image
                width="750rpx"
                height="416rpx"
                fit="cover"
                :src="detail.main_img_url"
              />
        </div>
        <div class="detail">
            <div class="title">{{detail.title}}</div>
            <div class="content">
                  <wxParse :content="detail.detail" :loading="loading"/>
            </div>
        </div> 
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
import {getNewsDetailById} from '@/api/serverApi'
export default {
  data () {
    return {
      detail: {},
      loading: true
    }
  },
  components: {wxParse},

  computed: {},

  mounted () {
    const {id} = this.$root.$mp.query
    this.getNewDetailById(id)
  },
  methods: {
    async getNewDetailById (id) {
      this.detail = await getNewsDetailById(id)
      this.loading = false
    }
  }
}
</script>
<style lang='scss' scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.title{
    font-size:32rpx;
}
.detail{
    padding:45rpx 15rpx;
}
</style>