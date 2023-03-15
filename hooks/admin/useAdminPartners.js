import useProcessing from "@/hooks/useProcessing"
import useRegistration from "@/hooks/useRegistration"
import useErrors from "@/hooks/useErrors"
import RemoteEndpoints from "@/app/modules/endpoints"
import Axios from "@/app/modules/axios"
import useApp from "@/hooks/useApp"
import useUsers from "@/hooks/useUsers"
import { PageRoutes } from "@/app/modules/menu"
import { fetchData } from "@/app/modules/fetchData"
import { apiURL } from "@/app/modules/constants"
import { useStoreActions, useStoreState } from "easy-peasy"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { proxyFetch, userData } from "@/app/modules/utilities"
import { forms } from "@/app/modules/constants"
import { getCategories } from "@/app/modules/categories"

export default function useAdminPartners() {
  const router = useRouter()
  const { setProcessing } = useProcessing()
  const app = useApp()
  const actions = useStoreActions((action) => action)
  const states = useStoreState((state) => state)

  const getAllPartners = async () => {
    const response = await fetch(RemoteEndpoints.ALL_PARTNERS, {
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        apikey: process.env.NEXT_PUBLIC_APIKEY,
        "Content-Type": "application/json",
      },
    })
    const result = await response.json()
    if (result.success) return { partners: result.data.partners }
    return { error: data?.message ?? "Something went wrong" }
  }

  return {
    ...states.partners,
    ...actions.partners,
    getAllPartners,
  }
}
