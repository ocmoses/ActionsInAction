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
export const categoryCombination = [
  ["VAS", "RMS"],
  ["VAS", "MKP"],
  ["RMS", "MKP"],
  ["AGR", "MKP"],
]
export const company_type = [
  {
    value: "co",
    label: "Limited Company",
  },

  { value: "bn", label: "Business Name" },
  {
    value: "it",
    label: "Incorporated Trustee",
  },
]
export const license_type = [
  {
    value: "National lottery",
    label: "National lottery",
    description: "General lottery licence",
  },

  {
    value: "Mobile lottery/gaming",
    label: "Mobile lottery/gaming",
    description: "SMS, USSD, Mobile apps",
  },
  {
    value: "Sports betting permit",
    label: "Sports betting permit",
    description: "For sports betting service providers",
  },
  {
    value: "Promotional lottery(CSPS)",
    label: "Promotional lottery(CSPS)",
    description: "Promotional scheme with an element of chance",
  },
]
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
      company_type: "Company type",
    },
    required: {
      rc_no: "RC Number",
      tin_no: "Tax identification number",
      company_type: "Company type",
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
      // ncc_doc: 'NCC VAS License'
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
    },
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
      shortcode_pricing_doc: "NCC Pricing approval",
    },
    required: {
      shortcode: "Short code",
      shortcode_issue_date: "Issue date",
      shortcode_expiry_date: "Expiry date",
      shortcode_price_issue_date: "Princing Issue date",
      shortcode_price_expiry_date: "Pricing Expiry date",
    },
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
export const complianceRequirements = {
  companydetail: {
    company_name: {
      title: "Company name",
      categories: ["VAS", "RMS", "AGR", "MKP"],
    },
    country: {
      title: "Country",
      categories: ["VAS", "RMS", "AGR", "MKP"],
    },
    company_address: {
      title: "Company address",
      categories: ["VAS", "RMS", "AGR", "MKP"],
    },
    company_city: {
      title: "Company city",
      categories: ["VAS", "RMS", "AGR", "MKP"],
    },
    company_state: {
      title: "Company state",
      categories: ["VAS", "RMS", "AGR", "MKP"],
    },
    company_postcode: {
      title: "Company postcode",
      categories: [],
    },
  },
  compliance: {
    rc_no: {
      title: "RC Number",
      categories: ["VAS", "RMS", "AGR", "MKP"],
    },
    tin_no: {
      title: "Tax identification number",
      categories: ["VAS", "RMS", "AGR", "MKP"],
    },
    company_type: {
      title: "Company type",
      categories: ["VAS", "RMS", "AGR", "MKP"],
    },
    tin_doc: {
      title: "TIN Document",
      categories: ["VAS", "RMS", "AGR", "MKP"],
    },
    memart_doc: {
      title: "Memart certificate",
      categories: ["VAS", "RMS", "AGR", "MKP"],
    },
    cac_doc: {
      title: "CAC Registration Certificate",
      categories: ["VAS", "RMS", "AGR", "MKP"],
    },
  },
  ncclicense: {
    vas_license_id: {
      title: "VAS License ID",
      categories: ["VAS", "RMS", "AGR"],
    },
    ncc_issue_date: {
      title: "Issuing date",
      categories: ["VAS", "RMS", "AGR"],
    },
    ncc_expiry_date: {
      title: "Expiry date",
      categories: ["VAS", "RMS", "AGR"],
    },
    ncc_doc: {
      title: "NCC VAS License document",
      categories: ["VAS", "RMS", "AGR"],
    },
  },
  nlrclicense: {
    nlrc_license_id: {
      title: "NLRC License ID",
      categories: ["AGR"],
    },
    nlrc_issue_date: {
      title: "Issuing date",
      categories: ["AGR"],
    },
    nlrc_expiry_date: {
      title: "Expiry date",
      categories: ["AGR"],
    },
    nlrc_doc: {
      title: "NLRC Document",
      categories: ["AGR"],
    },
  },
  shortcode: {
    shortcode_doc: {
      title: "Short code document",
      categories: ["VAS", "AGR"],
    },
    shortcode: {
      title: "Short code",
      categories: ["VAS", "RMS", "AGR"],
    },
    shortcode_issue_date: {
      title: "Issue date",
      categories: ["VAS", "AGR"],
    },
    shortcode_expiry_date: {
      title: "Expiry date",
      categories: ["VAS", "AGR"],
    },

    shortcode_price_issue_date: {
      title: "Princing Issue date",
      categories: ["VAS", "RMS", "AGR"],
    },
    shortcode_price_expiry_date: {
      title: "Pricing Expiry date",
      categories: ["VAS", "RMS", "AGR"],
    },
    shortcode_pricing_doc: {
      title: "NCC Pricing approval",
      categories: ["VAS", "RMS", "AGR"],
    },
  },
  indemnity: {
    indemnity_no: {
      title: "Professional indemnity insurance number",
      categories: ["VAS", "RMS", "AGR"],
    },
    indemnity_issue_date: {
      title: "Issuing date",
      categories: ["VAS", "RMS", "AGR"],
    },
    indemnity_expiry_date: {
      title: "Expiry date",
      categories: ["VAS", "RMS", "AGR"],
    },
    indemnity_doc: {
      title: "Professional indemnity insurance Document",
      categories: ["VAS", "RMS", "AGR"],
    },
  },
  accountinfo: {
    audited_account_1_doc: {
      title: "Audited account 1",
      categories: ["VAS", "RMS", "AGR"],
    },
    audited_account_2_doc: {
      title: "Audited account 2",
      categories: ["VAS", "RMS", "AGR"],
    },
    audited_account_3_doc: {
      title: "Audited account 3",
      categories: ["VAS", "RMS", "AGR"],
    },
    job_evidence_doc: {
      title: "Evidence of 3 Jobs done",
      categories: ["VAS", "RMS", "AGR"],
    },
  },
}
export const profileMenu = [
  "compliance",
  "companydetail",
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
