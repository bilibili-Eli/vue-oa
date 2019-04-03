import request from '@/utils/request'

export function selectAll(data) {
  return request({
    url: '/dictionary/select',
    method: 'post',
    data: data
  })
}

export function selectById(data) {
  return request({
    url: '/dictionary/selectById',
    method: 'post',
    data: data
  })
}

export function selectChildrenByName(data) {
  return request({
    url: '/dictionary/selectChildrenByName',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: '/dictionary/insert',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: '/dictionary/update',
    method: 'post',
    data: data
  })
}
