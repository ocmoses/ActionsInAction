import Validation from "./Validation"
/**
 *! Email verification email for New partner url
 * https//......com/onboarding/validate/{user_uuid}/userinfo // for new partner onboarding
 * https//......com/onboarding/validate/{user_uuid}/setpassword //? for existing partner onboarding
 */

export default async function ValidationPage({ params: { param } }) {
  return <Validation param={param} />
}
