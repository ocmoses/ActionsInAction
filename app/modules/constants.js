import {
  AccountInfo,
  CompanyDetail,
  Compliance,
  Indemnity,
  NccLicense,
  Shortcode,
  Review,
  ContactPerson,
  StepBadge,
} from "@/app/components/Icons"

export const apiURL = "https://amazonpartner.com.ng/amazon/public/api"
// export const partnerFields = {
//   partnerid: "",

//   // userinfo
//   first_name: "",
//   last_name: "",
//   email: "",
//   countrycode: "234",
//   telephone: "",
//   password: "",
//   password_confirmed: "",

//   //  companyinfo
//   company_name: "",
//   company_role: "",

//   // category
//   category_id: [],

//   // companyinfo
//   company_name: "",
//   country: "NG",
//   company_address: "",
//   company_city: "",
//   company_state: "",
//   company_postcode: "",

//   // compliance
//   rc_no: "",
//   tin_no: "",
//   tin_doc: "",
//   memart_doc: "",
//   cac_doc: "",

//   // ncclicense
//   vas_license_id: "",
//   ncc_issue_date: "",
//   ncc_expiry_date: "",
//   ncc_doc: "",

//   // nlrclicense
//   nlrc_license_id: "",
//   nlrc_issue_date: "",
//   nlrc_expiry_date: "",
//   nlrc_doc: "",

//   // shortcode
//   shortcode: "",
//   shortcode_issue_date: "",
//   shortcode_expiry_date: "",
//   shortcode_price_issue_date: "",
//   shortcode_price_expiry_date: "",
//   shortcode_doc: "",
//   shortcode_approval_doc: "",

//   // indemnity
//   indemnity_no: "",
//   indemnity_issue_date: "",
//   indemnity_expiry_date: "",
//   indemnity_doc: "",

//   // accountinfo
//   account_name: "",
//   account_no: "",
//   bank: "",
//   audited_account_1: "",
//   audited_account_2: "",
//   audited_account_3: "",
// }
export const partnerFields =
  process.env.NODE_ENV === "production"
    ? {
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
      }
    : {
        partnerid: "12345678",

        // userinfo
        first_name: "Prince",
        last_name: "Morpheus",
        email: "olabode.gbolu@mtn.com",
        countrycode: "234",
        telephone: "07062026073",
        password: "",
        password_confirmed: "",

        //  companyinfo
        company_name: "MTN Nigeria",
        company_role: "admin",

        // category
        category_id: [1],

        // companyinfo
        country: "NG",
        company_address: "1, Alh Sule Maito Street, Benson",
        company_city: "Ikorodu",
        company_state: "05",
        company_postcode: "23401",

        // compliance
        rc_no: "123456",
        tin_no: "2345432",
        tin_doc: "",
        memart_doc: "",
        cac_doc: "",

        // ncclicense
        vas_license_id: "9876532",
        ncc_issue_date: "2019-06-02",
        ncc_expiry_date: "2025-06-01",
        ncc_doc: "",

        // nlrclicense
        nlrc_license_id: "65478934",
        nlrc_issue_date: "2020-04-07",
        nlrc_expiry_date: "2025-04-06",
        nlrc_doc: "",

        // shortcode
        shortcode: "*777#",
        shortcode_issue_date: "2021-06-01",
        shortcode_expiry_date: "2026-05-31",
        shortcode_price_issue_date: "2022-03-07",
        shortcode_price_expiry_date: "2024-03-06",
        shortcode_doc: "",
        shortcode_approval_doc: "",

        // indemnity
        indemnity_no: "AD7RE-WU209",
        indemnity_issue_date: "2018-12-19",
        indemnity_expiry_date: "2023-12-18",
        indemnity_doc: "",

        // accountinfo
        account_name: "PRINCE MORPHEUS",
        account_no: "2345678901",
        bank: "214",
        audited_account_1: "",
        audited_account_2: "",
        audited_account_3: "",
      }
