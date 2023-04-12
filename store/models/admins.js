import { action, computed, thunk } from "easy-peasy"
const admins = {
  admins: null,
  admin: null,
  session: { status: "unauthenticated" },
  token: null,
  categories: [],
  stages: [
    "companydetail",
    "compliance",
    "ncclicense",
    "nlrclicense",
    "shortcode",
    "indemnity",
    "accountinfo",
  ],
  activeApproval: null,
  rejectionReasons: null,
  activeCategory: null,

  clear: action((state) => {
    state.admins = null
    state.admin = null
    state.session = { status: "unauthenticated" }
    state.token = null
    state.categories = []
    state.activeApproval = null
    state.rejectionReasons = null
    state.activeCategory = null
  }),
  isLoggedIn: computed((state) => state.session?.status === "authenticated"),
  fullname: computed((state) => {
    return state.admin?.uuid !== null ? `${state.admin?.username}` : null
  }),
  setActiveApproval: action((state, field) => {
    state.activeApproval = field
  }),
  setRejectionReasons: action((state, reasons) => {
    state.rejectionReasons = reasons
  }),
  setToken: action((state, token) => {
    state.token = token
  }),
  setAdmin: action((state, admin) => {
    state.admin = admin
    if (state.admin?.uuid !== null)
      state.session = { status: "authenticated", admin }
  }),
  updateAdmin: action((state, admin) => {
    state.admin = { ...state.admin, ...admin }
  }),
  setCategories: action((state, categories) => {
    state.categories = categories
  }),
  setActiveCategory: action((state, category) => {
    state.activeCategory = category
  }),
}
export default admins
