import { createStore } from "easy-peasy"

import app from "./models/app"
import users from "./models/users"

const model = {
  app,
  users,
}
export default createStore(model)
