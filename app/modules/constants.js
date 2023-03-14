import {
  AccountinfoIcon,
  CompanyDetailIcon,
  ComplianceIcon,
  IndemnityIcon,
  NccLicenseIcon,
  ShortcodeIcon,
  ReviewIcon,
  ContactPersonIcon,
} from "@/app/components/Icons"

export const persistStore = true

export const EmailType = {
  EXISTING: "existing",
  NEW: "new",
}
const environment = {
  INHOUSE: "https://amazonpartner.com.ng/amazon/public/api",
  DEV: "http://10.1.29.122/api",
  STAGING: "http://10.1.44.40/api",
}
export const apiURL = environment.INHOUSE

export const partnerFields = {
  partnerid: "",

  // userinfo
  first_name: "",
  last_name: "",
  email: "",
  countrycode: "234",
  telephone: "",
  password: "",
  password_confirmed: "",

  //  companyinfo
  company_name: "",
  company_role: "",

  // category
  category_id: [],

  // companyinfo
  company_name: "",
  country: "NG",
  company_address: "",
  company_city: "",
  company_state: "",
  company_postcode: "",

  // compliance
  rc_no: "",
  tin_no: "",
  tin_doc: "",
  memart_doc: "",
  cac_doc: "",

  // ncclicense
  vas_license_id: "",
  ncc_issue_date: "",
  ncc_expiry_date: "",
  ncc_doc: "",

  // nlrclicense
  nlrc_license_id: "",
  nlrc_issue_date: "",
  nlrc_expiry_date: "",
  nlrc_doc: "",

  // shortcode
  shortcode: "",
  shortcode_issue_date: "",
  shortcode_expiry_date: "",
  shortcode_price_issue_date: "",
  shortcode_price_expiry_date: "",
  shortcode_doc: "",
  shortcode_approval_doc: "",

  // indemnity
  indemnity_no: "",
  indemnity_issue_date: "",
  indemnity_expiry_date: "",
  indemnity_doc: "",

  // accountinfo
  account_name: "",
  account_no: "",
  bank: "",
  audited_account_1: "",
  audited_account_2: "",
  audited_account_3: "",
  progress: {},
}
export const validities = {
  ncc: "5 years",
  nlrc_lottery: "10 years",
  nlrc_sport_betting: "5 years",
  nlrc_mobile_lottery: "5 years",
  shortcode: "1 years",
  shortcode_2: "2 years",
  shortcode_pricing: "1 years",
  shortcode_pricing_2: "2 years",
  indemnity: "1 years",
}
export const forms = {
  userinfo: {
    form: "userinfo",
    title: "Get started",
    label: "User profile",
    subtitle: "it'll only take a few minutes",
    hand: "👋",
    fields: {
      first_name: "First name",
      last_name: "Last name",
      company_name: "Company name",
      designation: "Designation",
      email: "Email",
      countrycode: "Country code",
      telephone: "Telephone",
      password: "Password",
      // password_confirmed: "Repeat password",
    },
    required: {
      first_name: "First name",
      last_name: "Last name",
      company_name: "Company name",
      email: "Email",
      countrycode: "Country code",
      telephone: "Telephone",
      designation: "Designation",
      password: "Password",
      // password_confirmed: "Repeat password",
    },
  },
  companyinfo: {
    form: "companyinfo",
    title: "Your company and role",
    label: "Company information",
    subtitle: "it'll only take a few minutes",
    hand: "",
    fields: { company_name: "Company name", company_role: "Company role" },
    required: { company_name: "Company name", company_role: "Company role" },
  },
  category: {
    form: "category",
    title: "Choose a service category",
    label: "Service category",
    subtitle: "You'll be able to add more later",
    hand: "",
    fields: { category_id: "Category ID" },
    required: { category_id: "Category ID" },
  },
  companydetail: {
    form: "companydetail",
    title: "Tell us a bit more about your organisation",
    label: "Company information",
    subtitle: "",
    hand: "",
    fields: {
      company_name: "Company name",
      country: "Country",
      company_address: "Company address",
      company_city: "Company city",
      company_state: "Company state",
      company_postcode: "Company postcode",
    },
    required: {
      company_name: "Company name",
      country: "Country",
      company_address: "Company address",
      company_city: "Company city",
      company_state: "Company state",
      company_postcode: "Company postcode",
    },
  },
  compliance: {
    form: "compliance",
    title: "Provide your company's compliance details",
    label: "Company compliance detail",
    subtitle: "",
    hand: "",
    fields: {
      rc_no: "RC Number",
      tin_no: "Tax identification number",
      tin_doc: "TIN Document",
      memart_doc: "Memart certificate",
      cac_doc: "CAC Registration Certificate",
    },
    required: {
      rc_no: "RC Number",
      tin_no: "Tax identification number",
      // tin_doc: 'TIN Document',
      // memart_doc: 'Memart certificate',
      // cac_doc: 'CAC Registration Certificate'
    },
  },
  ncclicense: {
    form: "ncclicense",
    title: "Provide your company's NCC license details",
    label: "NCC license detail",
    subtitle: "",
    hand: "",
    fields: {
      vas_license_id: "VAS License ID",
      ncc_issue_date: "Issuing date",
      ncc_expiry_date: "Expiry date",
      ncc_doc: "NCC VAS License",
    },
    required: {
      vas_license_id: "VAS License ID",
      ncc_issue_date: "Issuing date",
      ncc_expiry_date: "Expiry date",
      // vas_doc: 'NCC VAS License'
    },
    validity: "1 years",
  },
  nlrclicense: {
    form: "nlrclicense",
    title: "Provide your company's NLRC license details",
    label: "NLRC license detail",
    subtitle: "",
    hand: "",
    fields: {
      nlrc_license_id: "NLRC License ID",
      nlrc_issue_date: "Issuing date",
      nlrc_expiry_date: "Expiry date",
      nlrc_doc: "NLRC Document",
    },
    required: {
      nlrc_license_id: "NLRC License ID",
      nlrc_issue_date: "Issuing date",
      nlrc_expiry_date: "Expiry date",
      // nlrc_doc: 'NLRC Document'
    },
    validity: null,
  },
  shortcode: {
    form: "shortcode",
    title: "Provide your company's short code details",
    label: "Shortcode detail",
    subtitle: "",
    hand: "",
    fields: {
      shortcode: "Short code",
      shortcode_issue_date: "Issue date",
      shortcode_expiry_date: "Expiry date",
      shortcode_price_issue_date: "Princing Issue date",
      shortcode_price_expiry_date: "Pricing Expiry date",
      shortcode_doc: "Short code document",
      shortcode_approval_doc: "NCC Pricing approval",
    },
    required: {
      shortcode: "Short code",
      shortcode_issue_date: "Issue date",
      shortcode_expiry_date: "Expiry date",
      shortcode_price_issue_date: "Princing Issue date",
      shortcode_price_expiry_date: "Pricing Expiry date",
      // shortcode_doc: 'Short code document',
      // shortcode_approval_doc: 'NCC Pricing approval'
    },
    validity: null,
  },
  indemnity: {
    form: "indemnity",
    title: "Provide your company's indemnity insurance",
    label: "Indemnity insurance information",
    subtitle: "",
    hand: "",
    fields: {
      indemnity_no: "Professional indemnity insurance number",
      indemnity_issue_date: "Issuing date",
      indemnity_expiry_date: "Expiry date",
      indemnity_doc: "Professional indemnity insurance Document",
    },
    required: {
      indemnity_no: "Professional indemnity insurance number",
      indemnity_issue_date: "Issuing date",
      indemnity_expiry_date: "Expiry date",
      // indemnity_doc: 'Professional indemnity insurance Document'
    },
    validity: null,
  },
  accountinfo: {
    form: "accountinfo",
    title: "Provide your company’s audited accounts",
    label: "Company's audited accounts detail",
    subtitle: "",
    hand: "",
    fields: {
      account_name: "Account name",
      account_no: "Account number",
      bank: "Bank",
      audited_account_1: "Audited account 1",
      audited_account_2: "Audited account 2",
      audited_account_3: "Audited account 3",
    },
    required: {
      account_name: "Account name",
      account_no: "Account number",
      bank: "Bank",
      // audited_account_1: "Audited account 1",
      // audited_account_2: "Audited account 2",
      // audited_account_3: "Audited account 3",
    },
  },
  // EXISTING PARTNERS
  partnerwelcome: {
    form: "partnerwelcome",
    title: "Enter your email",
    label: "Enter your email",
    subtitle: "",
    hand: "👋",
    fields: {
      partnerid: "Email",
    },
    required: {
      partnerid: "Email",
    },
  },
  setpassword: {
    form: "setpassword",
    title: "Setup your password",
    subtitle: "",
    hand: "",
    fields: {
      password: "Password",
      // password_confirmed: "Repeat password",
    },
    required: {
      password: "Password",
      // password_confirmed: "Repeat password",
    },
  },
  confirmcompanyinfo: {
    form: "confirmcompanyinfo",
    title: "Confirm your company information",
    subtitle: "",
    hand: "",
    fields: {
      company_name: "Company name",
      country: "Country",
      company_address: "Company address",
      company_city: "Company city",
      company_state: "Company state",
      company_postcode: "Company postcode",
    },
    required: {
      company_name: "Company name",
      country: "Country",
      company_address: "Company address",
      company_city: "Company city",
      company_state: "Company state",
      company_postcode: "Company postcode",
    },
  },
  contactperson: {
    form: "contactperson",
    title: "Contact person",
    subtitle: "",
    hand: "",
    fields: {
      first_name: "First name",
      last_name: "Last name",
      email: "Email",
      countrycode: "Country code",
      telephone: "Telephone",
    },
    required: {
      first_name: "First name",
      last_name: "Last name",
      email: "Email",
      countrycode: "Country code",
      telephone: "Telephone",
    },
  },
  updatereview: {
    form: "updatereview",
    title: "Review your details",
    subtitle: "",
    hand: "",
  },
  review: {
    form: "review",
    title: "Review your application",
    subtitle: "",
    hand: "",
  },
}
const fieldNames = {
  userinfo: {
    first_name: "First name",
    last_name: "Last name",
    email: "Email",
    countrycode: "Country code",
    telephone: "Telephone",
    password: "Password",
    password_confirmed: "Repeat password",
  },
  companyinfo: {
    company_name: "Company name",
    company_role: "Company role",
  },
  category: {
    category_id: "Category ID",
  },
  companydetail: {
    company_name: "Company name",
    country: "Country",
    company_address: "Company address",
    company_city: "Company city",
    company_state: "Company state",
    company_postcode: "Company postcode",
  },
  compliance: {
    rc_no: "RC Number",
    tin_no: "Tax identification number",
    tin_doc: "TIN Document",
    memart_doc: "Memart certificate",
    cac_doc: "CAC Registration Certificate",
  },
  ncclicense: {
    vas_license_id: "VAS License ID",
    ncc_issue_date: "Issuing date",
    ncc_expiry_date: "Expiry date",
    ncc_doc: "NCC VAS License",
  },
  nlrclicense: {
    nlrc_license_id: "NLRC License ID",
    nlrc_issue_date: "Issuing date",
    nlrc_expiry_date: "Expiry date",
    nlrc_doc: "NLRC Document",
  },
  shortcode: {
    shortcode: "Short code",
    shortcode_issue_date: "Issue date",
    shortcode_expiry_date: "Expiry date",
    shortcode_price_issue_date: "Princing Issue date",
    shortcode_price_expiry_date: "Pricing Expiry date",
    shortcode_doc: "Short code document",
    shortcode_approval_doc: "NCC Pricing approval",
  },
  indemnity: {
    indemnity_no: "Professional indemnity insurance number",
    indemnity_issue_date: "Issuing date",
    indemnity_expiry_date: "Expiry date",
    indemnity_doc: "Professional indemnity insurance Document",
  },
  accountinfo: {
    account_name: "Account name",
    account_no: "Account number",
    bank: "Bank",
    audited_account_1: "Audited account 1",
    audited_account_2: "Audited account 2",
    audited_account_3: "Audited account 3",
  },
}
export const profileMenu = [
  "companydetail",
  "compliance",
  "ncclicense",
  "nlrclicense",
  "shortcode",
  "indemnity",
  "accountinfo",
  "review",
]
export const updateMenu = [
  "confirmcompanyinfo",
  "contactperson",
  "updatereview",
]
export const profileMenuIcons = {
  companydetail: {
    component: <CompanyDetailIcon />,
    title: "Company Info",
  },

  compliance: {
    compliance: <ComplianceIcon />,
    title: "Compliance",
  },
  ncclicense: {
    component: <NccLicenseIcon />,
    title: "NCC Licence",
  },
  nlrclicense: {
    component: <NccLicenseIcon />,
    title: "NLRC Licence",
  },
  shortcode: {
    component: <ShortcodeIcon />,
    title: "Shortcode",
  },
  indemnity: {
    component: <IndemnityIcon />,
    title: "Indemnity",
  },
  accountinfo: {
    component: <AccountinfoIcon />,
    title: "Account Info",
  },
  // Update menu
  confirmcompanyinfo: {
    component: <CompanyDetailIcon />,
    title: "Company Info",
  },
  contactperson: {
    component: <ContactPersonIcon />,
    title: "Contact Person",
  },
  review: {
    component: <ReviewIcon />,
    title: "Review & Submit",
  },
  updatereview: {
    component: <ReviewIcon />,
    title: "Review & Submit",
  },
}
export const roles = [
  {
    slug: "",
    title: "-",
    priviledges: [],
  },
  {
    slug: "md",
    title: "Managing Director",
  },
  {
    slug: "ed",
    title: "Executive Director",
  },
  {
    slug: "General Manager",
    title: "generat-manager",
  },
  {
    slug: "Procurement Manager",
    title: "procurement-anager",
  },
]
