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
