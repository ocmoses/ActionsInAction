import { Util } from '@/utils/utility'
import axios from 'axios'
import { fetchData } from './fetchData'
import { apiURL } from './constants'

export const getPartner = async (partnerid) => {
  const result = await fetchData(
    `${apiURL}/v1/auth/partner-info/${partnerid}`,
    {
      cache: 'no-store',
      next: { revalidate: 0 }
    }
  )
  return result
}
export const checkRegStatus = async (partner) => {
  const { percent_complete, profile_stage, user } = partner.data
  const stages = [
    'userinfo',
    'companyinfo',
    'category',
    'companydetail',
    'compliance',
    'ncclicense',
    'nlrclicense',
    'shortcode',
    'indemnity',
    'accountinfo'
  ]
  let nextstage = null
  stages.map((stage) => {
    if (
      !nextstage &&
      (!profile_stage[stage] || profile_stage[stage] === 'false')
    )
      nextstage = stage
  })
  if (!nextstage) nextstage = 'dashboard'
  return { percent_complete, profile_stage, nextstage }
}
export const register_partner = async (data) => {
  const errors = []
  let status = false
  const response = await axios(
    'https://amazonpartner.com.ng/amazon/public/api/v1/auth/register',
    {
      method: 'POST',
      headers: {
        apikey: 't7286gyfe987ffey87*Zzzht45334DSWTU'
      },
      data: data
    }
  ).catch(({ message, response }) => {
    if (response) {
      const {
        data: { data }
      } = response
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
      }
    } else {
      errors.push(message)
    }
  })
  if (response) {
    const {
      data: { data, success }
    } = response
    if (success) {
      status = true
    } else {
      errors.push('Something went wrong')
    }
  }
  return { success: status, data, errors }
}
