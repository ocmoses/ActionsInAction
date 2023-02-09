import { action } from "easy-peasy"
const app = {
  count: 0,
  errors: {},
  success: null,
  processing: false,
  loading: {},
  form: null,
  formSteps: [],
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
  formValidation: {},
  activeCategory: {},
  tmpUserUUID: null,
  increaseCount: action((state, key) => {
    return state.count++
  }),
  clear: action((state) => {
    state.count = 0
    state.errors = {}
    state.success = null
    state.processing = false
    state.loading = {}
    state.form = null
    state.formSteps = []
    state.allforms = [
      "userinfo",
      "category",
      "companydetail",
      "compliance",
      "ncclicense",
      "nlrclicense",
      "shortcode",
      "indemnity",
      "accountinfo",
    ]
    state.formValidation = {}
    state.activeCategory = {}
    state.tmpUserUUID = null
  }),
  setTmpUserUUID: action((state, uuid) => {
    state.tmpUserUUID = uuid
  }),
  isLoading: action((state, key) => {
    return state.loading && state.loading[key] !== "undefined"
  }),
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
    state.loading = { ...state.loading, [key]: true }
  }),
  endLoading: action((state, key) => {
    if (state.loading[key]) delete state.loading[key]
  }),

  setActiveCategory: action((state, uuid) => {
    state.activeCategory = uuid
  }),
  setForm: action((state, form) => {
    state.form = form
  }),
  setFormSteps: action((state, validation) => {
    state.formSteps = validation?.allForms?.all
    state.formValidation = {
      required: validation?.required,
      optional: validation?.optional,
    }
  }),
  moveToNextForm: action((state, current) => {
    if (!current || current?.length < 1) {
      state.form = null
    } else {
      const currentForm = current[0]
      const useCurrent = current?.length > 1 ? true : false

      const index = state.allforms?.indexOf(currentForm)
      if (useCurrent) {
        state.form = currentForm
      } else {
        if (index === state.allforms?.length - 1) {
          state.form = "review"
        } else {
          state.form =
            state.allforms?.length && state.allforms[index + 1]
              ? state.allforms[index + 1]
              : null
        }
      }
    }
  }),
  moveToPrevForm: action((state, current) => {
    if (!current) {
      state.form = null
    } else {
      const index = state.allforms?.indexOf(current)
      if (index === 0) {
        state.form = state.allforms[1]
      } else {
        state.form =
          state.allforms?.length && state.allforms[index - 1]
            ? state.allforms[index - 1]
            : null
      }
    }
  }),
}
export default app
