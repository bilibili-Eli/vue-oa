import request from '@/utils/request'

export function selectAll(data) {
  return request({
    url: '/menus/selectAll',
    method: 'post',
    data: data
  })
}
