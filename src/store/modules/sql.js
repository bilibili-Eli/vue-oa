import { select, update, insert, remove } from '@/api/sql'
import { Message } from 'element-ui'

const user = {
  actions: {
    selectSql({ commit }, data) {
      return new Promise((resolve, reject) => {
        select(data).then(response => {
          if (response.code === 0) {
            Message.success(response.msg)
          } else {
            Message.error(response.msg)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateSql({ commit }, data) {
      return new Promise((resolve, reject) => {
        update(data).then(response => {
          if (response.code === 0) {
            Message.success(response.msg)
          } else {
            Message.error(response.msg)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    insertSql({ commit }, data) {
      return new Promise((resolve, reject) => {
        insert(data).then(response => {
          if (response.code === 0) {
            Message.success(response.msg)
          } else {
            Message.error(response.msg)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteSql({ commit }, data) {
      return new Promise((resolve, reject) => {
        remove(data).then(response => {
          if (response.code === 0) {
            Message.success(response.msg)
          } else {
            Message.error(response.msg)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
