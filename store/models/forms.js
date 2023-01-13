import { action, computed, thunk } from 'easy-peasy'
const forms = {
  form: null,
  setForm: action((state, form) => {
    state.form = form
  })
}
export default forms
