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
}

const RemoteEndpoints = {
  LOGIN: `${apiURL}/v1/auth/login`,
  GET_USER_INFO_VALIDATED: `${apiURL}/v1/auth/partner-info/validate`,
  WELCOMEBACK: `${apiURL}/v1/existing-partner/welcome-back`,
  USERINFO: `${apiURL}/v1/auth/register/userinfo`,
  RESETPASSWORD: `${apiURL}/v1/auth/reset-password/new-password`,
  RESEND_CONFIRM_EMAIL_LINK: `${apiURL}/v1/auth/register/resend-email-confirmation-link`,
  CHECK_EMAIL_VERIFICATION_LINK: `${apiURL}/v1/auth/check-email-verification-link`,
}
export default RemoteEndpoints
