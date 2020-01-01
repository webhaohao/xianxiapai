import request from '@/utils/request'

export function getToken (data) {
  return request('/token/user', 'post', data)
}

export function getAllCategories () {
  return request('/category/all', 'get')
}

// export function uploadImage (data) {
//   return request('/upload/image', 'post', data)
// }
