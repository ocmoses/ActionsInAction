import Validation from "./Validation"
import { fetchData } from "@/app/modules/fetchData"
import { apiURL } from "@/app/modules/constants"
/**
 *! Email verification email for New partner url
 * https//......com/onboarding/validate/{partnerid}/userinfo // for new partner onboarding
 * https//......com/onboarding/validate/{partnerid}/setpassword //? for existing partner onboarding
 */
const getPartner = async (partnerId) => {
  return await fetchData(`${apiURL}/v1/auth/partner-info/${partnerId}`, {
    cache: "no-store",
  })
}
export default async function ValidationPage({ params: { validator } }) {
  const partnerquery = {}
  if (!validator) {
    partnerquery.error = "Invalid URL"
  }
  console.log(validator[0])
  const result = await getPartner(validator[0])
  partnerquery.success = result.success
  partnerquery.error = result.error
  partnerquery.data = result.data
  console.log("data", partnerquery.data)

  const path = validator && validator[1] ? validator[1] : "userinfo"
  return <Validation partnerquery={partnerquery} path={path} />
}
