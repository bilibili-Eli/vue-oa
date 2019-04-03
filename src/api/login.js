import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/users/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}
