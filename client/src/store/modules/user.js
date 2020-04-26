import { loginByUsername, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    code: '',
    token: getToken(),
    nome: '',
    username: '',
    id: null,
    avatar: '',
    roles: []
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_NOME: (state, nome) => {
      state.nome = nome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data)
          setToken(data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          console.log('aki', response)
          if (!response.data) {
            reject('Verification failed, please login again.')
          }

          const data = response.data

          if (typeof data.admin !== 'undefined') {
            commit('SET_ROLES', data.admin ? ['Administrador'] : ['Garcon'])
          } else {
            reject('getInfo: roles must be a non-null profile!')
          }

          commit('SET_NAME', data.name)
          commit('SET_ID', data.id)
          commit('SET_AVATAR', data.avatar)
          commit('SET_CODE', data.code)
          commit('SET_EMAIL', data.email)
          resolve(response)
        }).catch(error => {
          console.log('erro', error)
          reject(error.response.data)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        try {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        } catch (error) {
          reject(error.response.data)
        }
      })
    }
  }
}

export default user
