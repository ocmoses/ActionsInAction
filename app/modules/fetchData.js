export const fetchData = async (url, opt) => {
  const errors = []
  let errMsg = ''
  const Opts = opt ?? {}
  const defaultHeaders = {
    apikey: 't7286gyfe987ffey87*Zzzht45334DSWTU',
    'content-type': 'application/json'
  }
  const defaultOptions = {
    method: Opts?.method ?? 'GET',
    headers: { ...defaultHeaders, ...Opts?.headers }
  }
  const options = { ...defaultOptions, ...Opts }
  console.log('options', options)
  try {
    const response = await fetch(url, options).catch((e) => {
      errors.push('We could not reach the server. Please check your connection')
      console.log('e.message', e.message)
    })
    if (!response?.ok) {
      errMsg += 'Failed to fetch data: '
      console.log('Failed to fetch data')
      // throw new Error('Failed to fetch data')
    }
    if (response?.ok) {
      const { data, success } = await response.json()
      if (response.status >= 200 && response.status < 300) {
        if (success) {
          console.log('data', data)
          return { success, errors: [], data }
        } else {
          errors.push('Something went wrong. No data was returned')
          console.log('No data returned')
        }
      } else if (response.status === 404) {
        errors.push(errMsg + 'An error 404 was encountered. Please contact us')
        console.log('Error 404')
      } else {
        console.log('Other errors')
        errors.push(errMsg + response.statusText)
      }
    }
  } catch (e) {
    console.log('e => ', e)
    loadDefaultErrorComponents.push(errMsg + 'Something went wrong')
  }
  return { success: false, errors, data: null }
}
