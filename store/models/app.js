import { action, thunk } from "easy-peasy"
import RemoteEndpoints from "@/app/modules/endpoints"

const app = {
  count: 0,
  errors: {},
  globalerrors: [],
  success: null,
  processing: false,
  loading: {},
  routeloading: false,
  form: null,
  formSteps: [],
  allforms: [
    "userinfo",
    "category",
    "compliance",
    "companydetail",
    "ncclicense",
    "nlrclicense",
    "shortcode",
    "indemnity",
    "accountinfo",
  ],
  formValidation: {},
  activeCategory: {},
  tmpUserUUID: null,
  showGetstartedLink: false,
  is_previewing_doc: false,
  doc_preview_path: "",
  increaseCount: action((state, key) => {
    return state.count++
  }),
  rejectionReasons: null,
  clear: action((state) => {
    state.count = 0
    state.errors = {}
    state.globalerrors = []
    state.success = null
    state.processing = false
    state.loading = {}
    state.routeloading = false
    state.form = null
    state.formSteps = []
    state.allforms = [
      "userinfo",
      "category",
      "compliance",
      "companydetail",
      "ncclicense",
      "nlrclicense",
      "shortcode",
      "indemnity",
      "accountinfo",
    ]
    state.formValidation = {}
    state.activeCategory = {}
    state.tmpUserUUID = null
    state.showGetstartedLink = false
    state.is_previewing_doc = false
    state.doc_preview_path = ""
    state.rejectionReasons = null
  }),
  setRejectionReasons: action((state, reasons) => {
    state.rejectionReasons = reasons
  }),
  getRejectionReasons: thunk(async (actions, current, helpers) => {
    const states = helpers.getStoreState()
    const result = {
      success: true,
      data: [
        {
          id: 1,
          uuid: "27cc7734-d479-11ed-ba7c-acde48001122",
          rejection_reason: "Incomplete Information",
          created_at: "2023-04-06T13:46:00.000000Z",
          updated_at: "2023-04-06T13:46:00.000000Z",
        },
        {
          id: 2,
          uuid: "27cc905c-d479-11ed-ba7c-acde48001122",
          rejection_reason: "Incorrect Information",
          created_at: "2023-04-06T13:46:00.000000Z",
          updated_at: "2023-04-06T13:46:00.000000Z",
        },
        {
          id: 3,
          uuid: "4b9f8002-d479-11ed-ba7c-acde48001122",
          rejection_reason: "Inconsistent Information",
          created_at: "2023-04-06T13:47:17.000000Z",
          updated_at: "2023-04-06T13:47:17.000000Z",
        },
        {
          id: 4,
          uuid: "252ac1ba-d939-11ed-ba7c-acde48001122",
          rejection_reason: "Invalid, Near Expiry or Expired Document",
          created_at: "2023-04-12T14:48:25.000000Z",
          updated_at: "2023-04-12T14:48:25.000000Z",
        },
        {
          id: 5,
          uuid: "252ad0a6-d939-11ed-ba7c-acde48001122",
          rejection_reason: "Poor Quality (Contents Not Clear)",
          created_at: "2023-04-12T14:48:25.000000Z",
          updated_at: "2023-04-12T14:48:25.000000Z",
        },
        {
          id: 6,
          uuid: "252ad98e-d939-11ed-ba7c-acde48001122",
          rejection_reason: "Non-Compliance with Guidelines",
          created_at: "2023-04-12T14:49:42.000000Z",
          updated_at: "2023-04-12T14:49:42.000000Z",
        },
        {
          id: 7,
          uuid: "252ae172-d939-11ed-ba7c-acde48001122",
          rejection_reason: "Suspected Fraud",
          created_at: "2023-04-12T14:50:16.000000Z",
          updated_at: "2023-04-12T14:50:16.000000Z",
        },
        {
          id: 8,
          uuid: "252aec26-d939-11ed-ba7c-acde48001122",
          rejection_reason: "Inappropriate Content",
          created_at: "2023-04-12T14:50:41.000000Z",
          updated_at: "2023-04-12T14:50:41.000000Z",
        },
        {
          id: 9,
          uuid: "75cfb5b2-d939-11ed-ba7c-acde48001122",
          rejection_reason: "Failure to meet legal & regulatory requirements.",
          created_at: "2023-04-12T14:51:44.000000Z",
          updated_at: "2023-04-12T14:51:44.000000Z",
        },
        {
          id: 10,
          uuid: "75cfbf12-d939-11ed-ba7c-acde48001122",
          rejection_reason:
            "No signature, date, contact name and position provided by the signatory to the document.",
          created_at: "2023-04-12T14:51:44.000000Z",
          updated_at: "2023-04-12T14:51:44.000000Z",
        },
        {
          id: 11,
          uuid: "75cfc6a6-d939-11ed-ba7c-acde48001122",
          rejection_reason: "Others",
          created_at: "2023-04-12T14:53:26.000000Z",
          updated_at: "2023-04-12T14:53:26.000000Z",
        },
      ],
    }
    // const response = await fetch(RemoteEndpoints.REJECTION_RESONS, {
    //   cache: "no-store",
    //   next: { revalidate: 86400 },
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    // const result = await response.json()
    if (result?.success) {
      const reasons = result?.data
      actions.setRejectionReasons(reasons)
      // console.log({ reasons })
      return { reasons }
    }
    return actions.setError({
      app:
        result?.data?.message ??
        "Something went wrong. Please check your connection and try again",
    })
    // return {
    //   error:
    //     result?.data?.message ??
    //     "Something went wrong. Please check your connection and try again",
    // }
  }),
  setRouteloading: action((state, status) => {
    state.routeloading = status ?? false
  }),
  setTmpUserUUID: action((state, uuid) => {
    state.tmpUserUUID = uuid
  }),
  setIsPreviewingDoc: action((state, status) => {
    state.is_previewing_doc = status ?? false
  }),
  setPreviewingPath: action((state, path) => {
    state.doc_preview_path = path ?? ""
  }),
  toggleGetstartedLink: action((state, status) => {
    state.showGetstartedLink = status ?? false
  }),
  isLoading: action((state, key) => {
    return state.loading && state.loading[key] !== "undefined"
  }),
  setError: action((state, errorObject) => {
    state.errors = { ...state.errors, ...errorObject }
  }),

  setSuccess: action((state, message) => {
    state.success = message
  }),
  removeError: action((state, errorKey) => {
    delete state.errors[errorKey]
  }),

  clearErrors: action((state) => {
    state.errors = {}
    state.success = null
  }),
  setGlobalError: action((state, error) => {
    state.globalerrors = [...state.globalerrors, error]
  }),
  removeGlobalError: action((state, index) => {
    state.globalerrors.splice(index, 1)
  }),
  clearGlobalErrors: action((state) => {
    state.globalerrors = []
  }),
  setGlobalError: action((state, error) => {
    state.globalerrors = [...state.globalerrors, error]
  }),
  removeGlobalError: action((state, index) => {
    state.globalerrors.splice(index, 1)
  }),
  clearGlobalErrors: action((state) => {
    state.globalerrors = []
  }),
  setProcessing: action((state, status) => {
    state.processing = status
  }),
  startLoading: action((state, key) => {
    state.loading = { ...state.loading, [key]: true }
  }),
  endLoading: action((state, key) => {
    if (state.loading[key]) delete state.loading[key]
  }),

  setActiveCategory: action((state, uuid) => {
    state.activeCategory = uuid
  }),
  setForm: action((state, form) => {
    state.form = form
  }),
  setFormSteps: action((state, validation) => {
    state.formSteps = validation?.allForms?.all
    state.formValidation = {
      required: validation?.required,
      optional: validation?.optional,
    }
  }),
  moveToNextForm: thunk((actions, current, helpers) => {
    const states = helpers.getStoreState()

    if (!current || current?.length < 1) {
      actions.setForm(null)
    } else {
      const currentForm = current[0]
      const useCurrent = current?.length > 1 ? true : false
      const index = states.app?.formSteps?.indexOf(currentForm)
      if (useCurrent) {
        // MOVE TO SELECTED FORM
        actions.setForm(currentForm)
      } else {
        if (index === states.app?.formSteps?.length - 1) {
          // If next for is last then move to preview
          actions.setForm("review")
        } else {
          // move to next form in stack
          const nextSection =
            states.app?.formSteps?.length && states.app?.formSteps[index + 1]
              ? states.app?.formSteps[index + 1]
              : null

          actions.setForm(nextSection)
        }
      }
    }
  }),
  moveToPrevForm: action((state, current) => {
    if (!current) {
      state.form = null
    } else {
      const index = state.formSteps?.indexOf(current)
      if (index === 0) {
        state.form = state.formSteps[1]
      } else {
        state.form =
          state.formSteps?.length && state.formSteps[index - 1]
            ? state.formSteps[index - 1]
            : null
      }
    }
  }),
}
export default app
