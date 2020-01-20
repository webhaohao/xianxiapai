/*
 * @Author: your name
 * @Date: 2019-12-30 19:38:15
 * @LastEditTime : 2020-01-20 16:52:54
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

export function getActivitesByFilter (data) {
  return request(`/activity/filter`, 'post', data)
}
export function getCategoryByAccId (categoryId) {
  return request('/category/by_accid', 'get', categoryId)
}

export function getCategoryByActivityTypeId (activityTypeId) {
  return request('/category/byActivityTypeId', 'get', activityTypeId)
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

export function getUserAgreement () {
  return request(`/userAgreement/get`, 'get')
}
export function userReleasedActivity () {
  return request(`/user/released_activity`, 'get')
}
export function userJoinActivity () {
  return request(`/user/join_activity`, 'get')
}

export function getWxUserInfo () {
  return request(`/user/wxUserInfo`, 'get')
}

export function getActivityByKeywords () {
  return request(`/activity/byKeywords`, 'get')
}

export function searchActivityByKeywords (data) {
  return request('/activity/search', 'post', data)
}

export function getAllActivityType () {
  return request('/activityType/all', 'get')
}

export function getBanner (id) {
  return request(`/banner/${id}`, 'get')
}
