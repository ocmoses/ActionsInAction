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
  form: null,
  setForm: action((state, form) => {
    state.form = form
  }),
}
export default app
