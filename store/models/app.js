import { action, thunk } from "easy-peasy"
const app = {
  count: 0,
  errors: {},
  success: null,
  processing: false,
  loading: {},
  routeloading: false,
  form: null,
  formSteps: [],
  allforms: [
    "userinfo",
    "category",
    "compliance",
    "companydetail",
    "ncclicense",
    "nlrclicense",
    "shortcode",
    "indemnity",
    "accountinfo",
  ],
  formValidation: {},
  activeCategory: {},
  tmpUserUUID: null,
  showGetstartedLink: false,
  increaseCount: action((state, key) => {
    return state.count++
  }),
  clear: action((state) => {
    state.count = 0
    state.errors = {}
    state.success = null
    state.processing = false
    state.loading = {}
    state.routeloading = false
    state.form = null
    state.formSteps = []
    state.allforms = [
      "userinfo",
      "category",
      "compliance",
      "companydetail",
      "ncclicense",
      "nlrclicense",
      "shortcode",
      "indemnity",
      "accountinfo",
    ]
    state.formValidation = {}
    state.activeCategory = {}
    state.tmpUserUUID = null
    state.showGetstartedLink = false
  }),
  setRouteloading: action((state, status) => {
    state.routeloading = status ?? false
  }),
  setTmpUserUUID: action((state, uuid) => {
    state.tmpUserUUID = uuid
  }),
  toggleGetstartedLink: action((state, status) => {
    state.showGetstartedLink = status ?? false
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
  moveToNextForm: thunk((actions, current, helpers) => {
    const states = helpers.getStoreState()

    if (!current || current?.length < 1) {
      actions.setForm(null)
    } else {
      const currentForm = current[0]
      const useCurrent = current?.length > 1 ? true : false
      const index = states.app?.formSteps?.indexOf(currentForm)
      if (useCurrent) {
        // MOVE TO SELECTED FORM
        actions.setForm(currentForm)
      } else {
        if (index === states.app?.formSteps?.length - 1) {
          // If next for is last then move to preview
          actions.setForm("review")
        } else {
          // move to next form in stack
          const nextSection =
            states.app?.formSteps?.length && states.app?.formSteps[index + 1]
              ? states.app?.formSteps[index + 1]
              : null

          actions.setForm(nextSection)
        }
      }
    }
  }),
  moveToPrevForm: action((state, current) => {
    if (!current) {
      state.form = null
    } else {
      const index = state.formSteps?.indexOf(current)
      if (index === 0) {
        state.form = state.formSteps[1]
      } else {
        state.form =
          state.formSteps?.length && state.formSteps[index - 1]
            ? state.formSteps[index - 1]
            : null
      }
    }
  }),
}
export default app
