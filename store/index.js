import { createStore, persist } from "easy-peasy";
import { persistStore } from "@/app/modules/constants";

import app from "./models/app";
import users from "./models/users";
import partners from "./models/partners";
import admins from "./models/admins";
import notifications from "./models/notifications";

export const model = {
  app,
  users,
  partners,
  admins,
  notifications
};
const store = persistStore ? createStore(persist(model)) : createStore(model);

export const clearPersistStore = async () => {
  if (persistStore) await store.persist.clear();
};

export default store;
