import request from '@/utils/request'

export function selectAll() {
  return request({
    url: '/users/redis/selectAll',
    method: 'post'
  })
}

export function deleteAll() {
  return request({
    url: '/users/redis/deleteAll',
    method: 'delete'
  })
}
