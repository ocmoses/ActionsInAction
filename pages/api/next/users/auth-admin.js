import RemoteEndPoints from "@/app/modules/endpoints"
import { Decrypt } from "@/app/modules/utilities"
import { deleteCookie, getCookie, hasCookie } from "cookies-next"

export default async function handler(req, res) {
  try {
    const token = hasCookie("token", { req, res })
      ? getCookie("token", { req, res })
      : null
    if (!token)
      return res
        .status(200)
        .json({ success: false, error: "Invalid session. Please login" })
    const response = await fetch(RemoteEndPoints.ADMIN_AUTH_USER, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    })
    const result = await response.json()
    console.log({ result })

    res.status(200).json({ success: true, error: null, data: result })
  } catch (error) {
    console.log({ error })
    return res.status(200).json({ success: false, error: error.message })
  }
}
