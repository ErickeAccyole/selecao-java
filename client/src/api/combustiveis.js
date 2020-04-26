import request from '@/utils/request'

const URI = '/combustiveis'

export default {
  getAll() {
    return request.get(URI)
  }
}
