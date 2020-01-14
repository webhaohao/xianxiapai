<!--
 * @Author: your name
 * @Date: 2020-01-14 09:46:32
 * @LastEditTime : 2020-01-14 13:02:12
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\myActivity\index.vue
 -->
<!-- 我的活动 -->
<template>
  <div class="my-activity">
        <van-tabs @change="tabItemChange" :active="active" :border="false">
            <van-tab v-for="(item,index) in tabsItem" :key="index" :title="item.title">
                  <card :list="list"></card>
            </van-tab>
        </van-tabs>
  </div>     
</template>

<script>
import card from '@/components/card'
import {userReleasedActivity, userJoinActivity} from '@/api/serverApi'
export default {
  data () {
    return {
      active: 0,
      tabsItem: [
        {
          title: '我参与的',
          callBack: userJoinActivity
        },
        {
          title: '我发布的',
          callBack: userReleasedActivity
        }
      ],
      list: []
    }
  },

  components: {card},

  computed: {},

  async mounted () {
    const index = this.active
    this.tabsItem[index].callBack && (this.list = await this.tabsItem[index].callBack())
  },

  methods: {
    async tabItemChange (event) {
      console.log(event)
      const {index} = event.target
      this.tabsItem[index].callBack && (this.list = await this.tabsItem[index].callBack())
    }
  }
}
</script>
<style lang='scss' scoped>
.my-activity /deep/ .van-tab{
    color:#666;
}
.my-activity /deep/ .van-tabs__line{
    background:#97cc92;
}
</style>