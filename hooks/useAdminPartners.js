import useProcessing from "@/hooks/useProcessing"
import RemoteEndpoints from "@/app/modules/endpoints"

import useApp from "@/hooks/useApp"
import useAdmins from "@/hooks/useAdmins"
import { useStoreActions, useStoreState } from "easy-peasy"
import { useRouter } from "next/navigation"

export default function useAdminPartners() {
  const router = useRouter()
  const { setProcessing } = useProcessing()
  const app = useApp()
  const admins = useAdmins()

  const getAllPartners = async () => {
    setProcessing(true)
    const response = await fetch(RemoteEndpoints.ALL_PARTNERS, {
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        token: admins.token,
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

  return {
    getAllPartners,
  }
}
