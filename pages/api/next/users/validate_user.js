import RemoteEndpoints from "@/app/modules/endpoints"
import { getCookie } from "cookies-next"
import { createHttpOnlyCookie } from "@/app/modules/utilities"
import { getCategories } from "@/app/modules/categories"

const validateUser = async (body, req, res) => {
  const response = await fetch(
    `${RemoteEndpoints.GET_USER_INFO_VALIDATED}/${body.user_uuid}`,
    {
      headers: {
        apikey: `${process.env.APIKEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    }
  )
  if (response) {
    const result = await response.json()
    const { data, success } = result
    if (success) {
      const partnerID = getCookie("partnerid", { req, res })
      const { User, authToken } = createHttpOnlyCookie(
        data,
        req,
        res,
        partnerID
      )
      if (!authToken) return { success, error: "Invalid request", data: User }
      return { success, error: null, data: User }
    } else {
      if (data) {
        return { success, error: data.message, data: data.user }
      } else {
        return {
          success: false,
          error: `${response.status} ${response.statusText}`,
        }
      }
    }
  } else {
    return { success: false, error: "AN error was encountered", data: null }
  }
}
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(200).json({ success: false, error: "Invalid request method" })
      return
    }
    const body = JSON.parse(req.body)

    const loginData = validateUser(body, req, res)
    const categoriesData = getCategories(process.env.APIKEY)

    // Wait for the promises to resolve
    const [User, categories] = await Promise.all([loginData, categoriesData])
    User.categories = categories
    return res.status(200).json({ success: true, error: null, data: User })
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: "Something went wrong. Please check your connection and try again",
    })
  }
}
