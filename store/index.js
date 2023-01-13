import { createStore } from 'easy-peasy'
import users from './models/users'
import forms from './models/forms'

const model = {
  users,
  forms
}
export default createStore(model)
