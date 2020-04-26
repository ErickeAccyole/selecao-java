import request from '@/utils/request'

const URI = '/importacao'

export default {
  importaArquivoCsv(arquivo) {
    return request.post(`${URI}/file`, arquivo, { headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
