import "@/styles/globals.css"
import Providers from "@/app/Providers"
import Session from "@/app/Session"
import ResponsiveLabel from "@/app/components/ResponsiveLabel"
import RouteLoader from "@/app/components/RouteLoader"
import { userData, Decrypt } from "@/app/modules/utilities"
import { apiURL } from "@/app/modules/constants"
import { cookies } from "next/headers"
import { getCategories } from "@/app/modules/categories"

const getServerSession = async () => {
  try {
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
        }).catch((error) => {
          console.log("getServerSession error", error)
        })
        if (response) {
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
                error: "Something went wrong",
                data: null,
              }
            }
          }
        } else {
          return {
            success: false,
            error: "Error reaching the server. Please check your connection",
            data: null,
          }
        }
      } catch (error) {
        return { success: false, error: error.message, data: null }
      }
    } else {
      return { success: true, error: null, data: null }
    }
  } catch (err) {
    return {
      success: false,
      error: "Error reaching the server. Please check your connection",
      data: null,
    }
  }
}
export default async function RootLayout({ children }) {
  const resultGetServerSession = getServerSession()
  const resultGetCategories = getCategories(process.env.APIKEY)

  // Wait for the promises to resolve
  const [sessionData, categoriesData] = await Promise.all([
    resultGetServerSession,
    resultGetCategories,
  ])
  const categories = {
    success: categoriesData.success,
    data: null,
    error: null,
  }

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
    status: sessionData?.data ? "authenticated" : "unauthenticated",
    User: sessionData?.data ?? null,
  }
  return (
    <html lang="en">
      <head />
      <body>
        <div id="portals" className="relative"></div>
        {process.env.NODE_ENV === "development" && <ResponsiveLabel />}

        <Providers>
          <Session serverSession={serverSession} categories={categories}>
            {<RouteLoader />}
            {children}
          </Session>
        </Providers>
      </body>
    </html>
  )
}
