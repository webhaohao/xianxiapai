<!--
 * @Author: your name
 * @Date: 2019-12-20 17:26:00
 * @LastEditTime : 2020-02-03 16:57:15
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\pages\releaseActi\index.vue
 -->
<!--  -->
<template>
  <div class="pages">
    <div class="release-page" v-if="isShowAuth">
      <div class="upload-banner">
            <van-image
              width="750rpx"
              height="372rpx"
              fit="cover"
              :src="tempFilePaths"
              @click="uploadwxImage"
              v-if="tempFilePaths"
            />
            <img v-else src="/static/images/camera.png" class="camera-icon" @click="uploadwxImage" > 
      </div>
      <div class="form-container">
          <div :class="[{'isMarginBottom':item.isMarginBottom}]" v-for="(item,index) in formData" :key="index">
              <!--解决textarea 小程序 层级过高问题 没有办法的办法--->
              <van-cell-group v-if="item.fieldType === 'textarea'">
                <van-cell :title="item.fieldName" :value="item.fieldValue ? item.fieldValue:item.placeholder" v-if="isShowTextarea"/>
                <van-field
                  :value="item.fieldValue"
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
                  :error-message="item.errorMsg"
                  error-message-align="right"
                  :required="item.required"
                  v-else
                />
              </van-cell-group>
              <van-cell-group v-else>
                <van-field
                  :value="item.fieldValue"
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
                  :error-message="item.errorMsg"
                  error-message-align="right"
                  :required="item.required"
                />
              </van-cell-group>
          </div>
      </div>
      <div class="upload-container">
            <h5>活动照片</h5>
            <van-uploader :file-list="fileList" @afterRead="afterRead" @delete="removeFile" :multiple="true" />
      </div>
      <div class="release-btn">
            <van-button color="linear-gradient(to right,#89c99a,#00b1e2)" loading-text="正在发布..." :disabled="disabled" :loading="isLoading" :block="true" @vclick="handleRelease">发布</van-button>
      </div>  
      <van-popup :show="timePop"  position="bottom" :overlay="true">
            <van-datetime-picker
              type="datetime"
              :value = "currentDate"
              @cancel="timePop = false"
              @confirm="dateTimeConfirm"
              loading
            />
      </van-popup>
      <van-popup :show="pickerPop" position="bottom" :overlay="true">
            <van-picker :title="popTitle" show-toolbar :columns="columns"  @cancel="pickerPop = false" @confirm="onConfirm" />
      </van-popup>
      <van-toast id="van-toast" />
    </div>
    <auth v-else></auth>
  </div>
  
</template>

