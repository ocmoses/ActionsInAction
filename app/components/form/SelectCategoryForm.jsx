import {
  ArrowRightCircle,
  ArrowDownCircle,
  CheckedIcon,
  UnCheckedHoverIcon,
  UnCheckedInactiveIcon
} from '@/app/components/HeroIcons'

const fetchData = async (url, options) => {
  const errors = []
  const headers = {
    apikey: 't7286gyfe987ffey87*Zzzht45334DSWTU',
    'content-type': 'application/json'
  }
  try {
    const response = await fetch(url, {
      method: options?.method ?? 'GET',
      headers: headers,
      redirect: 'follow'
    }).catch((e) => {
      errors.push('We could not reach the server. Please check your connection')
    })
    if (response) {
      const { data, success } = await response.json()
      if (response.status >= 200 && response.status < 300) {
        if (success) {
          return { success: true, data, errors: null }
        } else {
          errors.push('Something went wrong')
        }
      } else if (response.status === 404) {
        errors.push('An error 404 was encountered. Please contact us')
        console.log('Error 404')
      } else {
        if (typeof data === 'object' && data !== null && !Util.isEmpty(data)) {
          for (const error in data) {
            if (data[error].constructor === Array && data[error].length > 0) {
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
        } else if (typeof data === 'string' && data !== null && data !== '') {
          errors.push(data)
        }
      }
    } else {
      errors.push('Something went wrong')
      console.log('No response returned')
    }
  } catch (e) {
    console.log('e => ', e)
  }
  return { success: false, data: null, errors }
}

async function SelectCategoryForm(_, { children }) {
  const cdata = await fetch(
    'https://amazonpartner.com.ng/amazon/public/api/v1/categories'
  )
  console.log('errors', cdata.errors)
  console.log('categories', cdata.data)
  const selectCategory = (c) => {
    if (hasSubcategory(c)) handleToggleTabs(c)
    else toggleChecked(c)
  }
  const hasSubcategory = (c) => typeof categorySub[c] !== 'undefined'

  return { children }
}

export default SelectCategoryForm
