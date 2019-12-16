<template>
  <div :class="[{'iphoneX-height':isIphoneX},'tabbar_box']"  :style="{'background-color':tabbar.backgroundColor}">
    <block v-for="(item,index) in tabbar.list" :key="index">
      <navigator v-if="item.isSpecial" class="tabbar_nav" hover-class="none" :url="item.pagePath" :style="{'color':tabbar.selectedColor}" open-type="navigate">
        <view class='special-wrapper'><image class="tabbar_icon" :src="item.iconPath"></image></view>
        <image class='special-text-wrapper'></image>
        <text>{{item.text}}</text>
      </navigator>
      <navigator v-else class="tabbar_nav" hover-class="none" :url="item.pagePath" :style="{'color':item.selected ? tabbar.selectedColor : tabbar.color}" open-type="switchTab">
        <image class="tabbar_icon" :src="item.selected ? item.selectedIconPath : item.iconPath"></image>
        <text>{{item.text}}</text>
      </navigator>
    </block>
  </div>
</template>
<script>
export default {
  props: {
    tabbar: {
      type: Object,
      default: {
        'backgroundColor': '#ffffff',
        'color': '#979795',
        'selectedColor': '#1c1c1b',
        'list': [
          {
            'pagePath': '/pages/index/main',
            'iconPath': '/static/icon/active.png',
            'selectedIconPath': '/static/icon/active_1.png',
            'text': '活动'
          },
          {
            'pagePath': '/pages/index/main',
            'iconPath': '/static/icon/new.png',
            'selectedIconPath': '/static/icon/new_1.png',
            'text': '新鲜'
          },
          {
            'pagePath': '/pages/middle/middle',
            'iconPath': '/static/icon/icon_release.png',
            'isSpecial': true,
            'text': '发布'
          },
          {
            'pagePath': '/pages/mine/mine',
            'iconPath': '/static/icon/money.png',
            'selectedIconPath': '/static/icon/money_1.png',
            'text': '兑换'
          },
          {
            'pagePath': '/pages/mine/mine',
            'iconPath': '/static/icon/heart.png',
            'selectedIconPath': '/static/icon/heart_1.png',
            'text': '我的'
          }
        ]
      }
    }
  },
  data () {
    return {
      isIphoneX: false
    }
  }
}
</script>

<style>
.tabbar_box{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 108rpx;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
}
.tabbar_box.iphoneX-height{
    padding-bottom: 66rpx;
}
.middle-wrapper{
  position: absolute;
  right: 310rpx;
  bottom: 0;
  background-color: #fff;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border-top: 2rpx solid #f2f2f3;
}
.middle-wrapper.iphoneX-height{
  bottom: 66rpx;
}
.tabbar_nav{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20rpx;
    height: 100%;
    position: relative;
}
.tabbar_icon{
    width:43rpx;
    height:29rpx;
}
.special-wrapper{
  position: absolute;
  left: 30rpx;
  top: -36rpx;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  border-top: 2rpx solid #f2f2f3;
  background-color: #fff;
  text-align: center;
  box-sizing: border-box;
  padding: 6rpx;
}
.special-wrapper .tabbar_icon{
    width: 84rpx;
    height: 84rpx;
}
.special-text-wrapper{
  width: 56rpx;
  height: 56rpx;
}
</style>
