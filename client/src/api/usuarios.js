import request from '@/utils/request'

const URI = '/usuarios'

export default {
  create(usuario) {
    return request.post(URI, usuario)
  },
  update(usuario) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    }

    return request.put(URI, usuario, axiosConfig)
  },
  updateMyAccount(usuario) {
    return request.patch(`${URI}/atualiza-conta`, usuario)
  },
  updatePassword(usuario) {
    return request.patch(`${URI}/atualiza-senha`, usuario)
  },
  delete(id) {
    return request.delete(`${URI}/${id}`)
  },
  getAll(params) {
    return request.get(URI, { params })
  },
  getOne(id) {
    return request.get(`${URI}/${id}`)
  }
  // getUsersCount() {
  //   return request.get(`${URI}/count`)
  // },
  // getTechniciansCount() {
  //   return request.get(`${URI}/technicians/count`)
  // }
}
