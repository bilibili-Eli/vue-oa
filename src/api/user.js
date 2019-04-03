import request from '@/utils/request'

export function selectAll() {
  return request({
    url: '/users/redis/selectAll',
    method: 'post'
  })
}
