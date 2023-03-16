import useProcessing from "@/hooks/useProcessing"
import RemoteEndpoints from "@/app/modules/endpoints"
import useApp from "@/hooks/useApp"
import { useStoreActions, useStoreState } from "easy-peasy"
import { useRouter } from "next/navigation"

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
