export const forms = {
  userinfo: {
    form: 'userinfo',
    title: 'Get started',
    subtitle: "it'll only take a few minutes",
    hand: '👋',
    required: {
      first_name: 'First name',
      last_name: 'Last name',
      email: 'Email',
      country: 'Country',
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
    required: { company_name: 'Company name', company_role: 'Company role' }
  },
  category: {
    form: 'category',
    title: 'Choose a service category',
    subtitle: 'You’ll be able to add more later',
    hand: '',
    required: {}
  },
  companydetail: {
    form: 'companydetail',
    title: 'Provide your company information',
    subtitle: '',
    hand: '',
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
    required: {
      rc_no: 'RC Number',
      tin: 'Tax identification number'
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
    required: {
      vas_license: 'VAS License ID',
      issue_date: 'Issuing date',
      expiry_date: 'Expiry date'
      // vas_license_doc: 'NCC VAS License'
    }
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
