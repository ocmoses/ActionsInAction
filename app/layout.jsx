import "@/styles/globals.css"
import Providers from "@/app/Providers"
import Session from "@/app/Session"
import ResponsiveLabel from "@/app/components/ResponsiveLabel"
import { userData, Decrypt } from "@/app/modules/utilities"
import { apiURL } from "@/app/modules/constants"
import { cookies } from "next/headers"
import RemoteEndpoints, { EndPointHeaders } from "@/app/modules/endpoints"

const getCategories = async () => {
  const response = await fetch(RemoteEndpoints.CATEGORIES, {
    method: "GET",
    headers: {
      apikey: `${process.env.APIKEY}`,
    },
    redirect: "follow",
    next: { revalidate: 60 * 60 * 24 },
  }).catch((error) => {
    console.log("error", error)
  })
  return await response?.json()
}

const getServerSession = async () => {
  const nextCookies = cookies()
  const token = nextCookies.has("auth-token")
    ? nextCookies.get("auth-token")?.value
    : null
  const partnerid = nextCookies.has("partnerid")
    ? nextCookies.get("partnerid")?.value
    : null
  const user_id = nextCookies.has("user_id")
    ? nextCookies.get("user_id")?.value
    : null

  if (user_id) {
    // GET USER INFO
    const authToken = token ? Decrypt(token) : null
    const partnerID = partnerid ? Decrypt(partnerid) : null
    try {
      const response = await fetch(`${apiURL}/v1/auth/authenticated-user`, {
        headers: {
          apikey: `${process.env.APIKEY}`,
          "Content-Type": "application/json",
          redirect: "follow",
          referrerPolicy: "no-referrer",
          Authorization: `Bearer ${authToken}`,
        },
      })
      const { success, data } = await response.json()
      if (response?.ok) {
        const User = userData(data)
        if (partnerID && User.partners?.length > 0) {
          User.partnerID = partnerID
          User.partner = User.partners.find((p) => p.uuid === partnerID)
        }
        return { success, error: null, data: User }
      } else {
        if (data) {
          return { success: false, error: data.error, data: null }
        } else {
          return {
            success: false,
            error: `${response.status} ${response.statusText}`,
            data: null,
          }
        }
      }
    } catch (error) {
      return { success: false, error: error.message, data: null }
    }
  }
}
export default async function RootLayout({ children }) {
  //
  // const categories = await getCategories()
  // const result = await getServerSession()

  const resultGetServerSession = getServerSession()
  const resultGetCategories = getCategories()

  // Wait for the promises to resolve
  const [result, categoriesData] = await Promise.all([
    getServerSession,
    getCategories,
  ])
  const categories = { data: null, error: null }

  if (categoriesData) {
    if (categoriesData?.success) {
      categories.data = categoriesData.data
    } else {
      categories.error = categoriesData.message
    }
  } else {
    categories.error = "Error fetching categories"
  }

  const serverSession = {
    status: result?.data ? "authenticated" : "unauthenticated",
    User: result?.data ?? null,
  }
  return (
    <html lang="en">
      <head />
      <body>
        <div id="portals" className="relative"></div>
        {process.env.NODE_ENV === "development" && <ResponsiveLabel />}
        <Providers>
          <Session serverSession={serverSession} categories={categories}>
            {children}
          </Session>
        </Providers>
      </body>
    </html>
  )
}
