import { action, computed, thunk } from "easy-peasy"
import { proxyFetch } from "@/app/modules/utilities"
const partners = {
  partners: [],
  partner: {
    partnerid: "",

    // userinfo
    first_name: "",
    last_name: "",
    email: "",
    countrycode: "234",
    telephone: "",
    password: "",
    password_confirmed: "",

    //  companyinfo
    company_name: "",
    company_role: "",

    // category
    category_id: [],

    // companyinfo
    company_name: "",
    country: "NG",
    company_address: "",
    company_city: "",
    company_state: "",
    company_postcode: "",

    // compliance
    rc_no: "",
    tin_no: "",
    tin_doc: "",
    memart_doc: "",
    cac_doc: "",

    // ncclicense
    vas_license_id: "",
    ncc_issue_date: "",
    ncc_expiry_date: "",
    ncc_doc: "",

    // nlrclicense
    nlrc_license_id: "",
    nlrc_issue_date: "",
    nlrc_expiry_date: "",
    nlrc_doc: "",

    // shortcode
    shortcode: "",
    shortcode_issue_date: "",
    shortcode_expiry_date: "",
    shortcode_price_issue_date: "",
    shortcode_price_expiry_date: "",
    shortcode_doc: "",
    shortcode_approval_doc: "",

    // indemnity
    indemnity_no: "",
    indemnity_issue_date: "",
    indemnity_expiry_date: "",
    indemnity_doc: "",

    // accountinfo
    account_name: "",
    account_no: "",
    bank: "",
    audited_account_1: "",
    audited_account_2: "",
    audited_account_3: "",
  },
  isLoggedIn: computed((state) => state.partner.id != null),
  setPartner: action((state, partner) => {
    state.partner = partner
  }),
  setPartners: action((state, partners) => {
    state.partners = partners
  }),
  updatePartner: action((state, partner) => {
    state.partner = { ...state.partner, ...partner }
    const Partners = state.partners.filter((p) => {
      p.uuid !== partner.uuid
    })
    state.partners = [...Partners, partner]
  }),
  getPartner: thunk(async (actions, partnerid) => {
    try {
      const result = await proxyFetch(
        `${apiURL}/v1/auth/partner-info/${partnerid}`,
        {
          // cache: "no-store",
          next: { revalidate: 0 },
        }
      )
      const { success, error, data } = result
      if (success) return data
    } catch (error) {
      console.log(error)
    }
  }),
}
export default partners
