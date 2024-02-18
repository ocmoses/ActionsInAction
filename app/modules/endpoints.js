import { apiURL } from "@/app/modules/constants";

const NOTIFICATION_BASE =
  "https://" + process.env.NEXT_PUBLIC_NOTIFICATION_IP + "/api/";

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
  COMPLIANCE: `${apiURL}/v2/auth/register/compliance`,
  NCCLICENSE: `${apiURL}/v2/auth/register/ncclicense`,
  NLRCLICENSE: `${apiURL}/v2/auth/register/nlrclicense`,
  SHORTCODE: `${apiURL}/v2/auth/register/shortcode`,
  INDEMNITY: `${apiURL}/v2/auth/register/indemnity`,
  ACCOUNTINFO: `${apiURL}/v2/auth/register/accountinfo`,
  SKIPSTAGE: `${apiURL}/v2/auth/register/skip-onboarding-stage`,
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
  CONTRACT_DYNAMIC_CONTENT: `${apiURL}/v2/contract/get-dynamic-content-for-contract/:partner_uuid/:contract_id`,
  DOWNLOAD_CONTRACT: `${apiURL}/v2/contract/download-contract-pdf/:partner_uuid/:contract_id/:type`,
  GET_ALL_CONTRACTS: `${apiURL}/v2/admin/get-all-signed-contracts`,
  GET_CONTRACT_BEING_SIGNED: `${apiURL}/v2/contract/partner-contract-currently-being-signed/:partner_uuid`,
  VERIFY_PARTNER_LINK: `${apiURL}/v2/partner-user/check-link-token/:link`,
  GET_SERVICE_TYPES: `${apiURL}/v2/contract/service-types`,

  //Admin Reports
  PARTNER_STATISTICS: `${apiURL}/v2/reporting/dashboard-stats`,
  PARTNER_LIST: `${apiURL}/v2/reporting/partner-reports`,
  PORTAL_VISITOR_CONTACT_SUBJECTS: `${apiURL}/v2/contact-us/get-contact-subjects/portal_visitor`,
  PORTAL_PARTNER_CONTACT_SUBJECTS: `${apiURL}/v2/contact-us/get-contact-subjects/logged_in_partner`,
  PARTNER_PORTAL_CONTACT_MAIL: `${apiURL}/v2/contact-us/send-contact-message`,
  UPDATE_ADMIN_USER_ROLE: `${apiURL}/v2/admin/update-admin-user-role`,

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

  //change order
  GET_ALL_SHORTCODES: `${apiURL}/v2/contract/get-partner-shortcodes/:partner-uuid`,
  REQUEST_CHANGE: `${apiURL}/v2/contract/change-order/submit-change-order-request`,
  GET_CHANGE_ORDER_STATUS: `${apiURL}/v2/contract/change-order/get-partner-change-order-status/:partner-uuid`,
  GET_ALL_CHANGE_ORDER_REQUESTS: `${apiURL}/v2/admin/get-all-change-order-request`,
  APPROVE_OR_REJECT_CHANGE_ORDER: `${apiURL}/v2/admin/approve-change-order-request`,
  GET_ALL_IP_REQUESTS: `${apiURL}/v2/admin/get-all-ip-request`,

  //IP
  GET_IP_STATUS: `${apiURL}/v2/ip/get-submitted-ip-details-of-partner/:partner_uuid`,
  GET_IP_COMPLETION_PERCENTAGE: `${apiURL}/v2/ip/get-partner-ip-progress-percentage/:partner_uuid`,
  SUBMIT_SERVICE_DETAILS: `${apiURL}/v2/ip/submit-service-details`,
  IP_FILE_UPLOAD: `${apiURL}/v2/ip/ip-file-upload`,
  SUBMIT_IP_DETAILS: `${apiURL}/v2/ip/submit-ip-details`,
  APPROVE_REJECT_IP_DETAILS: `${apiURL}/v2/admin/approve-ip-request`,
  ADD_DYNAMIC_FIELD: `${apiURL}/v2/admin/add-dynamic-field-to-ip`,
  REMOVE_DYNAMIC_FIELD: `${apiURL}/v2/admin/remove-ip-dynamic-field`,
  CHECK_FOR_DYNAMIC_FIELD: `${apiURL}/v2/ip/check-if-partner-has-dynamic-ip-request/:partner_uuid`,
  GET_PARTNER_DYNAMIC_FIELD: `${apiURL}/v2/admin/get-partner-dynamic-ip-request/:partner_uuid`,
  UPLOAD_DYNAMIC_FIELD: `${apiURL}/v2/ip/submit-into-dynamic-field`,
  APPROVE_REJECT_DYNAMIC_FIELD: `${apiURL}/v2/admin/approve-dynamic-ip-request`,

  GET_ALL_LICENSE_GRACE_PERIOD_REQUEST: `${apiURL}/v2/admin/get-all-license-grace-period-request`,
  APPROVE_REJECT_LICENSE_GRACE_PERIOD_REQUEST: `${apiURL}/v2/admin/approve-reject-license-grace-period-request`,
  CHECK_PARTNER_LICENSE_EXPIRATION: `${apiURL}/v2/contract/license/check-partner-license-expiration/`,
  SUBMIT_LICENSE_RENEWAL_REQUEST: `${apiURL}/v2/contract/license/submit-license-renewal-request`,

  ACCEPT_BILATERAL_ANNEXURES: `${apiURL}/v2/contract/accept-or-sign-contract-annexure`,
  GET_PARTNER_LICENSE_RENEWAL_STATUS: `${apiURL}/v2/contract/license/get-partner-license-renewal-status/`,
  GET_ALL_LICENSE_RENEWAL_REQUEST: `${apiURL}/v2/admin/get-all-license-renewal-request`,
  APPROVE_REJECT_LICENSE_RENEWAL_REQUEST: `${apiURL}/v2/admin/approve-reject-license-renewal-request`,
  GET_ALL_PARTNER_SHORTCODES: `${apiURL}/v2/admin/get-all-partner-shortcode/`,
  GET_SINGLE_PARTNER_SHORTCODE: `${apiURL}/v2/admin/get-single-partner-shortcode/`,
  APPROVE_SHORTCODE_ZERO_RATING: `${apiURL}/v2/admin/approve-shortcode-zero-rating`,
  GET_PARTNER_CONTRACT_CURRENTLY_RUNNING: `${apiURL}/v2/contract/get-partner-contract-currently-running/`,
  GET_PARTNER_CONTRACT_VALIDITY_REMAINDER: `${apiURL}/v2/contract/get-partner-contract-validity-remainder/`,

  PREVIEW_FILE: `${apiURL}/v2/file/preview-file?file=:file`,

  // VAS
  GET_VAS_TYPE: `${apiURL}/v2/vas-partner/vas-type`,
  GET_AGGREGATOR: `${apiURL}/v2/vas-partner/aggregators`,


  ////// AGGREGATOR REQUESTS
  GET_AGGREGATOR_REQUEST: `${apiURL}/v2/aggregator/requests`,
  SUBMIT_VAS_PARTNER: `${apiURL}/v2/vas-partner/request/submit`,
  GET_VAS_PARTNER_REQUEST: `${apiURL}/v2/vas-partner/requests`,
  CHANGE_AGGREGATOR: `${apiURL}/v2/vas-partner/request/change-aggregator`,


  APPROVE_VAS_PARTNERS: `${apiURL}/v2/aggregator/request/approve`,
  REJECT_VAS_PARTNERS: `${apiURL}/v2/aggregator/request/reject`,
  VAS_PERTNER_ONBOARDING_NCCLICENSE: `${apiURL}/v2/aggregator/vas-partner-onboarding/ncclicense`,
  GET_AGGREGATOR_VAS_PARTNERS_DETAILS:`${apiURL}/v2/aggregator/vas-partner-onboarding/get-vas-partner-onboarding-details`,
  VAS_PERTNER_ONBOARDING_NLRCLICENSE: `${apiURL}/v2/aggregator/vas-partner-onboarding/nlrclicense`,
  VAS_PERTNER_ONBOARDING_SHORTCODES: `${apiURL}/v2/aggregator/vas-partner-onboarding/shortcode`,
  VAS_PERTNER_FINAL_CATEGORY_SUBMISSION: `${apiURL}/v2/aggregator/vas-partner-onboarding/final-category-submission`,
  VAS_PERTNER_FINAL_COMPLIANCE_SUBMISSION: `${apiURL}/v2/aggregator/vas-partner-onboarding/final-submission-for-compliance`,
  GET_AGGREGATOR_REQUESTS:`${apiURL}/v2/admin/approved/requests`,
  GET_AGGREGATOR_REQUEST:`${apiURL}/v2/admin/approved/request`,
};
export default RemoteEndpoints;
