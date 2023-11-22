import { apiURL } from "@/app/modules/constants";

const NOTIFICATION_BASE = "http://" + process.env.NEXT_PUBLIC_NOTIFICATION_IP + "/api/"; 

export const EndPointHeaders = {
  apikey: `${process.env.APIKEY}`,
  "Content-Type": "application/json",
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

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

  GET_NOTIFICATIONS: `/api/next/users/notifications`,
  
};

const RemoteEndpoints = {
  LOGIN: `${apiURL}/v2/auth/login`,
  ACCEPT_AUTH0_OTP: `${apiURL}/v2/auth/accept-otp`,
  RESEND_AUTH0_OTP: `${apiURL}/v2/auth/resend-otp`,
  LOGOUT: `${apiURL}/v2/auth/logout`,
  LOGIN_ADMIN: `${apiURL}/v2/admin/login`,
  LOGOUT_ADMIN: `${apiURL}/v2/admin/logout`,
  AUTH_USER: `${apiURL}/v2/auth/authenticated-user`,
  GET_USER_INFO_VALIDATED: `${apiURL}/v2/auth/partner-info/validate`,
  WELCOMEBACK: `${apiURL}/v2/existing-partner/welcome-back`,
  USERINFO: `${apiURL}/v2/auth/register/userinfo`,
  RESETPASSWORD: `${apiURL}/v2/auth/reset-password/new-password`,
  RESEND_CONFIRM_EMAIL_LINK: `${apiURL}/v2/auth/register/resend-email-confirmation-link`,
  CHECK_EMAIL_VERIFICATION_LINK: `${apiURL}/v2/auth/check-email-verification-link`,
  CATEGORIES: `${apiURL}/v2/categories`,
  DESIGNATION: `${apiURL}/v2/your-roles`,
  SINGLE_PARNER: `${apiURL}/v2/auth/partner-info`,
  // onboarding
  CATEGORY: `${apiURL}/v2/auth/register/category`,
  COMPANYDETAIL: `${apiURL}/v2/auth/register/companydetail`,

  GET_BOARD_RESOLUTION_DOCS: `${apiURL}/v2/admin/board-resolution-documents`,
  GET_ALL_SIGNED_CONTRACTS: `${apiURL}/v2/admin/get-all-signed-contracts?partner_uuid=:partner_uuid`,
  PARTNER_GET_ALL_CONTRACTS: `${apiURL}/v2/contract/get-partner-contracts/:partner_uuid`,

  //these ones would be changed to v2 later
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
  ADMIN_PARTNETINFO: `${apiURL}/v2/admin/partner-info`,
  REJECTION_RESONS: `${apiURL}/v2/admin/rejection-reasons`,
  COMPLIANCE_APPROVE: `${apiURL}/v2/admin/compliance/approve`,
  PARTNER_UPDATE: `${apiURL}/v2/admin/compliance/partner-correction`,
  PARTNER_FILE_UPDATE: `${apiURL}/v2/file/compliance/partner-correction/file-upload`,
  FAQ: `${apiURL}/v2/faq/get-faq`,


  //Notifications
  GET_ALL_NOTIFICATIONS: `${NOTIFICATION_BASE}notifications/:partner-portal-uuid/:user-uuid`,
  GET_UNREAD_NOTIFICATIONS: `${NOTIFICATION_BASE}notifications/unread/:partner-portal-uuid/:user-uuid`,
  MARK_NOTIFICATION_READ: `${NOTIFICATION_BASE}notification/read/:notification-uuid/:user-uuid`,
  ARCHIVE_NOTIFICATION: `${NOTIFICATION_BASE}notification/archive/:notification-uuid/:user-uuid`,
  MARK_NOTIFICATION_UNREAD: `${NOTIFICATION_BASE}notification/unread/:notification-uuid/:user-uuid`,
  UNARCHIVE_NOTIFICATION: `${NOTIFICATION_BASE}notification/unarchive/:notification-uuid/:user-uuid`,

  ALL_ADMINS: `${apiURL}/v2/admin/admin-users`,
  ALL_ADMIN_ROLES: `${apiURL}/v2/admin/portal-user-roles/admin`,
  ALL_ADMIN_PRIVILEGES: `${apiURL}/v2/admin/portal-privileges/admin`,
  ALL_DEPARTMENTS: `${apiURL}/v2/admin/admin-departments`,
  CREATE_ADMIN: `${apiURL}/v2/admin/add-admin-user`,
  DELETE_ADMIN: `${apiURL}/v2/admin/delete-admin-user`,
  CREATE_ROLE: `${apiURL}/v2/admin/create-role`,
  DELETE_ROLE: `${apiURL}/v2/admin/delete-role`,

  GET_RESOLUTION_DOCUMENTS: `${apiURL}/v2/admin/board-resolution-documents`,
  CORRECTED_RESOLUTION_DOCUMENTS: `${apiURL}/v2/partner-user/correct-board-resolution-document`,
  APPROVE_REJECT_BRD: `${apiURL}/v2/admin/board-resolution-documents/approve-or-reject`,
  ALL_ADMIN_PARTNERS: `${apiURL}/v2/partner-user/partner-admin-users/:partner-uuid`,
  ALL_PARTNER_ROLES: `${apiURL}/v2/partner-user/partner-user-roles`,
  ALL_PARTNER_PRIVILEGES: `${apiURL}/v2/partner-user/partner-user-role-privileges`,
  CREATE_PARTNER: `${apiURL}/v2/partner-user/add-partner-user`,
  DELETE_PARTNER: `${apiURL}/v2/partner-user/delete-partner-user`,
  SET_UP_PASSWORD: `${apiURL}/v2/partner-user/setup-password`,

  GET_SERVICES: `${apiURL}/v2/contract/service-types`,
  SELECT_SERVICE: `${apiURL}/v2/contract/partner-selects-service-type`,
  SUBMIT_SIGNATORIES: `${apiURL}/v2/contract/select-who-signs-contract`,
  SIGN_CONTRACT: `${apiURL}/v2/contract/sign-contract`,
  CONTRACT_DYNAMIC_CONTENT: `${apiURL}/v2/contract/get-dynamic-content-for-contract/:partner_uuid`, 
  DOWNLOAD_CONTRACT: `${apiURL}/v2/contract/download-contract-pdf/:partner_uuid/:contract_id/:type`,
  GET_ALL_CONTRACTS: `${apiURL}/v2/admin/get-all-signed-contracts`,
  GET_CONTRACT_BEING_SIGNED: `${apiURL}/v2/partner-contract-currently-being-signed/:partner_uuid`,
  
  VERIFY_PARTNER_LINK: `${apiURL}/v2/partner-user/check-link-token/:link`,


//Admin Reports
  PARTNER_STATISTICS: `${apiURL}/v2/reporting/dashboard-stats`,
  PARTNER_LIST: `${apiURL}/v2/reporting/partner-reports`,
  PORTAL_VISITOR_CONTACT_SUBJECTS: `${apiURL}/v2/contact-us/get-contact-subjects/portal_visitor`,
  PORTAL_PARTNER_CONTACT_SUBJECTS: `${apiURL}/v2/contact-us/get-contact-subjects/logged_in_partner`,
  PARTNER_PORTAL_CONTACT_MAIL:`${apiURL}/v2/contact-us/send-contact-message`,
  UPDATE_ADMIN_USER_ROLE:`${apiURL}/v2/admin/update-admin-user-role`,

  //questionnaire
  GET_QUESTIONNAIRE: `${apiURL}/v2/questionnaire/get-questionnaire`,
  SEND_QUESTIONNAIRE: `${apiURL}/v2/questionnaire/submit-answered-questionnaire`,
  GET_QUESTIONNAIRE_STATUS: `${apiURL}/v2/questionnaire/get-partner-questionnaire-status/:partner-uuid`,
  GET_ALL_QUESTIONNAIRE_RESPONSE: `${apiURL}/v2/admin/get-all-answered-questionnaire`,
  APPROVE_REJECT_QUESTIONNAIRE: `${apiURL}/v2/admin/approve-reject-questionnaire`,

//service integration
  DSM_ENDPOINT: `/dashboard/dsm`,

//Grace Period
  PARTNER_LICENSE_VALIDITY_REMAINDER: `${apiURL}/v2/contract/license/get-license-validity-remainder/`,
  PARTNER_LICENSE_GRACE_PERIOD_STATUS: `${apiURL}/v2/contract/license/get-partner-license-grace-period-status/`,
  SUBMIT_LICENSE_GRACE_PERIOD_REQUEST: `${apiURL}/v2/contract/license/submit-license-grace-period-request`,

  //Revenue share
  GET_ALL_REVENUE_SHARE: `${apiURL}/v2/admin/get-all-revenue-share-request`,
  APPROVE_REVENUE_SHARE: `${apiURL}/v2/admin/approve-revenue-share-request`,

  GET_ALL_SHORTCODES: `${apiURL}/v2/contract/get-partner-shortcodes/:partner-uuid`,
  REQUEST_CHANGE: `${apiURL}/v2/contract/change-order/submit-change-order-request`,
  GET_CHANGE_ORDER_STATUS: `${apiURL}/v2/contract/change-order/get-partner-change-order-status/:partner-uuid`,
  GET_ALL_CHANGE_ORDER_REQUESTS: `${apiURL}/v2/admin/get-all-change-order-request`,
  APPROVE_OR_REJECT_CHANGE_ORDER: `${apiURL}/v2/admin/approve-change-order-request`,

  GET_ALL_LICENSE_GRACE_PERIOD_REQUEST: `${apiURL}/v2/admin/get-all-license-grace-period-request`,
  APPROVE_REJECT_LICENSE_GRACE_PERIOD_REQUEST: `${apiURL}/v2/admin/approve-reject-license-grace-period-request`,
  CHECK_PARTNER_LICENSE_EXPIRATION: `${apiURL}/v2/contract/license/check-partner-license-expiration/`,
  SUBMIT_LICENSE_RENEWAL_REQUEST: `${apiURL}/v2/contract/license/submit-license-renewal-request`,
}
export default RemoteEndpoints
