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

export const apiURL =
  typeof window === "undefined"
    ? process.env.APIURI
    : process.env.NEXT_PUBLIC_APIURI

export const apikey =
  typeof window === "undefined"
    ? process.env.APIKEY
    : process.env.NEXT_PUBLIC_APIKEY

export const onboarding_type = {
  new: "Registration",
  migrated: "Migration",
}

export const status_type = {
  processing: "Processing",
  not_started: "Pending",
}
export const statusOptions = [
  { value: "all", label: "All" },
  { value: "processing", label: "Processing" },
  { value: "not_started", label: "Pending" },
]
export const stages = [
  "companydetail",
  "compliance",
  "ncclicense",
  "nlrclicense",
  "shortcode",
  "indemnity",
  "accountinfo",
]
export const categoryCompletionPercentage = 100

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
export const departments = [
  { code: "SPRM", name: "SUPPLIER & RELATIONSHIP MANAGEMENT", approval: true },
  { code: "RICO", name: "RISK & COMPLIANCE", approval: true },
  { code: "LEGA", name: "LEGAL", approval: true },
  { code: "INSU", name: "INSURANCE", approval: true },
]
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
    shortname: "User profile",
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
      password_confirmed: "Password confirmation",
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
      password_confirmed: "Password confirmation",
    },
  },
  companydetail: {
    form: "companydetail",
    title: "Tell us a bit more about your organisation",
    label: "Company information",
    shortname: "Company information",
    subtitle: "",
    listdesc: "Company Name, Partner Type, Company Address, etc    ",
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
    shortname: "Company detail",
    subtitle: "",
    listdesc: "Company Reg. No, TIN No, CAC Reg Certificate, etc",
    hand: "",
    fields: {
      company_type: "Company type",
      rc_no: "RC Number",
      tin_no: "Tax identification number",
      tin_doc: "TIN Document",
      memart_doc: "Memart certificate",
      cac_doc: "CAC Registration Certificate",
      company_type: "Company type",
    },
    required: {
      company_type: "Company type",
      rc_no: "RC Number",
      tin_no: "Tax identification number",
      company_type: "Company type",
    },
  },
  ncclicense: {
    form: "ncclicense",
    title: "Provide your company's NCC license details",
    label: "NCC license detail",
    shortname: "VAC license",
    subtitle: "",
    listdesc: "VAS License Number, VAS License Issue Date, etc",
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
    shortname: "NLRC license",
    subtitle: "",
    listdesc:
      "License type, NLRC License ID, Issuing date, Expiry date, NLRC Document",
    hand: "",
    fields: {
      nlrc_license_type: "License type",
      nlrc_license_id: "NLRC License ID",
      nlrc_issue_date: "Issuing date",
      nlrc_expiry_date: "Expiry date",
      nlrc_doc: "NLRC Document",
    },
    required: {
      nlrc_license_type: "License type",
      nlrc_license_id: "NLRC License ID",
      nlrc_issue_date: "Issuing date",
      nlrc_expiry_date: "Expiry date",
    },
  },
  shortcode: {
    form: "shortcode",
    title: "Provide your company's short code details",
    label: "Shortcode detail",
    shortname: "Short codes",
    subtitle: "",
    listdesc: "Short Code Issue Date, NCC Pricing Approval Issue Date, etc",
    hand: "",
    fields: {
      shortcode: "Short code",
      shortcode_issue_date: "Issue date",
      shortcode_expiry_date: "Expiry date",
      shortcode_doc: "Short code document",
      pricing_issue_date: "Pricing Issue date",
      pricing_expiry_date: "Pricing Expiry date",
      pricing_doc: "NCC Pricing approval",
    },
    required: {
      shortcode: "Short code",
      shortcode_issue_date: "Issue date",
      shortcode_expiry_date: "Expiry date",
      pricing_issue_date: "Pricing Issue date",
      pricing_expiry_date: "Pricing Expiry date",
    },
  },
  indemnity: {
    form: "indemnity",
    title: "Provide your company's indemnity insurance",
    label: "Indemnity insurance information",
    shortname: "Insurance",
    subtitle: "",
    listdesc:
      "Indemnity insurance number, Issuing date, Expiry date, Insurance Document",
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
    shortname: "Audited accounts",
    subtitle: "",
    listdesc: "Compny's Audited account, Evidence of job done",
    hand: "",
    fields: {
      account_name: "Account name",
      account_no: "Account number",
      bank: "Bank",
      audited_account_1_doc: "Audited account 1",
      audited_account_2_doc: "Audited account 2",
      audited_account_3_doc: "Audited account 3",
      job_evidence_doc: "Evidence of job done",
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
    listdesc: "",
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
    listdesc: "",
    hand: "",
    fields: {
      password: "Password",
      password_confirmed: "Password confirmation",
    },
    required: {
      password: "Password",
      password_confirmed: "Password confirmation",
    },
  },
  confirmcompanyinfo: {
    form: "confirmcompanyinfo",
    title: "Confirm your company information",
    subtitle: "",
    listdesc: "",
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
    listdesc: "",
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
    listdesc: "",
    hand: "",
  },
  review: {
    form: "review",
    title: "Review your application",
    subtitle: "",
    listdesc: "",
    hand: "",
  },
}
export const complianceRequirements = {
  companydetail: {
    company_name: {
      title: "Company name",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    country: {
      title: "Country",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    company_address: {
      title: "Company address",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    company_city: {
      title: "Company city",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    company_state: {
      title: "Company state",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    company_postcode: {
      title: "Company postcode",
      categories: [],
      type: "form",
    },
  },
  compliance: {
    company_type: {
      title: "Company type",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    rc_no: {
      title: "RC Number",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    tin_no: {
      title: "Tax identification number",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    tin_doc: {
      title: "TIN Document",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    memart_doc: {
      title: "Memart certificate",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    cac_doc: {
      title: "CAC Registration Certificate",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    valid_tin: {
      title: "Valid TIN",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "hidden",
    },
    valid_cac: {
      title: "Valid CAC",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "hidden",
    },
    cac_data: {
      title: "CAC Registration Certificate",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "hidden",
    },
    tin_data: {
      title: "CAC Registration Certificate",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "hidden",
    },
  },
  ncclicense: {
    vas_license_id: {
      title: "VAS License ID",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    ncc_issue_date: {
      title: "Issuing date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    ncc_expiry_date: {
      title: "Expiry date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    ncc_doc: {
      title: "NCC VAS License document",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
  },
  nlrclicense: {
    nlrc_license_type: {
      title: "NLRC License type",
      categories: ["AGR"],
      type: "form",
    },
    nlrc_license_id: {
      title: "NLRC License ID",
      categories: ["AGR"],
      type: "form",
    },
    nlrc_issue_date: {
      title: "Issuing date",
      categories: ["AGR"],
      type: "form",
    },
    nlrc_expiry_date: {
      title: "Expiry date",
      categories: ["AGR"],
      type: "form",
    },
    nlrc_doc: {
      title: "NLRC Document",
      categories: ["AGR"],
      type: "form",
    },
  },
  shortcodes: {
    // shortcodes: {
    //   title: "Shortcodes",
    //   categories: ["VAS", "AGR"],
    //   type: "form",
    // },

    // shortcode: {
    shortcodes: {
      title: "Short codes",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
      approval: true,
    },
    shortcode_doc: {
      title: "Short code document",
      categories: ["VAS", "AGR"],
      type: "form",
      approval: true,
    },
    shortcode_issue_date: {
      title: "Issue date",
      categories: ["VAS", "AGR"],
      type: "form",
      approval: true,
    },
    shortcode_expiry_date: {
      title: "Expiry date",
      categories: ["VAS", "AGR"],
      type: "form",
      approval: true,
    },
    pricing_shortcodes: {
      title: "Approved pricing shortcode",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
      approval: true,
    },
    pricing_issue_date: {
      title: "Pricing approval Issue date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
      approval: true,
    },
    pricing_expiry_date: {
      title: "Pricing approval Expiry date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
      approval: true,
    },
    pricing_doc: {
      title: "NCC Pricing approval",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
      approval: true,
    },
  },
  shortcode: {
    shortcode_doc: {
      title: "Short code document",
      categories: ["VAS", "AGR"],
      type: "form",
    },
    shortcodes: {
      title: "Short code",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    shortcode_issue_date: {
      title: "Issue date",
      categories: ["VAS", "AGR"],
      type: "form",
    },
    shortcode_expiry_date: {
      title: "Expiry date",
      categories: ["VAS", "AGR"],
      type: "form",
    },
    pricing_shortcodes: {
      title: "Approved pricing shortcode",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
      approval: true,
    },
    pricing_issue_date: {
      title: "Pricing Issue date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    pricing_expiry_date: {
      title: "Pricing Expiry date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    pricing_doc: {
      title: "NCC Pricing approval",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
  },
  indemnity: {
    indemnity_no: {
      title: "Professional indemnity insurance number",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    indemnity_issue_date: {
      title: "Issuing date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    indemnity_expiry_date: {
      title: "Expiry date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    indemnity_doc: {
      title: "Professional indemnity insurance Document",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
  },
  accountinfo: {
    audited_account_1_doc: {
      title: "Audited account 1",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    audited_account_2_doc: {
      title: "Audited account 2",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    audited_account_3_doc: {
      title: "Audited account 3",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    job_evidence_doc: {
      title: "Evidence of 3 Jobs done",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
  },
}
export const shortcodeComplianceRequqirements = {
  shortcode: {
    shortcode_doc: {
      title: "Short code document",
      categories: ["VAS", "AGR"],
      type: "form",
    },
    shortcodes: {
      title: "Short code",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    shortcode_issue_date: {
      title: "Issue date",
      categories: ["VAS", "AGR"],
      type: "form",
    },
    shortcode_expiry_date: {
      title: "Expiry date",
      categories: ["VAS", "AGR"],
      type: "form",
    },
    pricing_shortcodes: {
      title: "Approved pricing shortcode",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
      approval: true,
    },
    pricing_issue_date: {
      title: "Pricing Issue date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    pricing_expiry_date: {
      title: "Pricing Expiry date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    pricing_doc: {
      title: "NCC Pricing approval",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
  },
}
export const compliance = {
  companydetail: {
    company_name: {
      title: "Company name",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    country: {
      title: "Country",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    company_address: {
      title: "Company address",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    company_city: {
      title: "Company city",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    company_state: {
      title: "Company state",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
  },
  compliance: {
    company_type: {
      title: "Company type",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    rc_no: {
      title: "RC Number",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    tin_no: {
      title: "Tax identification number",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    tin_doc: {
      title: "TIN Document",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    memart_doc: {
      title: "Memart certificate",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    cac_doc: {
      title: "CAC Registration Certificate",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "form",
    },
    valid_tin: {
      title: "Valid TIN",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "hidden",
    },
    valid_cac: {
      title: "Valid CAC",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "hidden",
    },
    cac_data: {
      title: "CAC Registration Certificate",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "hidden",
    },
    tin_data: {
      title: "CAC Registration Certificate",
      categories: ["VAS", "RMS", "AGR", "MKP"],
      type: "hidden",
    },
  },
  ncclicense: {
    vas_license_id: {
      title: "VAS License ID",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    ncc_issue_date: {
      title: "Issuing date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    ncc_expiry_date: {
      title: "Expiry date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    ncc_doc: {
      title: "NCC VAS License document",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
  },
  nlrclicense: {
    nlrc_license_type: {
      title: "NLRC License type",
      categories: ["AGR"],
      type: "form",
    },
    nlrc_license_id: {
      title: "NLRC License ID",
      categories: ["AGR"],
      type: "form",
    },
    nlrc_issue_date: {
      title: "Issuing date",
      categories: ["AGR"],
      type: "form",
    },
    nlrc_expiry_date: {
      title: "Expiry date",
      categories: ["AGR"],
      type: "form",
    },
    nlrc_doc: {
      title: "NLRC Document",
      categories: ["AGR"],
      type: "form",
    },
  },
  shortcode: {
    shortcode_doc: {
      title: "Short code document",
      categories: ["VAS", "AGR"],
      type: "form",
    },
    shortcode: {
      title: "Short code",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    shortcode_issue_date: {
      title: "Issue date",
      categories: ["VAS", "AGR"],
      type: "form",
    },
    shortcode_expiry_date: {
      title: "Expiry date",
      categories: ["VAS", "AGR"],
      type: "form",
    },

    shortcode_pricing_issue_date: {
      title: "Pricing Issue date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    shortcode_pricing_expiry_date: {
      title: "Pricing Expiry date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    shortcode_pricing_doc: {
      title: "NCC Pricing approval",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
  },
  indemnity: {
    indemnity_no: {
      title: "Professional indemnity insurance number",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    indemnity_issue_date: {
      title: "Issuing date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    indemnity_expiry_date: {
      title: "Expiry date",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    indemnity_doc: {
      title: "Professional indemnity insurance Document",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
  },
  accountinfo: {
    audited_account_1_doc: {
      title: "Audited account 1",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    audited_account_2_doc: {
      title: "Audited account 2",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    audited_account_3_doc: {
      title: "Audited account 3",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
    job_evidence_doc: {
      title: "Evidence of 3 Jobs done",
      categories: ["VAS", "RMS", "AGR"],
      type: "form",
    },
  },
}
export const approvalFields = {
  // companydetail: {
  company_name: {
    title: "Company name",
    categories: ["VAS", "RMS", "AGR", "MKP"],
    type: "form",
    approval: ["SPRM"],
  },
  country: {
    title: "Country",
    categories: ["VAS", "RMS", "AGR", "MKP"],
    type: "form",
    approval: ["SPRM"],
  },
  company_address: {
    title: "Company address",
    categories: ["VAS", "RMS", "AGR", "MKP"],
    type: "form",
    approval: ["SPRM"],
  },
  company_city: {
    title: "Company city",
    categories: ["VAS", "RMS", "AGR", "MKP"],
    type: "form",
    approval: ["SPRM"],
  },
  company_state: {
    title: "Company state",
    categories: ["VAS", "RMS", "AGR", "MKP"],
    type: "form",
    approval: ["SPRM"],
  },
  // compliance: {
  company_type: {
    title: "Company type",
    categories: ["VAS", "RMS", "AGR", "MKP"],
    type: "form",
    approval: ["SPRM"],
  },
  rc_no: {
    title: "RC Number",
    categories: ["VAS", "RMS", "AGR", "MKP"],
    type: "form",
    approval: ["SPRM", "RICO"],
  },
  tin_no: {
    title: "Tax identification number",
    categories: ["VAS", "RMS", "AGR", "MKP"],
    type: "form",
    approval: ["SPRM", "RICO"],
  },
  tin_doc: {
    title: "TIN Document",
    categories: ["VAS", "RMS", "AGR", "MKP"],
    type: "form",
    approval: ["SPRM", "RICO"],
  },
  memart_doc: {
    title: "Memart certificate",
    categories: ["VAS", "RMS", "AGR", "MKP"],
    type: "form",
    approval: ["SPRM", "RICO"],
  },
  cac_doc: {
    title: "CAC Registration Certificate",
    categories: ["VAS", "RMS", "AGR", "MKP"],
    type: "form",
    approval: ["SPRM", "RICO"],
  },
  // ncclicense: {
  vas_license_id: {
    title: "VAS License ID",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  ncc_issue_date: {
    title: "Issuing date",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  ncc_expiry_date: {
    title: "Expiry date",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  ncc_doc: {
    title: "NCC VAS License document",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  // nlrclicense: {
  nlrc_license_type: {
    title: "NLRC License type",
    categories: ["AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  nlrc_license_id: {
    title: "NLRC License ID",
    categories: ["AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  nlrc_issue_date: {
    title: "Issuing date",
    categories: ["AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  nlrc_expiry_date: {
    title: "Expiry date",
    categories: ["AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  nlrc_doc: {
    title: "NLRC Document",
    categories: ["AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  // shortcode: {
  shortcodes: {
    title: "Short codes",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  shortcode_doc: {
    title: "Short code document",
    categories: ["VAS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA", "RICO"], // REMOVE , "RICO"
  },
  shortcode_issue_date: {
    title: "Issue date",
    categories: ["VAS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA", "RICO"], // REMOVE , "RICO"
  },
  shortcode_expiry_date: {
    title: "Expiry date",
    categories: ["VAS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA", "RICO"], // REMOVE , "RICO"
  },
  pricing_shortcodes: {
    title: "Approved pricing shortcode",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  pricing_issue_date: {
    title: "Pricing approval Issue date",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  pricing_expiry_date: {
    title: "Pricing approval Expiry date",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  pricing_doc: {
    title: "NCC Pricing approval",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  // indemnity: {
  indemnity_no: {
    title: "Professional indemnity insurance number",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "INSU"],
  },
  indemnity_issue_date: {
    title: "Issuing date",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "INSU"],
  },
  indemnity_expiry_date: {
    title: "Expiry date",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "INSU"],
  },
  indemnity_doc: {
    title: "Professional indemnity insurance Document",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "INSU"],
  },
  // accountinfo: {
  audited_account_1_doc: {
    title: "Audited account 1",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM"],
  },
  audited_account_2_doc: {
    title: "Audited account 2",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM"],
  },
  audited_account_3_doc: {
    title: "Audited account 3",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM"],
  },
  job_evidence_doc: {
    title: "Evidence of 3 Jobs done",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM"],
  },
}
export const shortcodeApprovalFields = {
  // shortcode: {
  shortcodes: {
    title: "Short codes",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  shortcode_doc: {
    title: "Short code document",
    categories: ["VAS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA", "RICO"], // REMOVE , "RICO"
  },
  shortcode_issue_date: {
    title: "Issue date",
    categories: ["VAS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA", "RICO"], // REMOVE , "RICO"
  },
  shortcode_expiry_date: {
    title: "Expiry date",
    categories: ["VAS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA", "RICO"], // REMOVE , "RICO"
  },
  pricing_shortcodes: {
    title: "Approved pricing shortcode",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  pricing_issue_date: {
    title: "Pricing approval Issue date",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  pricing_expiry_date: {
    title: "Pricing approval Expiry date",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
  pricing_doc: {
    title: "NCC Pricing approval",
    categories: ["VAS", "RMS", "AGR"],
    type: "form",
    approval: ["SPRM", "LEGA"],
  },
}
const counts = {}

export const department = [
  { code: "SPRM", name: "SUPPLIER & RELATIONSHIP MANAGEMENT", approval: true },
  { code: "RICO", name: "RISK & COMPLIANCE", approval: true },
  { code: "LEGA", name: "LEGAL", approval: true },
  { code: "INSU", name: "INSURANCE", approval: true },
]
for (const stage in complianceRequirements) {
  if (!counts[stage]) counts[stage] = { count: 0 }
  for (const field in complianceRequirements[stage]) {
    if (
      approvalFields[field]?.approval &&
      approvalFields[field]?.type === "form"
    ) {
      counts[stage].count++
      departments.map((dept) => {
        if (approvalFields[field]?.approval.includes(dept.code)) {
          if (!counts[stage][dept.code]) counts[stage][dept.code] = { count: 0 }
          if (!counts[stage][dept.code].fields)
            counts[stage][dept.code].fields = []
          counts[stage][dept.code].count++
          counts[stage][dept.code].fields.push(field)
        }
      })
    }
  }
}
export const fieldCounts = counts
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
