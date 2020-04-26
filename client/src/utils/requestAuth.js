import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service2 = axios.create({
  baseURL: process.env.BASE_API_AUTH, // api base_url
  timeout: 5000 // request timeout
})

// request interceptor
service2.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers.Authorization = `${getToken()}`
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
// service.interceptors.response.use(
//   response => response,
//   error => {
//     return Promise.reject(error)
//   }
// )

export default service2
