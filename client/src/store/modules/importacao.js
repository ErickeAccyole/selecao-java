import ImportacaoAPI from '@/api/importacao'

const actions = {
  importaArquivoCsv({ commit }, arquivo) {
    return new Promise((resolve, reject) => {
      ImportacaoAPI.importaArquivoCsv(arquivo)
        .then((response) => {
          console.log(response)
          resolve(response.data)
        })
        .catch(err => reject(err.response.data))
    })
  }
}

const importacao = {
  namespaced: true,
  actions
}

export default importacao
