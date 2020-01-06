/*
 * @Author: web_haohao
 * @Date: 2020-01-03 10:38:33
 * @LastEditTime : 2020-01-06 11:20:48
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
    this.formData.map((item, index, arr) => {
      if (item.required) {
        this.checkItemRequired(item, index, arr)
      }
      if (item.rules) {
        !item.errorMsg && this.checkedFormRules(item, index, arr)
      }
      if (item.validator) {
        !item.errorMsg && this.formItemValidator(item, index, arr)
      }
      return item
    })
  }
  checkItemRequired (item, index, arr) {
    if (!item.fieldValue && !item.fieldValue.trim()) {
      this.formData[index].errorMsg = item.placeholder
    } else {
      this.formData[index].errorMsg = ''
    }
  }
  checkedFormRules (item) {

  }
  formItemValidator (item, index, arr) {
    // 如果 formData 中 含有属性  validator  && 前面的验证都通过后,执行 validator为业务逻辑的校验
    item.validator && item.validator(item.fieldValue, index, arr, this.itemValidatorCallback.bind(this))
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
