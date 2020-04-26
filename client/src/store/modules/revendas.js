import RevendaAPI from '@/api/revendas'

const actions = {
  create({ commit }, revenda) {
    return new Promise((resolve, reject) => {
      RevendaAPI.create(revenda)
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  },
  update({ commit }, revenda) {
    return new Promise((resolve, reject) => {
      RevendaAPI.update(revenda)
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  },
  delete({ commit }, revendaId) {
    return new Promise((resolve, reject) => {
      RevendaAPI.delete(revendaId)
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  },
  getAll({ commit }, params) {
    return new Promise((resolve, reject) => {
      RevendaAPI.getAll(params).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error.response.data)
      })
    })
  },
  getOne({ commit }, id) {
    return new Promise((resolve, reject) => {
      RevendaAPI.getOne(id).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error.response.data)
      })
    })
  }
}

const revendas = {
  namespaced: true,
  actions
}

export default revendas
