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
  try {
    const response = await fetch(url, options).catch((e) => {
      console.log('e', e)
    })
    console.log('response', { url, response })
    if (!response?.ok) {
      errMsg += 'Error! '
    }
    if (response) {
      const { data, success } = await response?.json()
      if (response?.ok) {
        if (success) {
          return { success, errors: [], data }
        } else {
          errors.push('Sorry! Something went wrong. No data was returned')
        }
      } else if (data?.message) {
        errors.push(errMsg + data?.message)
      }
    } else {
      errors.push(
        'Sorry! We could not reach the server. Please check your connection and reload this page'
      )
    }
  } catch (e) {
    errors.push(
      'Sorry! We could not reach the server. Please check your connection. ' +
        e.toString()
    )
  }
  return { success: false, errors, data: null }
}
