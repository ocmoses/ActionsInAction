import RemoteEndPoints from "@/app/modules/endpoints"
import { getCategories } from "@/app/modules/categories"
import { set_admin_token } from "@/app/modules/utilities"

const doLogin = async (body, req, res) => {
  const response = await fetch(RemoteEndPoints.LOGIN_ADMIN, {
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
    // console.log({ result })
    const { data, success } = result
    const message = data?.message
    if (data) {
      const user = data?.user
      const authToken = data?.token
      const token = set_admin_token(authToken, req, res)

      if (!token)
        return {
          success: false,
          error: "Invalid request. We cannot create a session",
          data: user,
        }
      return { success: true, error: null, data: user }
    } else {
      if (message) {
        return { success: false, error: message, data: null }
      } else {
        return {
          success: false,
          error: `${response.status} ${response.statusText}`,
        }
      }
    }
  } else {
    return { success: false, error: "An error was encountered", data: null }
  }
}
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(200).json({ success: false, error: "Invalid request method" })
      return
    }
    const body = JSON.parse(req.body)
    const categoriesData = await getCategories(process.env.APIKEY)
    const loginData = await doLogin(body, req, res)

    // Wait for the promises to resolve
    const [user, categories] = await Promise.all([loginData, categoriesData])
    return res
      .status(200)
      .json({ success: true, error: null, data: { user, categories } })
  } catch (error) {
    console.log({ error })
    return res.status(200).json({
      success: false,
      error:
        "Something went wrong. You may need to check your internet connection",
    })
  }
}
