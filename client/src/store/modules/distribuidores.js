import DistribuidorAPI from '@/api/distribuidores'

const actions = {
  getAll({ commit }) {
    return new Promise((resolve, reject) => {
      DistribuidorAPI.getAll()
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  }
}

const distribuidores = {
  namespaced: true,
  actions
}

export default distribuidores
