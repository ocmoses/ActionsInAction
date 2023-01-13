import { action, computed, thunk } from "easy-peasy"
const partners = {
  partners: [],
  partner: {},
  isLoggedIn: computed((state) => state.partner.id != null),
  setPartner: action((state, partner) => {
    state.partner = partner
  }),
  setPartners: action((state, partners) => {
    state.partners = partners
  }),
  updatePartner: action((state, partner) => {
    state.partner = { ...state.partner, ...partner }
  }),
  updatePartners: action((state, partner) => {
    state.partners = [...state.partners, ...partner]
  }),
  login: thunk(async (actions) => {
    try {
      const res = await axios.get(`/api/partner/login`)
      actions.updatePartner(res?.data?.response?.partner)
    } catch (error) {
      console.log(error)
    }
  }),
  getPartner: thunk(async (actions) => {
    try {
      const res = await axios.get(`/api/partner/getPartner`)
      actions.updatePartner(res?.data?.response?.partner)
    } catch (error) {
      console.log(error)
    }
  }),
}
export default partners
