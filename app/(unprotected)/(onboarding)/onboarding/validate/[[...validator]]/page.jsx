import RegisterValidation from "./RegisterValidation"
import { fetchData } from "@/app/modules/fetchData"
import { apiURL } from "@/app/modules/constants"
/**
 *! Email verification email for New partner url
 * https//......com/onboarding/validate/{partnerid}/category // for new partner onboarding
 * https//......com/onboarding/validate/{partnerid}/profile //? for existing partner onboarding
 */
const getPartner = async (partnerId) => {
  return await fetchData(`${apiURL}/v1/auth/partner-info/${partnerId}`, {
    cache: "no-store",
  })
}
export default async function RegisterValidationPage({
  params: { validator },
}) {
  const partnerquery = {}
  if (!validator) {
    partnerquery.error = "Invalid URL"
  }
  const result = await getPartner(validator[0])
  partnerquery.success = result.success
  partnerquery.error = result.error
  partnerquery.data = result.data
  console.log("data", partnerquery.data)

  const path = validator && validator[1] ? validator[1] : "category"
  return <RegisterValidation partnerquery={partnerquery} path={path} />
}