export const forms = {
  userinfo: {
    form: "userinfo",
    title: "Get started",
    subtitle: "it'll only take a few minutes",
    hand: "👋",
    fields: {
      first_name: "First name",
      last_name: "Last name",
      email: "Email",
      countrycode: "Country code",
      telephone: "Telephone",
      password: "Password",
      password_confirmed: "Repeat password",
    },
    required: {
      first_name: "First name",
      last_name: "Last name",
      email: "Email",
      countrycode: "Country code",
      telephone: "Telephone",
      password: "Password",
      password_confirmed: "Repeat password",
    },
  },
  companyinfo: {
    form: "companyinfo",
    title: "Your company and role",
    subtitle: "it'll only take a few minutes",
    hand: "",
    fields: { company_name: "Company name", company_role: "Company role" },
    required: { company_name: "Company name", company_role: "Company role" },
  },
  category: {
    form: "category",
    title: "Choose a service category",
    subtitle: "You'll be able to add more later",
    hand: "",
    fields: { category_id: "Category ID" },
    required: { category_id: "Category ID" },
  },
  companydetail: {
    form: "companydetail",
    title: "Provide your company information",
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
    subtitle: "",
    hand: "",
    fields: {
      vas_license_id: "VAS License ID",
      vas_issue_date: "Issuing date",
      vas_expiry_date: "Expiry date",
      vas_doc: "NCC VAS License",
    },
    required: {
      vas_license_id: "VAS License ID",
      // vas_issue_date: 'Issuing date',
      // vas_expiry_date: 'Expiry date'
      // vas_doc: 'NCC VAS License'
    },
  },
  nlrclicense: {
    form: "nlrclicense",
    title: "Provide your company's NLRC license details",
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
      // nlrc_issue_date: 'Issuing date',
      // nlrc_expiry_date: 'Expiry date'
      // nlrc_doc: 'NLRC Document'
    },
  },
  shortcode: {
    form: "shortcode",
    title: "Provide your company's short code details",
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
      // shortcode_issue_date: 'Issue date',
      // shortcode_expiry_date: 'Expiry date',
      // shortcode_price_issue_date: 'Princing Issue date',
      // shortcode_price_expiry_date: 'Pricing Expiry date',
      // shortcode_doc: 'Short code document',
      // shortcode_approval_doc: 'NCC Pricing approval'
    },
  },
  indemnity: {
    form: "indemnity",
    title: "Provide your company's indemnity insurance",
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
      // indemnity_issue_date: 'Issuing date',
      // indemnity_expiry_date: 'Expiry date'
      // indemnity_doc: 'Professional indemnity insurance Document'
    },
  },
  accountinfo: {
    form: "accountinfo",
    title: "Provide your company’s audited accounts",
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
    title: "Welcome back",
    subtitle: "We'll send a confirmation email to your liked email address",
    hand: "👋",
    fields: {
      partnerid: "Partner ID or email",
    },
    required: {
      partnerid: "Partner ID or email",
    },
  },
  setpassword: {
    form: "setpassword",
    title: "Setup your password",
    subtitle: "",
    hand: "",
    fields: {
      password: "Password",
      password_confirmed: "Repeat password",
    },
    required: {
      password: "Password",
      password_confirmed: "Repeat password",
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
    vas_issue_date: "Issuing date",
    vas_expiry_date: "Expiry date",
    vas_doc: "NCC VAS License",
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
    component: <CompanyDetail />,
    title: "Company Info",
  },

  compliance: {
    compliance: <Compliance />,
    title: "Compliance",
  },
  ncclicense: {
    component: <NccLicense />,
    title: "NCC Licence",
  },
  nlrclicense: {
    component: <NccLicense />,
    title: "NLRC Licence",
  },
  shortcode: {
    component: <Shortcode />,
    title: "Shortcode",
  },
  indemnity: {
    component: <Indemnity />,
    title: "Indemnity",
  },
  accountinfo: {
    component: <AccountInfo />,
    title: "Account Info",
  },
  // Update menu
  confirmcompanyinfo: {
    component: <CompanyDetail />,
    title: "Company Info",
  },
  contactperson: {
    component: <ContactPerson />,
    title: "Contact Person",
  },
  review: {
    component: <Review />,
    title: "Review & Submit",
  },
  updatereview: {
    component: <Review />,
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
    slug: "superadmin",
    title: "Super Admin",
    priviledges: [],
  },
  {
    slug: "admin",
    title: "Admin",
    priviledges: [],
  },
]
