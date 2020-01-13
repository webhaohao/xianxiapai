/*
 * @Author: your name
 * @Date: 2019-12-30 19:38:15
 * @LastEditTime : 2020-01-13 14:06:25
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai\src\api\serverApi.js
 */
import request from '@/utils/request'

export function getToken (data) {
  return request('/token/user', 'post', data)
}

export function getAllCategories () {
  return request('/category/all', 'get')
}

export function createActivity (data) {
  return request('/create_activity', 'post', data)
}

export function getActivitesByScope (scope) {
  return request(`/activity/by_scope/${scope}`, 'get')
}
export function getCategoryByAccId (categoryId) {
  return request('/category/by_accid', 'get', categoryId)
}

export function updateWxUserInfo (data) {
  return request('/user/update_wx_userinfo', 'post', data)
}
export function getReleaserInfoByScopeAndUserId (data) {
  return request('/activity/getReleaserinfo_by_scope_and_userid', 'post', data)
}

export function getActivityDetailById (id) {
  return request(`/activity/detail/${id}`, 'get')
}

export function checkUserIsJoinActivity (id) {
  return request(`/user/check_user/${id}`, 'get')
}
export function joinActivity (data) {
  return request('/activity/join_activity', 'post', data)
}

export function getNewsCategories () {
  return request('/newsCategory/all', 'get')
}
export function getNewsDetailByCategoryId (data) {
  return request('/news/detail_by_CategoryId', 'get', data)
}

export function getNewsDetailById (id) {
  return request(`/news/detail/${id}`, 'get')
}

export function getAbout () {
  return request(`/about/get`, 'get')
}
