import useProcessing from "@/hooks/useProcessing"
import RemoteEndpoints from "@/app/modules/endpoints"
import { useEffect, useState } from "react"
import { filterCategory } from "@/app/modules/utilities"

import { useStoreActions, useStoreState } from "easy-peasy"

export default function useAdmins() {
  const states = useStoreState((action) => action.admins)
  const actions = useStoreActions((action) => action.admins)

  const { setProcessing } = useProcessing()
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    const Categories = {}
    if (states.categories?.length > 0) {
      states.categories.map((category) => {
        Categories[category.uuid] = category
      })
    }
    setAllCategories(Categories)
  }, [states.categories])

  const getStages = (category) => {
    if (!category) return
    const baseCategory = states.categories?.find(
      (c) => c.uuid === category.category_uuid
    )
    if (!baseCategory) return
    category.category_name = baseCategory.category_name
    category.category_code = baseCategory.category_code
    category.icon = baseCategory.icon
    category.validation = baseCategory.validation

    const stages = states.stages
    const filled = []
    const forms = []
    if (!stages?.length) return
    stages.map((stage) => {
      if (
        category?.profile_stage &&
        stage in category?.profile_stage &&
        category?.profile_stage[stage] === "1"
      )
        filled.push(stage)
      if (
        (typeof category?.validation !== "undefined" &&
          stage in category?.validation &&
          category?.validation[stage] === "r") ||
        category?.validation[stage] === "o"
      )
        forms.push(stage)
    })
    return { forms, filled }
  }
  const getAllPartners = async () => {
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
    if (result?.success) return { partners: result.data?.partners.data }
    return {
      error:
        result?.data?.message ??
        "Something went wrong. Please check your connection and try again",
    }
  }
  const getRejectionReasons = async () => {
    setProcessing(true)
    const response = await fetch(RemoteEndpoints.REJECTION_RESONS, {
      cache: "no-store",
      next: { revalidate: 86400 },
      headers: {
        token: states.token,
        "Content-Type": "application/json",
      },
    })
    const result = await response.json()
    setProcessing(false)
    if (result?.success) {
      const reasons = result?.data
      actions.setRejectionReasons(reasons)
      return { reasons }
    }
    return {
      error:
        result?.data?.message ??
        "Something went wrong. Please check your connection and try again",
    }
  }
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
    getRejectionReasons,
  }
}
