import { apiURL } from "@/app/modules/constants"

export const EndPointHeaders = {
  apikey: `${process.env.APIKEY}`,
  "Content-Type": "application/json",
  redirect: "follow",
  referrerPolicy: "no-referrer",
}
export const NextEndPoints = {
  LOGIN: "/api/next/users/login",
  LOGOUT: "/api/next/users/logout",
  VALIDATE_USER: "/api/next/users/validate_user",
  SETPASSWORD: "/api/next/users/reset-password",
  EMAIL_VALIDATOR: "/api/next/external/mailvalidator",
  TIN_CHECK: "/api/next/external/tin",
  CAC_CHECK: "/api/next/external/cac",
  LOGIN_ADMIN: "/api/next/users/login-admin",
  LOGOUT_ADMIN: "/api/next/users/logout-admin",
  AUTH_USER: "/api/next/users/auth-admin",
  AUTH_ADMIN: "/api/next/users/auth-admin",
}

const RemoteEndpoints = {
  LOGIN: `${apiURL}/v1/auth/login`,
  LOGOUT: `${apiURL}/v1/auth/logout`,
  LOGIN_ADMIN: `${apiURL}/v2/admin/login`,
  LOGOUT_ADMIN: `${apiURL}/v2/admin/logout`,
  AUTH_USER: `${apiURL}/v1/auth/authenticated-user`,
  GET_USER_INFO_VALIDATED: `${apiURL}/v1/auth/partner-info/validate`,
  WELCOMEBACK: `${apiURL}/v1/existing-partner/welcome-back`,
  USERINFO: `${apiURL}/v1/auth/register/userinfo`,
  RESETPASSWORD: `${apiURL}/v1/auth/reset-password/new-password`,
  RESEND_CONFIRM_EMAIL_LINK: `${apiURL}/v1/auth/register/resend-email-confirmation-link`,
  CHECK_EMAIL_VERIFICATION_LINK: `${apiURL}/v1/auth/check-email-verification-link`,
  CATEGORIES: `${apiURL}/v1/categories`,
  DESIGNATION: `${apiURL}/v1/your-roles`,
  SINGLE_PARNER: `${apiURL}/v1/auth/partner-info`,
  // onboarding
  CATEGORY: `${apiURL}/v1/auth/register/category`,
  COMPANYDETAIL: `${apiURL}/v1/auth/register/companydetail`,
  COMPLIANCE: `${apiURL}/v1/auth/register/compliance`,
  NCCLICENSE: `${apiURL}/v1/auth/register/ncclicense`,
  NLRCLICENSE: `${apiURL}/v1/auth/register/nlrclicense`,
  SHORTCODE: `${apiURL}/v1/auth/register/shortcode`,
  INDEMNITY: `${apiURL}/v1/auth/register/indemnity`,
  ACCOUNTINFO: `${apiURL}/v1/auth/register/accountinfo`,
  // version 2
  REGISTRATION_COMPLETION: `${apiURL}/v2/notification/new-partner-category`,
  START_CONTRACT: `${apiURL}/v2/notification/partner-start-contract-notification`,
  ALL_PARTNERS: `${apiURL}/v2/admin/partners`,
  ADMIN_AUTH_USER: `${apiURL}/v2/admin/authenticated-admin`,
}
export default RemoteEndpoints
