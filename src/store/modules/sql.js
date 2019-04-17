import { select } from '@/api/sql'
import { Message } from 'element-ui'

const user = {
  actions: {
    // 获取当前在线用户信息
    selectSql({ commit }, data) {
      return new Promise((resolve, reject) => {
        select(data).then(response => {
          if (response.code === 0) {
            Message.success(response.msg)
            resolve(response)
          } else {
            Message.error(response.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
