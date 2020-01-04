import request from '@/utils/request'

export function getToken (data) {
  return request('/token/user', 'post', data)
}

export function getAllCategories () {
  return request('/category/all', 'get')
}

export function createActivity () {
  return request('/create_activity', 'post')
}
// export function uploadImage (data) {
//   return request('/upload/image', 'post', data)
// }
