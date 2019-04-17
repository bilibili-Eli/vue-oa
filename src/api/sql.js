import request from '@/utils/request'

export function select(data) {
  return request({
    url: '/sql/select',
    method: 'post',
    data: data
  })
}
