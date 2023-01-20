import "../styles/globals.css"
import Providers from "./Providers"
import Session from "./Session"
import ResponsiveLabel from "./components/ResponsiveLabel"
import { userData, Decrypt } from "./modules/utilities"
import { apiURL } from "@/app/modules/constants"
import { cookies } from "next/headers"

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
  if (partnerid) {
    // GET USER INFO
    const partnerID = Decrypt(partnerid)
    const authToken = Decrypt(token)
    try {
      const response = await fetch(
        `${apiURL}/v1/auth/partner-info/${partnerID}`,
        {
          headers: {
            apikey: `${process.env.APIKEY}`,
            "Content-Type": "application/json",
            redirect: "follow",
            referrerPolicy: "no-referrer",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      const { success, data } = await response.json()
      if (response?.ok) {
        const User = userData(data)
        console.log(User)
        return { success, error: null, data: User }
      } else {
        if (data) {
          return { success, error: data.message, data: {} }
        } else {
          return {
            success: false,
            error: `${response.status} ${response.statusText}`,
            data: {},
          }
        }
      }
    } catch (error) {
      return { success: false, error: error.message, data: {} }
    }
  }
}
export default async function RootLayout({ children }) {
  const result = await getServerSession()
  const serverSession = {
    status: result?.data ? "authenticated" : "unauthenticated",
    user: result?.data ?? null,
  }
  return (
    <html lang="en">
      <head />
      <body>
        {process.env.NODE_ENV === "development" && <ResponsiveLabel />}
        <Providers>
          <Session serverSession={serverSession}>{children}</Session>
        </Providers>
      </body>
    </html>
  )
}
