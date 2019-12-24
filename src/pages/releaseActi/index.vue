<!--
 * @Author: your name
 * @Date: 2019-12-20 17:26:00
 * @LastEditTime : 2019-12-24 18:54:20
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
          <div :class="[{'isMarginBottom':item.isMarginBottom}]" v-for="(item,index) in formData" :key="index">
              <van-cell-group>
                <van-field
                  :value="item.fieldValue"
                  required
                  clearable
                  autosize
                  :readonly="item.fieldType === 'select' || item.fieldType === 'datetime'"
                  :type="item.fieldType"
                  :label="item.fieldName"
                  :icon="item.icon"
                  :border="false"
                  :data-index = "index"
                  :placeholder="item.placeholder"
                  @click="(item.fieldType === 'select' || item.fieldType === 'datetime') && itemClick(index,item)"
                  @input="input"
                />
              </van-cell-group>
          </div>
      </div>
      <div class="upload-container">
            <h5>活动照片</h5>
            <van-uploader :file-list="fileList" bind:after-read="afterRead" />
      </div>
      <div class="release-btn">
              <span>发布</span>
      </div>  
        <van-popup :show="timePop"  position="bottom" :overlay="true">
              <van-datetime-picker
                type="datetime"
                :value = "currentDate"
                @cancel="timePop = false"
                @confirm="dateTimeConfirm"
              />
        </van-popup>
        <van-popup :show="pickerPop" position="bottom" :overlay="true">
              <van-picker :title="popTitle" show-toolbar :columns="columns"  @cancel="pickerPop = false" @confirm="onConfirm" />
        </van-popup>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  data () {
    return {
      formData: [
        {
          fieldId: 'title',
          fieldName: '活动标题',
          fieldType: 'text',
          fieldValue: '',
          placeholder: '请输入活动标题',
          isMarginBottom: true,
          icon: ''
        },
        {
          fieldId: 'title',
          fieldName: '活动类型',
          fieldType: 'select',
          fieldValue: '',
          isMarginBottom: true,
          placeholder: '请选择活动类型',
          icon: 'arrow-down',
          options: ['活动一', '活动二', '活动三']
        },
        {
          fieldId: 'title',
          fieldName: '开始时间',
          fieldType: 'datetime',
          fieldValue: '',
          placeholder: '请选择开始时间',
          icon: 'arrow-down'
        },
        {
          fieldId: 'title',
          fieldName: '结束时间',
          fieldType: 'datetime',
          fieldValue: '',
          placeholder: '请选择结束时间',
          isMarginBottom: true,
          icon: 'arrow-down'
        },
        {
          fieldId: 'title',
          fieldName: '活动地点',
          fieldType: 'text',
          fieldValue: '',
          placeholder: '请输入活动地点',
          icon: ''
        },
        {
          fieldId: 'title',
          fieldName: '活动人数',
          fieldType: 'number',
          fieldValue: '',
          placeholder: '请输入活动人数',
          isMarginBottom: true,
          icon: ''
        },
        {
          fieldId: 'title',
          fieldName: '活动详情',
          fieldType: 'textarea',
          fieldValue: '',
          placeholder: '请输入活动详情',
          isMarginBottom: true,
          icon: ''
        }
      ],
      columns: [],
      pickerPop: false,
      timePop: false,
      fileList: [],
      currentDate: new Date().getTime()
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    itemClick (index, item) {
      console.log(item)
      this.currentIndex = index
      if (item.fieldType === 'datetime') {
        this.timePop = true
        console.log(this.timePop)
      } else if (item.fieldType === 'select') {
        this.pickerPop = true
        this.popTitle = item.placeholder
        this.columns = item.options
        console.log('columns', this.columns)
      }
    },
    afterRead (event) {

    },
    input (event) {
      console.log('event', event)
      const index = event.mp.currentTarget.dataset.index
      this.formData[index].fieldValue = event.mp.detail
      // this.formData[0].fieldValue = event.mp.detail
    },
    onConfirm (value) {
      console.log('confirm', value)
      this.formData[this.currentIndex].fieldValue = value.mp.detail.value
      this.timePop = false
      this.pickerPop = false
    },
    dateTimeConfirm (value) {
      console.log('datetime', value)
      this.formData[this.currentIndex].fieldValue = parseTime(value.mp.detail, '{y}-{m}-{d} {h}:{i}')
      this.timePop = false
      this.pickerPop = false
    }
  }
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
.form-container{
     /deep/ .van-field__input{
      text-align:right;
    }
    /deep/ .van-cell__title{
      color:#737a7c;
    }
    /deep/ .van-cell{
      background: linear-gradient(#e5f3f3,#e6f4f3);
    }
    /deep/ .isMarginBottom{
        margin-bottom:29rpx;
    }
}
.upload-container{
    background: linear-gradient(#e5f3f3,#e6f4f3);
    padding:0rpx 23rpx;
    &>h5{
        color:#737a7c;
        font-size:26rpx;
        padding:36rpx 0rpx 29rpx;
    }
}
.release-btn {
     display:flex;
     justify-content:center;
     align-items:center;
     padding:50rpx 0rpx; 
     &>span{
         color:#fff;
         background: linear-gradient(#89c99a,#00b1e2);
         width:194rpx;
         height:58rpx;
         border-radius:20rpx;
         display:flex;
         justify-content:center;
         align-items:center;
         font-size:26rpx;
     }
}
</style>