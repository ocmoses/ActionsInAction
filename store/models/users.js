import { action, computed, thunk } from "easy-peasy";
import { action, computed, thunk } from "easy-peasy";
const users = {
  users: null,
  user: null,
  token: null,
  tmpuser: null,
  session: { status: "unauthenticated" },

  clear: action((state) => {
    state.users = null;
    state.user = null;
    state.user = null;
    state.token = null;
    state.session = { status: "unauthenticated" };
  }),
  isLoggedIn: computed((state) => state.user?.id != null),
  fullname: computed((state) => {
    return state.user?.id != null
      ? `${state.user?.first_name} ${state.user?.last_name}`
      : null;
      : null;
  }),
  setUser: action((state, user) => {
    state.user = user;
    state.session = { status: "authenticated", user };
  }),
  setToken: action((state, token) => {
    state.token = token;
  }),
  setTmpUser: action((state, user) => {
    state.tmpuser = user;
    state.session = { status: "unauthenticated", user: null };
    state.tmpuser = user;
    state.session = { status: "unauthenticated", user: null };
  }),
  updateUser: action((state, user) => {
    state.user = { ...state.user, ...user };
    state.user = { ...state.user, ...user };
  }),
};
export default users;
};
export default users;
