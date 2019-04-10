import { selectAll, selectChildAndParent } from '@/api/menus'
import { Message } from 'element-ui'

const menus = {
  actions: {
    selectMenus({ commit }, data) {
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
    selectMenusChildAndParent({ commit }, data) {
      return new Promise((resolve, reject) => {
        selectChildAndParent(data).then(response => {
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

export default menus
