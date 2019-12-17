<!--  -->
<template>
  <div class="list">
        <van-tabs @change="tabItemChange($event)">
          <van-tab title="按热度">
                <div class="banner">
                      <img src="/static/images/banner.png" alt="">
                </div>
          </van-tab>
          <van-tab title="按时间">内容 2</van-tab>
          <van-tab title="按距离">内容 3</van-tab>
          <van-tab title="按积分">内容 4</van-tab>
        </van-tabs>
  </div>
</template>

<script>
// import vantTab from '@/../static/vant/tab/index'
// import vantTabs from '@/../static/vant/tabs/index'
export default {
  components: {
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {},

  mounted () {},

  methods: {
    tabItemChange (event) {
      console.log('vants-tab改变')
    }
  }
}
</script>
<style scoped>
.list >>> .van-tab{
    color:#666;
}
.list >>> .van-tabs__line{
    background:#97cc92;
}
</style>