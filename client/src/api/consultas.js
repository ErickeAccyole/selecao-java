import request from '@/utils/request'

const URI = '/revendas'

export default {
  getMediaDePrecoDeVendaPorMunicipio() {
    return request.get(`${URI}/mediaDePrecoDeVendaPorMunicipio`)
  },
  getInformacoesImportadasPorSiglaDaRegiao() {
    return request.get(`${URI}/informacoesImportadasPorSiglaDaRegiao`)
  },
  getInformacoesAgrupadosPorDistribuidora() {
    return request.get(`${URI}/informacoesAgrupadosPorDistribuidora`)
  },
  getInformacoesAgrupadosPorData() {
    return request.get(`${URI}/informacoesAgrupadosPorData`)
  },
  getMediaValorCompraVendaPorMunicipio() {
    return request.get(`${URI}/mediaValorCompraVendaPorMunicipio`)
  },
  getMediaValorCompraVendaPorBandeira() {
    return request.get(`${URI}/mediaValorCompraVendaPorBandeira`)
  }
}
