import { action, computed, thunk } from "easy-peasy"
import { filterPartner } from "@/app/modules/utilities"

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
    state.partnerCategory = null
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
    filterPartner(partner, state.categories)
    state.partner = { ...state.partner, ...partner }
    const category = state.category
    // console.log({ category })
    // console.log("partner.categories", partner?.categories)

    const currentCategory = partner?.categories?.find(
      (c) => c.uuid === category.uuid
    )
    // console.log("state.categories", state.categories)
    const baseCategory = state.categories?.find(
      (c) => c.uuid === currentCategory.category_uuid
    )
    currentCategory.validation = baseCategory.validation
    currentCategory.category_name = baseCategory.category_name
    state.category = currentCategory

    const Partners = state.partners?.filter((p) => {
      p.uuid !== partner?.uuid
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
