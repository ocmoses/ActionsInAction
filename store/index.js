import { createStore, persist } from "easy-peasy"

import app from "./models/app"
import users from "./models/users"
import partners from "./models/partners"

const model = {
  app,
  users,
  partners,
}
const store = createStore(persist(model))
export default store
