import { action, computed, thunk } from "easy-peasy"
const users = {
  users: [],
  user: {
    id: "",
    uuid: "",
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    country: "",
    countrycode: "",
    telephone: "",
    designation: "",
    updated_at: "",
    created_at: "",
  },
  isLoggedIn: computed((state) => state.user.id != null),
  fullname: computed((state) => {
    return state.user.id != null
      ? `${state.user.first_name} ${state.user.last_name}`
      : null
  }),
  session: computed((state) => {
    const status = state.user.id != null ? "authenticated" : "unauthenticated"
    const user = state.user.id != null ? state.user : null
    return { status, user }
  }),
  updateUser: action((state, user) => {
    state.user = { ...state.user, ...user }
  }),
  login: thunk(async (actions) => {
    try {
      const res = await axios.get(`/api/user/login`)
      actions.updateUser(res?.data?.response?.user)
    } catch (error) {
      console.log(error)
    }
  }),
  getUser: thunk(async (actions) => {
    try {
      const res = await axios.get(`/api/user/getUser`)
      actions.updateUser(res?.data?.response?.user)
    } catch (error) {
      console.log(error)
    }
  }),
}
export default users
