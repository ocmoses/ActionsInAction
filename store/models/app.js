import { action } from "easy-peasy"
const app = {
  errors: {},
  success: null,
  processing: false,
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
  form: null,
  setForm: action((state, form) => {
    state.form = form
  }),
}
export default app
