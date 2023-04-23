import useProcessing from "@/hooks/useProcessing"
import RemoteEndpoints from "@/app/modules/endpoints"
import useApp from "@/hooks/useApp"
import { useEffect, useState } from "react"
import { filterCategory, getstages } from "@/app/modules/utilities"
// import { getRejectionReasons } from "@/app/modules/fetchData"
import { useStoreActions, useStoreState } from "easy-peasy"

export default function useAdmins() {
  const states = useStoreState((action) => action.admins)
  const actions = useStoreActions((action) => action.admins)

  const { setProcessing } = useProcessing()
  const [allCategories, setAllCategories] = useState([])
  const app = useApp()
  const rejectionReasons = app.rejectionReasons

  useEffect(() => {
    const Categories = {}
    if (states.categories?.length > 0) {
      states.categories.map((category) => {
        Categories[category.uuid] = category
      })
    }
    setAllCategories(Categories)
  }, [states.categories])
  useEffect(() => {
    if (!rejectionReasons) app.getRejectionReasons()
    // if (!rejectionReasons) getRejectionReasons(app.setRejectionReasons)
  }, [rejectionReasons])

  const getStages = (category, categories) => {
    // console.log({ category, categories })
    return getstages(category, categories)
  }
  const getAllPartners = async () => {
    try {
      setProcessing(true)
      const response = await fetch(RemoteEndpoints.ALL_PARTNERS, {
        cache: "no-store",
        next: { revalidate: 120 },
        headers: {
          token: states.token,
          "Content-Type": "application/json",
        },
      })
      const result = await response.json()
      setProcessing(false)
      if (result?.success) {
        const PartnersByStatus = {}
        const PartnersByType = {}
        const allPartners = result.data?.partners.data
        const listStatus = []
        const listTypes = []
        allPartners.map((partner) => {
          if (!PartnersByStatus[partner.contract_status]) {
            PartnersByStatus[partner.contract_status] = []
            listStatus.push(partner.contract_status)
          }
          if (!PartnersByType[partner.onboarding_type]) {
            PartnersByType[partner.onboarding_type] = []
            listTypes.push(partner.onboarding_type)
          }
          PartnersByStatus[partner.contract_status].push(partner)
          PartnersByType[partner.onboarding_type].push(partner)
        })
        return {
          partners: {
            all: allPartners,
            by_status: PartnersByStatus,
            by_type: PartnersByType,
          },
          listStatus,
          listTypes,
        }
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      }
    } catch (eror) {
      return {
        error:
          eror.message ??
          "Something went wrong. Please check your connection and try again",
      }
    }
  }
  // const getRejectionReasons = async () => {
  //   const result = {
  //     success: true,
  //     data: [
  //       {
  //         id: 1,
  //         uuid: "27cc7734-d479-11ed-ba7c-acde48001122",
  //         rejection_reason: "Incomplete Information",
  //         created_at: "2023-04-06T13:46:00.000000Z",
  //         updated_at: "2023-04-06T13:46:00.000000Z",
  //       },
  //       {
  //         id: 2,
  //         uuid: "27cc905c-d479-11ed-ba7c-acde48001122",
  //         rejection_reason: "Incorrect Information",
  //         created_at: "2023-04-06T13:46:00.000000Z",
  //         updated_at: "2023-04-06T13:46:00.000000Z",
  //       },
  //       {
  //         id: 3,
  //         uuid: "4b9f8002-d479-11ed-ba7c-acde48001122",
  //         rejection_reason: "Inconsistent Information",
  //         created_at: "2023-04-06T13:47:17.000000Z",
  //         updated_at: "2023-04-06T13:47:17.000000Z",
  //       },
  //       {
  //         id: 4,
  //         uuid: "252ac1ba-d939-11ed-ba7c-acde48001122",
  //         rejection_reason: "Invalid, Near Expiry or Expired Document",
  //         created_at: "2023-04-12T14:48:25.000000Z",
  //         updated_at: "2023-04-12T14:48:25.000000Z",
  //       },
  //       {
  //         id: 5,
  //         uuid: "252ad0a6-d939-11ed-ba7c-acde48001122",
  //         rejection_reason: "Poor Quality (Contents Not Clear)",
  //         created_at: "2023-04-12T14:48:25.000000Z",
  //         updated_at: "2023-04-12T14:48:25.000000Z",
  //       },
  //       {
  //         id: 6,
  //         uuid: "252ad98e-d939-11ed-ba7c-acde48001122",
  //         rejection_reason: "Non-Compliance with Guidelines",
  //         created_at: "2023-04-12T14:49:42.000000Z",
  //         updated_at: "2023-04-12T14:49:42.000000Z",
  //       },
  //       {
  //         id: 7,
  //         uuid: "252ae172-d939-11ed-ba7c-acde48001122",
  //         rejection_reason: "Suspected Fraud",
  //         created_at: "2023-04-12T14:50:16.000000Z",
  //         updated_at: "2023-04-12T14:50:16.000000Z",
  //       },
  //       {
  //         id: 8,
  //         uuid: "252aec26-d939-11ed-ba7c-acde48001122",
  //         rejection_reason: "Inappropriate Content",
  //         created_at: "2023-04-12T14:50:41.000000Z",
  //         updated_at: "2023-04-12T14:50:41.000000Z",
  //       },
  //       {
  //         id: 9,
  //         uuid: "75cfb5b2-d939-11ed-ba7c-acde48001122",
  //         rejection_reason: "Failure to meet legal & regulatory requirements.",
  //         created_at: "2023-04-12T14:51:44.000000Z",
  //         updated_at: "2023-04-12T14:51:44.000000Z",
  //       },
  //       {
  //         id: 10,
  //         uuid: "75cfbf12-d939-11ed-ba7c-acde48001122",
  //         rejection_reason:
  //           "No signature, date, contact name and position provided by the signatory to the document.",
  //         created_at: "2023-04-12T14:51:44.000000Z",
  //         updated_at: "2023-04-12T14:51:44.000000Z",
  //       },
  //       {
  //         id: 11,
  //         uuid: "75cfc6a6-d939-11ed-ba7c-acde48001122",
  //         rejection_reason: "Others",
  //         created_at: "2023-04-12T14:53:26.000000Z",
  //         updated_at: "2023-04-12T14:53:26.000000Z",
  //       },
  //     ],
  //   }
  //   setProcessing(true)
  //   // const response = await fetch(RemoteEndpoints.REJECTION_RESONS, {
  //   //   cache: "no-store",
  //   //   next: { revalidate: 86400 },
  //   //   headers: {
  //   //     token: states.token,
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // })
  //   // const result = await response.json()
  //   setProcessing(false)
  //   if (result?.success) {
  //     const reasons = result?.data
  //     actions.setRejectionReasons(reasons)
  //     return { reasons }
  //   }
  //   return {
  //     error:
  //       result?.data?.message ??
  //       "Something went wrong. Please check your connection and try again",
  //   }
  // }
  const ApproveField = async (formdata) => {
    var headers = new Headers()
    headers.append("token", states.token)
    headers.append("Content-Type", "application/x-www-form-urlencoded")

    var urlEncoded = new URLSearchParams()
    urlEncoded.append("partner_uuid", formdata.partner_uuid ?? "")
    urlEncoded.append("user_uuid", formdata.user_uuid ?? "")
    urlEncoded.append("category_uuid", formdata.category_uuid ?? "")
    urlEncoded.append("category_stage", formdata.category_stage ?? "")
    urlEncoded.append("admin_user", states.admin.uuid ?? "")
    urlEncoded.append("feedback", formdata.feedback ?? "")
    urlEncoded.append("status", formdata.status ?? "")
    urlEncoded.append("field", formdata.field ?? "")
    urlEncoded.append("approval_uuid", formdata.approval_uuid ?? "")
    urlEncoded.append("created_by", states.admin.uuid ?? "")

    var requestOptions = {
      method: "POST",
      headers: headers,
      body: urlEncoded,
      redirect: "follow",
    }

    const response = await fetch(
      "https://amazonpartner.com.ng/amazon/public/api/v2/admin/compliance/approve",
      requestOptions
    ).catch((error) => {
      console.log("error", error)
      return { success: false, error: error }
    })
    if (!response)
      return {
        success: false,
        error: "Unable to send request. Please check your connection",
      }
    const result = await response.json()
    if (!response)
      return {
        success: false,
        error: "Unable to receive response. Please check your connection",
      }
    const { success, data } = result
    if (!success) return { success: false, error: data.message }
    return { success: true, data, error: null }
  }
  return {
    ...states,
    ...actions,
    getAllPartners,
    allCategories,
    filterCategory,
    getStages,
    ApproveField,
    rejectionReasons,
    // getRejectionReasons,
  }
}
