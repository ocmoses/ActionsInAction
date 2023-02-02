import RemoteEndPoints from "@/app/modules/endpoints"
import { getCookie } from "cookies-next"
import { createHttpOnlyCookie } from "@/app/modules/utilities"
const getCategories = async () => {
  try {
    const response = await fetch(RemoteEndPoints.CATEGORIES, {
      method: "GET",
      headers: {
        apikey: `${process.env.APIKEY}`,
        "Content-Type": "application/json",
      },
      redirect: "follow",
      next: { revalidate: 60 * 60 * 24 },
    }).catch(() => {
      return {
        success: false,
        error: "Error reaching the server. Please check your connection",
        data: null,
      }
    })

    if (response) {
      const result = await response.json()
      const { data, success } = result
      if (success) {
        return { success, error: null, data }
      } else {
        if (data) {
          return { success, error: data.message, data: null }
        } else {
          return {
            success: false,
            error: `${response.status} ${response.statusText}`,
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
  } catch (err) {
    return {
      success: false,
      error: err.message,
      data: null,
    }
  }
}
const doLogin = async (body, req, res) => {
  const response = await fetch(RemoteEndPoints.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body: JSON.stringify(body),
  })
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
        return { success, error: data.message, data: null }
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

    const loginData = doLogin(body, req, res)
    const categoriesData = getCategories()

    // Wait for the promises to resolve
    const [User, categories] = await Promise.all([loginData, categoriesData])
    User.categories = categories
    console.log("Login User", User)
    return res.status(200).json({ success: true, error: null, data: User })
  } catch (error) {
    console.log({ error })
    return res.status(200).json({
      success: false,
      error:
        "Something went wrong. You may need to check your internet connection",
    })
  }
}
