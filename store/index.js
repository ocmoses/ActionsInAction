import { createStore, persist } from "easy-peasy"

import app from "./models/app"
import users from "./models/users"
import partners from "./models/partners"

export const model = {
  app,
  users,
  partners,
}
// const store = createStore(model)
const store = createStore(persist(model))

export const clearPersistStore = () => {
  store.persist.clear().then(() => {
    // console.log("Persisted state has been removed")
  })
}

export default store
