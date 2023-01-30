import { action, computed, thunk } from "easy-peasy"
const users = {
  users: null,
  user: null,
  isLoggedIn: computed((state) => state.user?.id != null),
  fullname: computed((state) => {
    return state.user?.id != null
      ? `${state.user?.first_name} ${state.user?.last_name}`
      : null
  }),
  session: computed((state) => {
    const status = state.user?.uuid ? "authenticated" : "unauthenticated"
    const user = state.user?.uuid ? state.user : null
    return { status, user }
  }),
  setUser: action((state, user) => {
    state.user = user
  }),
  updateUser: action((state, user) => {
    state.user = { ...state.user, ...user }
  }),
}
export default users
