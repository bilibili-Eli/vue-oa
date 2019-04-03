import { selectAll, selectById, selectChildrenByName, insert, update } from '@/api/dictionary'
import { Message } from 'element-ui'

const dictionary = {
  actions: {
    selectDictionary({ commit }, data) {
      return new Promise((resolve, reject) => {
        selectAll(data).then(response => {
          if (response.code === 0) {
            resolve(response)
          } else {
            Message.error(response.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    selectByIdDictionary({ commit }, data) {
      return new Promise((resolve, reject) => {
        selectById(data).then(response => {
          if (response.code === 0) {
            resolve(response)
          } else {
            Message.error(response.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    selectChildrenByNameDictionary({ commit }, data) {
      return new Promise((resolve, reject) => {
        selectChildrenByName(data).then(response => {
          if (response.code === 0) {
            resolve(response)
          } else {
            Message.error(response.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    insertDictionary({ commit }, data) {
      return new Promise((resolve, reject) => {
        insert(data).then(response => {
          if (response.code === 0) {
            resolve(response)
          } else {
            Message.error(response.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateDictionary({ commit }, data) {
      return new Promise((resolve, reject) => {
        update(data).then(response => {
          if (response.code === 0) {
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

export default dictionary
