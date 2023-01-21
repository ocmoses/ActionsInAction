import { apiURL } from "@/app/modules/constants"
import { Decrypt } from "@/app/modules/utilities"
import { deleteCookie, getCookie, hasCookie } from "cookies-next"

export default async function handler(req, res) {
  try {
    const token = getCookie("auth-token", { req, res })
    const decrypted = token ? Decrypt(token) : null
    const response = await fetch(`${apiURL}/v1/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      Authorization: `Bearer ${decrypted}`,
    })
    await response.json()
    if (hasCookie("auth-token", { req, res }))
      deleteCookie("auth-token", { req, res })
    if (hasCookie("user_id", { req, res }))
      deleteCookie("user_id", { req, res })
    if (hasCookie("partnerid", { req, res }))
      deleteCookie("partnerid", { req, res })
    res.status(200).json({ success: true, error: null, data: null })
  } catch (error) {
    res.status(200).json({ success: false, error: error.message })
    return
  }
}
