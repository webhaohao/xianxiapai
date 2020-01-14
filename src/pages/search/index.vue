<!--
 * @Author: your name
 * @Date: 2020-01-14 15:51:02
 * @LastEditTime : 2020-01-14 17:20:01
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\search\index.vue
 -->
<!--  -->
<template>
  <div>
    <van-search
      :value="value"
      placeholder="请输入搜索关键词"
      use-action-slot
      @search="onSearch"
      @change="onChange"
      :focus="true"
    >
      <view slot="action" @click="onClick">搜索</view>
    </van-search>
    <div class="cards">
          <card :list ="list"></card>
    </div>
  </div>
</template>

<script>
import { searchActivityByKeywords } from '@/api/serverApi'
import card from '@/components/card'
export default {
  data () {
    return {
      value: '',
      list: []
    }
  },

  components: {card},

  computed: {},

  mounted () {},

  methods: {
    async onClick () {
      console.log(this.value)
      this.list = await searchActivityByKeywords({value: this.value})
    },
    async onSearch () {
      console.log(this.value)
      this.list = await searchActivityByKeywords({value: this.value})
    },
    async onChange (event) {
      console.log(event)
      this.value = event.mp.detail
      // this.list = await searchActivityByKeywords({value: this.value})
    }

  }
}
</script>
<style lang='scss' scoped>
</style>