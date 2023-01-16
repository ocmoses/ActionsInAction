import { action } from "easy-peasy"
const app = {
  errors: {},
  processing: false,
  setError: action((state, errorObject) => {
    state.errors = { ...state.errors, ...errorObject }
  }),
  removeError: action((state, errorKey) => {
    delete state.errors[errorKey]
  }),
  clearErrors: action((state) => {
    state.errors = {}
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
