import useProcessing from "@/hooks/useProcessing"
import useApp from "@/hooks/useApp"
import { useEffect, useState } from "react"
import { filterCategory, getstages } from "@/app/modules/utilities"
import { useStoreActions, useStoreState } from "easy-peasy"
import { filterPartner } from "@/app/modules/utilities"
import { redirect } from "next/navigation"
import RemoteEndpoints, { NextEndPoints } from "@/app/modules/endpoints"

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
  }, [rejectionReasons])

  const getStages = (category, categories) => {
    return getstages(category, categories)
  }
  const getAllPartners = async (page, perPage, contractStatus) => {
    try {
      const params = []
      if (page) params.push(`page=${page}`)
      if (perPage) params.push(`per_page=${perPage}`)
      if (contractStatus) params.push(`contract_status=${contractStatus}`)

      setProcessing(true)
      const response = await fetch(
        `${RemoteEndpoints.ALL_PARTNERS}?${
          params.length > 0 ? params.join("&") : ""
        }`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            token: states.token,
            "Content-Type": "application/json",
          },
        }
      )
      if (response.status === 401) {
        redirect(NextEndPoints.LOGIN_ADMIN)
        return
      }
      console.log({ response })
      const result = await response.json()
      setProcessing(false)
      if (result?.success) {
        const partners = result.data?.partners.data
        if (partners.length > 0)
          partners.map((partner) => {
            filterPartner(partner, states.categories)
          })
        const navigation = {
          current_page: result?.data?.partners?.current_page,
          first_page_url: result?.data?.partners?.first_page_url,
          from: result?.data?.partners?.from,
          last_page: result?.data?.partners?.last_page,
          last_page_url: result?.data?.partners?.last_page_url,
          links: result?.data?.partners?.links,
          next_page_url: result?.data?.partners?.next_page_url,
          path: result?.data?.partners?.path,
          per_page: result?.data?.partners?.per_page,
          prev_page_url: result?.data?.partners?.prev_page_url,
          to: result?.data?.partners?.to,
          total: result?.data?.partners?.total,
        }

        return {
          partners,
          navigation,
        }
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      }
    } catch (error) {
      console.log({ error })
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      }
    }
  }
  const ApproveField = async (formdata) => {
    try {
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
        RemoteEndpoints.COMPLIANCE_APPROVE,
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
    } catch (error) {
      return {
        success: false,
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      }
    }
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
  }
}
