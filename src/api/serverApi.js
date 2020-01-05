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
// export function uploadImage (data) {
//   return request('/upload/image', 'post', data)
// }
