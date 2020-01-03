/*
 * @Author: your name
 * @Date: 2019-12-03 18:35:21
 * @LastEditTime : 2020-01-03 19:29:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\utils\index.js
 */
/* global getCurrentPages */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}
export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
/* 获取当前页url */
export function getCurrentPageUrl () {
  var pages = getCurrentPages() // 获取加载的页面
  console.log(pages)
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  var url = currentPage.route // 当前页面url
  return url
}

/* 获取当前页带参数的url */
export function getCurrentPageUrlWithArgs () {
  var pages = getCurrentPages() // 获取加载的页面
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  var url = currentPage.route // 当前页面url
  var options = currentPage.options // 如果要获取url中所带的参数可以查看options

  // 拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}
export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
// dateTime 为 YYYY-mm-dd
// compare 为 比较符号 eq 等于 gt大于  lt小于
export function compareDate (dateTime1, compare, dateTime2) {
  const formatDate1 = +new Date(dateTime1)
  const formatDate2 = +new Date(dateTime2)
  if (compare === 'eq') {
    if (formatDate1 === formatDate2) {
      return true
    } else {
      return false
    }
  } else if (compare === 'gt') {
    if (formatDate1 > formatDate2) {
      return true
    } else {
      return false
    }
  } else {
    if (formatDate1 < formatDate2) {
      return true
    } else {
      return false
    }
  }
}
// 将 数据 转化为 后台 所接受的数据
export function dataToserverData (data) {
  const target = {}
  data.forEach(item => {
    const source = JSON.parse(`{"${item.fieldId}":"${item.fieldValue}"}`)
    Object.assign(target, source)
  })
  return target
}

export default {
  formatNumber,
  formatTime,
  getCurrentPageUrl,
  getCurrentPageUrlWithArgs
}
