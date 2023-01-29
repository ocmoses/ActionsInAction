import { action } from "easy-peasy"
const app = {
  errors: {},
  success: null,
  processing: false,
  loading: {},
  setError: action((state, errorObject) => {
    state.errors = { ...state.errors, ...errorObject }
  }),
  setSuccess: action((state, message) => {
    state.success = message
  }),
  removeError: action((state, errorKey) => {
    delete state.errors[errorKey]
  }),
  clearErrors: action((state) => {
    state.errors = {}
    state.success = null
  }),
  setProcessing: action((state, status) => {
    state.processing = status
  }),
  startLoading: action((state, key) => {
    state.loading[key] = true
  }),
  endLoading: action((state, key) => {
    if (state.loading[key]) delete state.loading[key]
  }),

  // FORMS
  form: null,
  formSteps: {},
  nextForm: "",
  setForm: action((state, form) => {
    state.form = form
  }),
  setFormSteps: action((state, steps) => {
    console.log({ steps })
    state.formSteps = steps
  }),
  moveToNextForm: action((state, current) => {
    const forms = ["companydetail", "compliance", "ncclincense"]
    if (!current) {
      state.nextForm = "companydetail"
      return state.nextForm
    }
    state.partner = { ...state.partner, ...partner }
    const Partners = state.partners.filter((p) => {
      p.uuid !== partner.uuid
    })
    state.partners = [...Partners, partner]
  }),
  // ONBOARDING
  service: {
    uuid: "",
    category_id: [],
    // userinfo
    first_name: "Olabode",
    last_name: "Gbolu",
    email: "princemorpheus@gmail.com",
    countrycode: "234",
    telephone: "08090956548",
    password: "Password12345%",
    password_confirmed: "Password12345%",

    // companyinfo
    company_name: "",
    company_role: "",
    designation: "",
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
  },
  services: [],
  updateService: action((state, service) => {
    state.service = { ...state.service, ...service }
    const Service = state.services.filter((p) => {
      p.uuid !== service.uuid
    })
    state.partners = [...Service, service]
  }),
}
export default app
