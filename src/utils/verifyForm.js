/*
 * @Author: web_haohao
 * @Date: 2020-01-03 10:38:33
 * @LastEditTime : 2020-01-03 14:36:02
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\utils\verifyForm.js
 */
class VerifyForm {
  constructor (formData) {
    this.formData = formData
    this.checkedFormData()
    this.formItemValidator()
  }
  checkedFormData () {
    this.formData.map(item => {
      if (item.required) {
        if (item.fieldValue && item.fieldValue.trim()) {
          item.errorMsg = ''
          // 查看数据中是否有rule...
          // 如果有 rules 则进行验证 , rules 在数据中定义为数组为之后扩展
          if (item.rules) {
            this.checkedFormRules()
          } else {
            item.errorMsg = ''
          }
        } else {
          item.errorMsg = item.placeholder
        }
        // item.validator && item.validator()
      } else {
        item.errorMsg = ''
      }
      return item
    })
  }
  checkedFormRules () {

  }
  formItemValidator () {
    // 如果 formData 中 含有属性  validator  && 前面的验证都通过后,执行 validator为业务逻辑的校验
    const result = this.getFormVerifyResut()
    if (!result) {
      return false
    }
    this.formData.map((item, index, arr) => {
      item.validator && item.validator(item.fieldValue, index, arr, this.itemValidatorCallback.bind(this))
    })
  }
  itemValidatorCallback (index, message) {
    this.formData[index].errorMsg = message
  }
  getFormVerifyResut () {
    // 如果 formData 中 errorMsg 没有值 则 验证通过
    // 否则 验证失败
    return this.formData.every(item => item.errorMsg === '')
  }
}

export {VerifyForm}
