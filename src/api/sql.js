import request from '@/utils/request'

export function select(data) {
  return request({
    url: '/sql/select',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: '/sql/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: '/sql/insert',
    method: 'post',
    data: data
  })
}

export function remove(data) {
  return request({
    url: '/sql/delete',
    method: 'post',
    data: data
  })
}

export function selectSchemata(data) {
  return request({
    url: '/sql/selectSchemata',
    method: 'post',
    data: data
  })
}
