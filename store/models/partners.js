import { action, computed, thunk } from "easy-peasy"
const partners = {
  partnerID: null,
  partners: [],
  partner: {
    uuid: "",
    partnerid: "",

    // userinfo
    first_name: "Olabode",
    last_name: "Gbolu",
    email: "princemorpheus@gmail.com",
    countrycode: "234",
    telephone: "08090956548",
    password: "Password12345%",
    password_confirmed: "Password12345%",

    // category
    category_id: "",

    // companyinfo
    company_name: "",
    company_role: "",
    designation: "",
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
    const Partners = state.partners.filter((p) => {
      p.uuid !== partner.uuid
    })
    state.partners = [...Partners, partner]
  }),
}
export default partners
