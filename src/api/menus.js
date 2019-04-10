import request from '@/utils/request'

export function selectAll(data) {
  return request({
    url: '/menus/selectAll',
    method: 'post',
    data: data
  })
}

export function selectChildAndParent(data) {
  return request({
    url: '/menus/selectChildAndParent',
    method: 'post',
    data: data
  })
}