<script>
import { getAllCategories, createActivity } from '@/api/serverApi'
import { wxUploadFile } from '@/api/wxApi'
import { mapActions, mapState } from 'vuex'
import { parseTime, compareDate, dataToserverData } from '@/utils'
import Toast from '@/../static/vant/toast/toast'
import auth from '@/components/auth'
import { VerifyForm } from '@/utils/verifyForm'
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
          errorMsg: '',
          icon: '',
          required: true
        },
        {
          fieldId: 'categories',
          fieldName: '活动类型',
          fieldType: 'select',
          fieldValue: '',
          isMarginBottom: true,
          placeholder: '请选择活动类型',
          icon: 'arrow-down',
          errorMsg: '',
          options: [
          ],
          required: true
        },
        {
          fieldId: 'start_time',
          fieldName: '开始时间',
          fieldType: 'datetime',
          fieldValue: '',
          placeholder: '请选择开始时间',
          errorMsg: '',
          icon: 'arrow-down',
          required: true,
          validator: (value, index, data, callBack) => {
            const endTimeIndex = data.findIndex(item => item.fieldId === 'end_time')
            const result = compareDate(value, 'lt', data[endTimeIndex].fieldValue)
            if (!result) {
              callBack(index, '活动开始日期应小于结束日期')
            }
          }
        },
        {
          fieldId: 'end_time',
          fieldName: '结束时间',
          fieldType: 'datetime',
          fieldValue: '',
          placeholder: '请选择结束时间',
          isMarginBottom: true,
          errorMsg: '',
          icon: 'arrow-down',
          required: true,
          validator: (value, index, data, callBack) => {
            const endTimeIndex = data.findIndex(item => item.fieldId === 'start_time')
            const result = compareDate(value, 'gt', data[endTimeIndex].fieldValue)
            if (!result) {
              callBack(index, '活动结束日期应大于开始日期')
            }
          }
        },
        {
          fieldId: 'location',
          fieldName: '活动地点',
          fieldType: 'text',
          fieldValue: '',
          placeholder: '请输入活动地点',
          errorMsg: '',
          icon: '',
          required: true
        },
        {
          fieldId: 'number',
          fieldName: '活动人数',
          fieldType: 'number',
          fieldValue: '',
          placeholder: '请输入活动人数',
          isMarginBottom: true,
          errorMsg: '',
          icon: '',
          required: true
        },
        {
          fieldId: 'detail',
          fieldName: '活动详情',
          fieldType: 'textarea',
          fieldValue: '',
          placeholder: '请输入活动详情',
          isMarginBottom: true,
          errorMsg: '',
          icon: '',
          required: true
        }
      ],
      columns: [],
      isShowTextarea: false,
      pickerPop: false,
      timePop: false,
      fileList: [],
      currentDate: new Date().getTime(),
      tempFilePaths: '',
      categories: [],
      isLoading: false,
      disabled: false,
      activity_type_id: 0
    }
  },

  components: {auth},

  computed: {
    ...mapState(['wxUserInfo']),
    isShowAuth () {
      return Object.keys(this.wxUserInfo).length
    }
  },
  created () {
    this._wxGetuserInfo()
  },
  mounted () {
    (async () => {
      const result = await getAllCategories()
      this.categories = result.items
      this.activity_type_id = result.id
      const index = this.formData.findIndex((item) => item.fieldId === 'categories')
      console.log(this.categories.map(item => item.name))
      console.log(this.formData[index].options)
      this.formData[index].options = this.categories.map(item => item.name)
      console.log(this.categories)
    })()
  },

  methods: {
    ...mapActions(['_wxGetuserInfo']),
    async handleRelease (event) {
      console.log('handleRelease')
      // 提交表单,校验表单是否符合要求
      if (!this.tempFilePaths) {
        Toast.fail('请上传活动的封面图片!')
        return false
      }
      const verifyForm = new VerifyForm(this.formData)
      console.log('verifyForm', verifyForm)
      console.log('formData', this.formData)
      const verifyResut = verifyForm.getFormVerifyResut()
      console.log(verifyResut)
      if (verifyResut) {
        this.formData = verifyForm.formData
        this.isLoading = true
        this.disabled = true
        let serverData = dataToserverData(this.formData)
        const currentCategory = this.categories.filter(item => item.name === serverData.categories)[0]
        Object.assign(serverData,
          {main_img_url: this.tempFilePaths},
          {detail_imgs: this.fileList},
          {category_id: currentCategory.id},
          {activity_type_id: this.activity_type_id}
        )
        console.log(serverData)
        const result = await createActivity(serverData)
        console.log(result)
        if (result.code === 201) {
          Toast.success('活动发布成功')
        } else {
          Toast.fail(result.msg)
        }
        this.isLoading = false
        this.disabled = false
      }
    },
    itemClick (index, item) {
      console.log(item)
      this.currentIndex = index
      this.isShowTextarea = true
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
    onBlur (event) {
      console.log(event)
      // this.formData[0].fieldType = event.mp.detail
    },
    async afterRead (event) {
      console.log(event)
      const {file} = event.mp.detail
      const files = file.map(item => item.path)
      const result = await this.batchWxUploadFiles(files, '/activity/upload_image')
      console.log(result)
      const index = result.findIndex(item => !item.url)
      if (index >= 0) {
        Toast.fail(`您上传第${index + 1}张不合法,系统将自动删除!`)
        result.splice(index, 1)
      }

      this.fileList.push(...result)
      // console.log(this.fileList)
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
      this.isShowTextarea = false
    },
    dateTimeConfirm (value) {
      console.log('datetime', value)
      this.formData[this.currentIndex].fieldValue = parseTime(value.mp.detail, '{y}-{m}-{d} {h}:{i}')
      this.timePop = false
      this.pickerPop = false
      this.isShowTextarea = false
    },
    wxChooseImage () {
      return new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            resolve(tempFilePaths)
          }
        })
      })
    },
    async uploadwxImage () {
      const tempFilePaths = await this.wxChooseImage()
      const result = await this.batchWxUploadFiles(tempFilePaths, '/activity/upload_image')
      console.log(result)
      if (result[0]['url']) {
        this.tempFilePaths = result[0]['url']
      } else {
        Toast.fail('请上传合法的图片！')
      }
    },
    removeFile (e) {
      const {index} = e.mp.detail
      this.fileList.splice(index, 1)
    },
    batchWxUploadFiles (files, url) {
      return Promise.all(files.map(async (item) => {
        const res = await wxUploadFile({
          url: process.env.API_BASE_URL + url,
          filePath: item,
          name: 'files'
        })
        console.log(res)
        return res
      })
      )
    }
  }
}
</script>
<style lang='scss' scoped>
.release-page{
    padding-bottom:115rpx;
    /deep/ .van-field__error--right{
        text-align:right;
    }
}
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
      /deep/ .van-image{
          display: block;
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
     position:fixed;
     width:100%;
     bottom:0;
     justify-content:center;
     align-items:center;
     /deep/ ._van-button{
        width:100%;
     }
}
</style>