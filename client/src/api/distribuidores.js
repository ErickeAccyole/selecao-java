import request from '@/utils/request'

const URI = '/distribuidoras'

export default {
  getAll() {
    return request.get(URI)
  }
}
