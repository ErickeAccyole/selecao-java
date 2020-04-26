import ConsultaAPI from '@/api/consultas'

const actions = {
  getMediaDePrecoDeVendaPorMunicipio({ commit }) {
    return new Promise((resolve, reject) => {
      ConsultaAPI.getMediaDePrecoDeVendaPorMunicipio()
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  },
  getInformacoesImportadasPorSiglaDaRegiao({ commit }) {
    return new Promise((resolve, reject) => {
      ConsultaAPI.getInformacoesImportadasPorSiglaDaRegiao()
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err))
    })
  },
  getInformacoesAgrupadosPorDistribuidora({ commit }) {
    return new Promise((resolve, reject) => {
      ConsultaAPI.getInformacoesAgrupadosPorDistribuidora()
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  },
  getInformacoesAgrupadosPorData({ commit }) {
    return new Promise((resolve, reject) => {
      ConsultaAPI.getInformacoesAgrupadosPorData()
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  },
  getMediaValorCompraVendaPorMunicipio({ commit }) {
    return new Promise((resolve, reject) => {
      ConsultaAPI.getMediaValorCompraVendaPorMunicipio()
        .then((response) => {
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  },
  getMediaValorCompraVendaPorBandeira({ commit }) {
    return new Promise((resolve, reject) => {
      ConsultaAPI.getMediaValorCompraVendaPorBandeira()
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response.data)
        })
    })
  }
}

const consultas = {
  namespaced: true,
  actions
}

export default consultas
