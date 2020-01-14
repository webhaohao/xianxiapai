<!--
 * @Author: your name
 * @Date: 2020-01-13 09:43:34
 * @LastEditTime : 2020-01-14 09:27:55
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\about\index.vue
 -->
<!--  -->
<template>
  <div class="about">
    <wxParse :content="description" :imageProp="{mode:'widthFix'}" :loading="loading"/>
  </div>
</template>

<script>
import { getAbout } from '@/api/serverApi'
import wxParse from 'mpvue-wxparse'
export default {
  data () {
    return {
      description: '',
      loading: true
    }
  },

  components: {wxParse},

  computed: {},
  onLoad () {
    (async () => {
      const result = await getAbout()
      this.description = result.description
      this.loading = false
    })()
  },
  mounted () {

  },

  methods: {}
}
</script>
<style lang='scss' scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.about{
    padding:5rpx 15rpx;
}
</style>