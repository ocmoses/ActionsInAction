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
    // User session
    const token = nextCookies.has("auth-token")
      ? nextCookies.get("auth-token")?.value
      : null
    const partnerid = nextCookies.has("partnerid")
      ? nextCookies.get("partnerid")?.value
      : null
    const user_id = nextCookies.has("user_id")
      ? nextCookies.get("user_id")?.value
      : null

    // Admin session
    const adminToken = nextCookies.has("token")
      ? nextCookies.get("token")?.value
      : null
    const uuid = nextCookies.has("uuid") ? nextCookies.get("uuid")?.value : null
    console.log({ uuid })
    if (uuid) {
      console.log({ uuidfound: uuid })
      // GET USER INFO
      const Decrypttoken = token ? Decrypt(adminToken) : null
      return {
        success: true,
        error: null,
        data: {
          created_at: "2023-02-27T07:01:59.000000Z",
          department: "Charging VAS and Financial Services NG",
          email: "olabode.gbolu@mtn.com",
          id: 2,
          role: "super-admin",
          updated_at: "2023-02-27T07:01:59.000000Z",
          username: "olabodg",
          uuid: "806d6188-b664-11ed-84a8-f23324f5673",
        },
        type: "admin",
        token: adminToken,
      }
      // try {
      //   const response = await fetch(`${apiURL}/v1/auth/authenticated-user`, {
      //     headers: {
      //       apikey: `${process.env.APIKEY}`,
      //       "Content-Type": "application/json",
      //       redirect: "follow",
      //       referrerPolicy: "no-referrer",
      //       Authorization: `Bearer ${authToken}`,
      //     },
      //   }).catch((error) => {
      //     return {
      //       success: false,
      //       error: error.message,
      //       data: null,
      //     }
      //   })
      //   if (response) {
      //     const { success, data } = await response.json()
      //     if (response?.ok) {
      //       const User = userData(data)
      //       return { success, error: null, data: User }
      //     } else {
      //       if (data) {
      //         return { success: false, error: data.error, data: null }
      //       } else {
      //         return {
      //           success: false,
      //           error:
      //             "Error. No data was returned from the server. Please try again",
      //           data: null,
      //         }
      //       }
      //     }
      //   } else {
      //     return {
      //       success: false,
      //       error: "Error reaching the server. Please check your connection",
      //       data: null,
      //     }
      //   }
      // } catch (error) {
      //   return { success: false, error: error.message, data: null }
      // }
    } else if (user_id) {
      console.log({ user_idfound: user_id })
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
          return {
            success: false,
            error: error.message,
            data: null,
          }
        })
        if (response) {
          const { success, data } = await response.json()
          if (response?.ok) {
            const User = userData(data)
            if (partnerID && User.partners?.length > 0) {
              User.partnerID = partnerID
              User.partner = User.partners.find((p) => p.uuid === partnerID)
            }
            return { success, error: null, data: User, type: "user" }
          } else {
            if (data) {
              return { success: false, error: data.error, data: null }
            } else {
              return {
                success: false,
                error: "No data was return from the server. Please try again",
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
    console.log({ err })
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
  console.log({ sessionData })
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
    error: sessionData?.error ?? null,
    type: sessionData?.type,
    token: sessionData?.type === "admin" ? sessionData?.token : "",
  }
  console.log({ serverSession })
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
