import axios from "axios"
import { apiURL, apikey } from "./constants.js"
// create an axios instance
const Axios = axios.create({
  baseURL: apiURL,
  withCredentials: false, 
  timeout: 30000, // request timeout
})
Axios.defaults.headers.common["apikey"] = apikey
// response interceptor
let refresh = false
Axios.interceptors.response.use(
  (response) => {
    const res = response.data

    // console.log("current response", res);

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

      const { success, data /* , status */ } = await Axios.get(
        "/user/refresh",
        {
          withCredentials: false,
        }
      ).catch(() => {
        // console.log(status);
      })

      if (success) {
        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.authorisation.token}`
        return Axios(error.config)
      } else {
        // console.log(status);
      }
    }
    refresh = false
    // return error?.response?.data
    return Promise.reject(error)
  }
)
export default Axios
