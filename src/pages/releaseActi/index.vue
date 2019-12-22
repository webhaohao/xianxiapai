<!--
 * @Author: your name
 * @Date: 2019-12-20 17:26:00
 * @LastEditTime : 2019-12-22 14:54:41
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
                  :readonly="item.fieldType ==='select' || item.fieldType === 'datetime'"
                  :label="item.fieldName"
                  :icon="item.icon"
                  :border="false"
                  :placeholder="item.placeholder"
                  @click="(item.fieldType ==='select' || item.fieldType === 'datetime')&& itemClick(index,item)"
                />
              </van-cell-group>
          </div>
      </div>
      <van-popup :show="timePop"  position="bottom" :overlay="true">
            <van-datetime-picker
              type="datetime"
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
          icon: 'arrow-down'
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
          fieldType: 'text',
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
      timePop: false
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
        this.picerPop = true
        this.popTitle = item.placeholder
        this.columns = item.option
      }
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
      background: linear-gradient(#edf6eb,#ecf5ec);
    }
    /deep/ .isMarginBottom{
        margin-bottom:29rpx;
    }
}

</style>