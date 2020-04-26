import UsuarioAPI from '@/api/usuarios'

const actions = {
  create({ commit }, employee) {
    return new Promise((resolve, reject) => {
      UsuarioAPI.create(employee)
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  },
  update({ commit }, employee) {
    return new Promise((resolve, reject) => {
      UsuarioAPI.update(employee)
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err))
    })
  },
  updateMyAccount({ commit }, employee) {
    return new Promise((resolve, reject) => {
      UsuarioAPI.updateMyAccount(employee)
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  },
  updatePassword({ commit }, user) {
    return new Promise((resolve, reject) => {
      UsuarioAPI.updatePassword(user)
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  },
  delete({ commit }, employeeId) {
    return new Promise((resolve, reject) => {
      UsuarioAPI.delete(employeeId)
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  },
  getAll({ commit }, params) {
    return new Promise((resolve, reject) => {
      UsuarioAPI.getAll(params).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error.response.data)
      })
    })
  },
  getOne({ commit }, id) {
    return new Promise((resolve, reject) => {
      UsuarioAPI.getOne(id).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error.response.data)
      })
    })
  }
}

const usuarios = {
  namespaced: true,
  actions
}

export default usuarios
