import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { selectAll } from '@/api/user'

const user = {
  state: {
    system: '',
    token: getToken(),
    name: '',
    avatar: '',
    expire: '',
    roles: []
  },

  mutations: {
    SET_SYSTEM: (state, system) => {
      state.system = system
    },

    SET_EXPIRE: (state, expire) => {
      state.expire = expire
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          if (response.code === 0) {
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            commit('SET_EXPIRE', data.expire)
            commit('SET_NAME', data.userName)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_SYSTEM', '系统权限解决方案')
          commit('SET_AVATAR', 'http://img1.touxiang.cn/uploads/20130525/25-020604_677.jpg')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取当前在线用户信息
    GetOnlineUser() {
      return new Promise((resolve, reject) => {
        selectAll().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
