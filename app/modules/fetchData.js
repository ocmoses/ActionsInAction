export const fetchData = async (url, opt) => {
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
    const result = await fetch(url, options)
    console.log('result', { url, result })
    if (result) {
      const { data, success } = await result?.json()
      if (result?.ok) {
        if (success) {
          return { success, error: null, data }
        } else {
          return {
            success: false,
            error: 'Sorry! Something went wrong. No data was returned',
            data: null
          }
        }
      } else if (data?.message) {
        return { success: false, error: data?.message, data: null }
      }
    } else {
      return {
        success: false,
        error:
          'Sorry! We could not reach the server. Please check your connection and reload this page',
        data: null
      }
    }
  } catch (e) {
    return {
      success: false,
      error:
        'Sorry! We could not reach the server. Please check your connection. ' +
        e.toString(),
      data: null
    }
  }
  return { success: false, error: 'Something went wrong', data: null }
}
