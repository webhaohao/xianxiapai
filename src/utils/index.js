/* global getCurrentPages */
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

export default {
  formatNumber,
  formatTime,
  getCurrentPageUrl,
  getCurrentPageUrlWithArgs
}
