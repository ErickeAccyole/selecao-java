import CombustivelAPI from '@/api/combustiveis'

const actions = {
  getAll({ commit }) {
    return new Promise((resolve, reject) => {
      CombustivelAPI.getAll()
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  }
}

const combustiveis = {
  namespaced: true,
  actions
}

export default combustiveis
