import RemoteEndpoints, { EndPointHeaders } from "@/app/modules/endpoints"
import GetStarted from "./GetStarted"

export const getCategories = async () => {
  const response = await fetch(RemoteEndpoints.CATEGORIES, {
    method: "GET",
    headers: {
      ...EndPointHeaders,
      apikey: `${process.env.NEXT_PUBLIC_APIKEY}`,
    },
    redirect: "follow",
    next: { revalidate: 60 * 60 * 24 },
  }).catch((error) => {
    console.log("error", error)
  })
  return await response?.json()
}

export default async function Page() {
  const categories = await getCategories()
  return <GetStarted data={categories} />
}
