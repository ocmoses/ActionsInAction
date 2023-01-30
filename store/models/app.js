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
  formSteps: null,
  allforms: [
    "userinfo",
    "category",
    "companydetail",
    "compliance",
    "ncclicense",
    "nlrclicense",
    "shortcode",
    "indemnity",
    "accountinfo",
  ],
  formValidation: [],
  activeCategory: null,

  setActiveCategory: action((state, uuid) => {
    state.activeCategory = uuid
  }),
  setForm: action((state, form) => {
    state.form = form
  }),
  setFormSteps: action((state, validation) => {
    state.formSteps = validation.allForms.all
    state.formValidation = {
      required: validation.required,
      optional: validation.optional,
    }
  }),
  moveToNextForm: action((state, current) => {
    if (!current) {
      state.form = null
    } else {
      const index = state.allforms.indexOf(current)
      if (index === state.allforms.length - 1) {
        state.form = "review"
      } else {
        state.form = state.allforms[index + 1]
      }
    }
  }),
}
export default app
