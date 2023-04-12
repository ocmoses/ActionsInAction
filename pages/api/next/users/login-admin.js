import RemoteEndPoints from "@/app/modules/endpoints"
import { getCategories } from "@/app/modules/categories"
import { set_admin_token } from "@/app/modules/utilities"

const doLogin = async (body, req, res) => {
  const response = await fetch(RemoteEndPoints.LOGIN_ADMIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body: JSON.stringify(body),
  })

  if (!response)
    return {
      success: false,
      error: "Unable to fetch data. Please check your connection",
      data: null,
    }

  const result = await response.json()
  if (!result)
    return {
      success: false,
      error: "Unable to fetch data. Please check your connection",
      data: null,
    }
  const { success, data } = result

  if (!success) return { success: false, error: data.message, data: null }
  const { token, user } = data
  if (!user)
    return {
      success: false,
      error: "Unable to fetch data. Please check your connection",
      data: null,
    }
  const authtoken = set_admin_token(token, user.uuid, req, res)
  if (!authtoken)
    return {
      success: false,
      error: "Invalid request. We cannot create a session",
      data: { user, token: authtoken },
    }
  return { success: true, error: null, data: { user, token: authtoken } }
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
    const [User, categories] = await Promise.all([loginData, categoriesData])
    if (User.error)
      return res
        .status(200)
        .json({ success: false, error: User.error, data: null })
    if (categories.error)
      return res
        .status(200)
        .json({ success: false, error: User.error, data: null })
    return res.status(200).json({
      success: true,
      error: null,
      data: { user: User.data, categories: categories.data },
    })
  } catch (error) {
    console.log({ error })
    return res.status(200).json({
      success: false,
      error: "Something went wrong. Please check your connection and try again",
    })
  }
}
