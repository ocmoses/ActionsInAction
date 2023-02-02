import { action, computed, thunk } from "easy-peasy"
const partners = {
  partnerID: null,
  partners: null,
  partner: null,
  category: null,
  categories: null,
  partnerCategories: null,

  clear: action((state) => {
    state.partnerID = null
    state.partners = null
    state.partner = null
    state.category = null
    state.categories = null
    state.partnerCategories = null
  }),
  setPartner: action((state, partner) => {
    state.partner = partner
  }),
  setPartners: action((state, partners) => {
    state.partners = partners
  }),
  setPartnerID: action((state, partnerID) => {
    state.partnerID = partnerID
  }),
  updatePartner: action((state, partner) => {
    state.partner = { ...state.partner, ...partner }
    const Partners = state.partners?.filter((p) => {
      p.uuid !== partner.uuid
    })
    state.partners = [...Partners, partner]
  }),
  setCategory: action((state, category) => {
    state.category = category
  }),
  setCategories: action((state, categories) => {
    state.categories = categories
  }),
  setPartnerCategories: action((state, categories) => {
    state.partnerCategories = categories
  }),
  activeCategory: computed((state) => {
    if (!state.category || !state.categories) return null
    return state.categories.find((cat) => cat.uuid === state.category.uuid)
  }),
}
export default partners
