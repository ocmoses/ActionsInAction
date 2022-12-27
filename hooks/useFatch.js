import { useEffect, useState } from 'react'
import { Util } from '@/utils/utility'

const useFetch = (initialUrl, options) => {
  const [url, setUrl] = useState(initialUrl || '')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    if (!url) return
    setLoading(true)
    const fetchData = async () => {
      const errors = []
      let status = false
      const headers = {
        apikey: 't7286gyfe987ffey87*Zzzht45334DSWTU',
        'content-type': 'application/json',
        ...(options?.headers ?? {})
      }
      try {
        const response = await fetch(url, {
          method: options?.method ?? 'GET',
          headers: headers,
          redirect: 'follow'
        }).catch((e) => {
          errors.push(
            'We could not reach the server. Please check your connection'
          )
          console.log(e.message)
        })
        if (response) {
          const { data, success } = await response.json()
          if (response.status >= 200 && response.status < 300) {
            if (success) {
              console.log('data', data)
              setData(data)
            } else {
              errors.push('Something went wrong')
              console.log('No data returned')
            }
          } else if (response.status === 404) {
            errors.push('An error 404 was encountered. Please contact us')
            console.log('Error 404')
          } else {
            if (
              typeof data === 'object' &&
              data !== null &&
              !Util.isEmpty(data)
            ) {
              for (const error in data) {
                if (
                  data[error].constructor === Array &&
                  data[error].length > 0
                ) {
                  data[error].map((err) => {
                    errors.push(err)
                  })
                } else {
                  errors.push(
                    data?.message ??
                      'An error occured. Please reach out to us if issue persists'
                  )
                }
              }
            } else if (
              typeof data === 'string' &&
              data !== null &&
              data !== ''
            ) {
              errors.push(data)
            }
          }
        }
        s
      } catch (e) {
        console.log('e => ', e)
      }
      setLoading(false)
      setErrors(errors)
    }

    fetchData()
  }, [url, options])

  return [{ data, loading, errors }, setUrl]
}

export default useFetch
