import axios from 'axios'
import { apiURL } from './constants.js'
// create an axios instance
const service = axios.create({
  baseURL: apiURL,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// response interceptor
let refresh = false
service.interceptors.response.use(
  (response) => {
    const res = response.data
    /* Informational responses */
    if (response.status >= 100 && response.status < 200) {
      // return res
    }
    /* Successful responses */
    if (response.status >= 200 && response.status < 300) {
      // return res
    }
    /* Redirection responses */
    if (response.status >= 300 && response.status < 400) {
      // return res
    }
    /* Client error responses */
    if (response.status >= 400 && response.status < 500) {
      // return res
    }
    /* Server error responses */
    if (response.status >= 500 && response.status < 600) {
      // return res
    }
    return res
  },
  async (error) => {
    if (error.response?.status === 401 && !refresh) {
      refresh = true

      const { success, data /* , status */ } = await service
        .get('/user/refresh', {
          withCredentials: false
        })
        .catch(() => {
          // console.log(status);
        })

      if (success) {
        service.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.authorisation.token}`
        return service(error.config)
      } else {
        // console.log(status);
      }
    }
    refresh = false
    return error
    // return Promise.reject(error);
  }
)
export default service
