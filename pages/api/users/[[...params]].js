import { apiURL } from '@/app/modules/constants'
import Axios from '@/app/modules/axios'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const body = JSON.parse(req.body)
      console.log({ body })
    } else {
      const { params } = req.query
      console.log({ params })
    }
    return res.status(200).json({ success: false, data: 'Params' })
    // const response = await fetch(`${apiURL}/v1/auth/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   redirect: 'follow', // manual, *follow, error
    //   referrerPolicy: 'no-referrer',
    //   body: JSON.stringify(user)
    // })
    // const result = await response.json()
    // console.log({ result })
    // if (response?.ok) {
    //   const { data, success } = result
    //   res.status(200).json({ success, error: null, data })
    // } else {
    //   if (result?.data) {
    //     const { data, success } = result
    //     res.status(200).json({ success, error: data.message, data: null })
    //   } else {
    //     res.status(200).json({
    //       success: false,
    //       error: `${response.status} ${response.statusText}`
    //     })
    //   }
    // }
    // const result = await Axios.post('/v1/auth/loginx', user)
    // console.log('Response data', result.response.data)
    // if (result.response.status === 404) {
    //   console.log('404 Response data', 'Page not found')
    // }
  } catch (error) {
    res.status(200).json({ success: false, error: error.message })
  }
}
