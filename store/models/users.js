import { action, computed, thunk } from "easy-peasy";
const users = {
  users: null,
  user: null,
  token: null,
  auth0: null,
  tmpuser: null,
  role: null,
  session: { status: "unauthenticated" },

  clear: action((state) => {
    state.users = null;
    state.user = null;
    state.user = null;
    state.token = null;
    state.auth0 = null;
    state.role = null;
    state.session = { status: "unauthenticated" };
  }),

  isLoggedIn: computed((state) => state.user?.id != null),
  fullname: computed((state) => {
    return state.user?.id != null
      ? `${state.user?.first_name} ${state.user?.last_name}`
      : null;
  }),
  setUser: action((state, user) => {
    
    state.user = user;
    state.session = { status: "authenticated", user };
  }),
  setRole: action((state, role) => {    
    state.role = role;
  }),
  setToken: action((state, token) => {
    state.token = token;
  }),
  setTmpUser: action((state, user) => {
    state.tmpuser = user;
    state.session = { status: "unauthenticated", user: null };
  }),
  updateUser: action((state, user) => {
    state.user = { ...state.user, ...user };
  }),

  setAuth0Data: action((state, auth0) => {
    state.auth0 = auth0;
  }),

};
export default users;