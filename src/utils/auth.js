import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 数组去重
export function array_remove_repeat(a) {
  const r = []
  for (let i = 0; i < a.length; i++) {
    let flag = true
    const temp = a[i]
    for (let j = 0; j < r.length; j++) {
      if (temp === r[j]) {
        flag = false
        break
      }
    }
    if (flag) {
      r.push(temp)
    }
  }
  return r
}
