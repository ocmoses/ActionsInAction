import Validation from "./Validation"

/**
 *! Email verification email for New partner url
 * https//......com/onboarding/validate/{user_uuid}/userinfo // for new partner onboarding
 * https//......com/onboarding/validate/{user_uuid}/setpassword //? for existing partner onboarding
 */

export default async function ValidationPage({ params: { param } }) {
  const user_uuid = param && param[0] ? param[0] : null
  const type = param && param[1] ? param[1] : null
  return <Validation params={{ user_uuid, type }} />
}
