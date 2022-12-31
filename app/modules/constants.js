import {
  AccountInfo,
  CompanyDetail,
  Compliance,
  Indemnity,
  NccLicense,
  Shortcode,
  Review,
  StepBadge
} from '@/app/components/Icons'
export const partnerFields = {
  partnerid: '',
  first_name: '',
  last_name: '',
  email: '',
  country: 'NG',
  countrycode: '234',
  telephone: '',
  password: '',
  password_confirmed: '',
  company_name: '',
  company_role: '',
  category_id: '',
  company_address: '',
  company_city: '',
  company_state: '',
  company_postcode: '',
  rc_no: '',
  tin_no: '',
  tin_doc: '',
  memart_doc: '',
  cac_doc: '',
  vas_license_id: '',
  vas_issue_date: '',
  vas_expiry_date: '',
  vas_doc: '',
  nlrc_license_id: '',
  nlrc_issue_date: '',
  nlrc_expiry_date: '',
  nlrc_doc: '',
  shortcode: '',
  shortcode_issue_date: '',
  shortcode_expiry_date: '',
  shortcode_price_issue_date: '',
  shortcode_price_expiry_date: '',
  shortcode_doc: '',
  shortcode_approval_doc: ''
}
export const forms = {
  userinfo: {
    form: 'userinfo',
    title: 'Get started',
    subtitle: "it'll only take a few minutes",
    hand: '👋',
    fields: {
      first_name: 'First name',
      last_name: 'Last name',
      email: 'Email',
      countrycode: 'Country code',
      telephone: 'Telephone',
      password: 'Password',
      password_confirmed: 'Repeat password'
    },
    required: {
      first_name: 'First name',
      last_name: 'Last name',
      email: 'Email',
      countrycode: 'Country code',
      telephone: 'Telephone',
      password: 'Password',
      password_confirmed: 'Repeat password'
    }
  },
  companyinfo: {
    form: 'companyinfo',
    title: 'Your company and role',
    subtitle: "it'll only take a few minutes",
    hand: '',
    fields: { company_name: 'Company name', company_role: 'Company role' },
    required: { company_name: 'Company name', company_role: 'Company role' }
  },
  category: {
    form: 'category',
    title: 'Choose a service category',
    subtitle: 'You’ll be able to add more later',
    hand: '',
    fields: { category_id: 'Category ID' },
    required: { category_id: 'Category ID' }
  },
  companydetail: {
    form: 'companydetail',
    title: 'Provide your company information',
    subtitle: '',
    hand: '',
    fields: {
      company_name: 'Company name',
      country: 'Country',
      company_address: 'Company address',
      company_city: 'Company city',
      company_state: 'Company state',
      company_postcode: 'Company postcode'
    },
    required: {
      company_name: 'Company name',
      country: 'Country',
      company_address: 'Company address',
      company_city: 'Company city',
      // company_state: 'Company state',
      company_postcode: 'Company postcode'
    }
  },
  compliance: {
    form: 'compliance',
    title: "Provide your company's compliance details",
    subtitle: '',
    hand: '',
    fields: {
      rc_no: 'RC Number',
      tin_no: 'Tax identification number',
      tin_doc: 'TIN Document',
      memart_doc: 'Memart certificate',
      cac_doc: 'CAC Registration Certificate'
    },
    required: {
      rc_no: 'RC Number',
      tin_no: 'Tax identification number'
      // tin_doc: 'TIN Document',
      // memart_doc: 'Memart certificate',
      // cac_doc: 'CAC Registration Certificate'
    }
  },
  ncclicense: {
    form: 'ncclicense',
    title: "Provide your company's NCC license details",
    subtitle: '',
    hand: '',
    fields: {
      vas_license_id: 'VAS License ID',
      vas_issue_date: 'Issuing date',
      vas_expiry_date: 'Expiry date',
      vas_doc: 'NCC VAS License'
    },
    required: {
      vas_license_id: 'VAS License ID'
      // vas_issue_date: 'Issuing date',
      // vas_expiry_date: 'Expiry date'
      // vas_doc: 'NCC VAS License'
    }
  },
  nlrclicense: {
    form: 'nlrclicense',
    title: "Provide your company's NLRC license details",
    subtitle: '',
    hand: '',
    fields: {
      nlrc_license_id: 'NLRC License ID',
      nlrc_issue_date: 'Issuing date',
      nlrc_expiry_date: 'Expiry date',
      nlrc_doc: 'NLRC Document'
    },
    required: {
      nlrc_license_id: 'NLRC License ID'
      // nlrc_issue_date: 'Issuing date',
      // nlrc_expiry_date: 'Expiry date'
      // nlrc_doc: 'NLRC Document'
    }
  },
  shortcode: {
    form: 'shortcode',
    title: "Provide your company's short code details",
    subtitle: '',
    hand: '',
    fields: {
      shortcode: 'Short code',
      shortcode_issue_date: 'Issue date',
      shortcode_expiry_date: 'Expiry date',
      shortcode_price_issue_date: 'Princing Issue date',
      shortcode_price_expiry_date: 'Pricing Expiry date',
      shortcode_doc: 'Short code document',
      shortcode_approval_doc: 'NCC Pricing approval'
    },
    required: {
      shortcode: 'Short code'
      // shortcode_issue_date: 'Issue date',
      // shortcode_expiry_date: 'Expiry date',
      // shortcode_price_issue_date: 'Princing Issue date',
      // shortcode_price_expiry_date: 'Pricing Expiry date',
      // shortcode_doc: 'Short code document',
      // shortcode_approval_doc: 'NCC Pricing approval'
    }
  },
  indemnity: {
    form: 'indemnity',
    title: "Provide your company's indemnity insurance",
    subtitle: '',
    hand: '',
    fields: {
      nlrc_license_id: 'NLRC License ID',
      nlrc_issue_date: 'Issuing date',
      nlrc_expiry_date: 'Expiry date',
      nlrc_doc: 'NLRC Document'
    },
    required: {
      nlrc_license_id: 'NLRC License ID'
      // nlrc_issue_date: 'Issuing date',
      // nlrc_expiry_date: 'Expiry date'
      // nlrc_doc: 'NLRC Document'
    }
  }
}
export const profileMenu = [
  'companydetail',
  'compliance',
  'ncclicense',
  'nlrclicense',
  'shortcode',
  'indemnity'
]
export const profileMenuIcons = {
  companydetail: {
    component: <CompanyDetail />,
    title: 'Company Info'
  },
  compliance: {
    compliance: <Compliance />,
    title: 'Compliance'
  },
  ncclicense: {
    component: <NccLicense />,
    title: 'NCC Licence'
  },
  nlrclicense: {
    component: <NccLicense />,
    title: 'NLRC Licence'
  },
  shortcode: {
    component: <Shortcode />,
    title: 'Shortcode'
  },
  indemnity: {
    component: <Indemnity />,
    title: 'Indemnity'
  }
}
export const roles = [
  {
    slug: '',
    title: '-',
    priviledges: []
  },
  {
    slug: 'superadmin',
    title: 'Super Admin',
    priviledges: []
  },
  {
    slug: 'admin',
    title: 'Admin',
    priviledges: []
  }
]
