import request from '@/utils/request'

const URI = '/revendas'

export default {
  create(revenda) {
    return request.post(URI, revenda)
  },
  update(revenda) {
    return request.put(URI, revenda)
  },
  delete(id) {
    return request.delete(`${URI}/${id}`)
  },
  getAll(params) {
    return request.get(URI)
  },
  getOne(id) {
    return request.get(`${URI}/${id}`)
  }
}
