import { apiURL } from "@/app/modules/constants"

export const EndPointHeaders = {
  apikey: `${process.env.APIKEY}`,
  "Content-Type": "application/json",
  redirect: "follow",
  referrerPolicy: "no-referrer",
}
export const NextEndPoints = {
  LOGIN: "/api/users/login",
  VALIDATE_USER: "/api/users/validate_user",
  SETPASSWORD: "/api/users/reset-password",
}

const RemoteEndpoints = {
  LOGIN: `${apiURL}/v1/auth/login`,
  AUTH_USER: `${apiURL}/v1/auth/authenticated-user`,
  GET_USER_INFO_VALIDATED: `${apiURL}/v1/auth/partner-info/validate`,
  WELCOMEBACK: `${apiURL}/v1/existing-partner/welcome-back`,
  USERINFO: `${apiURL}/v1/auth/register/userinfo`,
  RESETPASSWORD: `${apiURL}/v1/auth/reset-password/new-password`,
  RESEND_CONFIRM_EMAIL_LINK: `${apiURL}/v1/auth/register/resend-email-confirmation-link`,
  CHECK_EMAIL_VERIFICATION_LINK: `${apiURL}/v1/auth/check-email-verification-link`,
  CATEGORIES: `${apiURL}/v1/categories`,
  DESIGNATION: `${apiURL}/v1/your-roles`,
  SINGLE_PARNER: `${apiURL}/v1/auth/partner-info/`,
  // onboarding
  CATEGORY: `${apiURL}/v1/auth/register/category`,
  COMPANYDETAIL: `${apiURL}/v1/auth/register/companydetail`,
  COMPLIANCE: `${apiURL}/v1/auth/register/compliance`,
  NCCLICENSE: `${apiURL}/v1/auth/register/ncclicense`,
  NLRCLICENSE: `${apiURL}/v1/auth/register/nlrclicense`,
  SHORTCODE: `${apiURL}/v1/auth/register/shortcode`,
  INDEMNITY: `${apiURL}/v1/auth/register/indemnity`,
  ACCOUNTINFO: `${apiURL}/v1/auth/register/accountinfo`,
}
export default RemoteEndpoints
