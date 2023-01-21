import { apiURL } from "@/app/modules/constants"
import { getCookie } from "cookies-next"
import { createHttpOnlyCookie } from "@/app/modules/utilities"

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(200).json({ success: false, error: "Invalid request method" })
      return
    }
    const body = JSON.parse(req.body)
    const response = await fetch(`${apiURL}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify(body),
    })
    const result = await response.json()
    if (result?.success) {
      const { data, success } = result
      const partnerID = getCookie("partnerid", { req, res })
      const { User, authToken } = createHttpOnlyCookie(
        data,
        req,
        res,
        partnerID
      )
      if (!authToken)
        return res
          .status(200)
          .json({ success, error: "Invalid request", data: User })
      res.status(200).json({ success, error: null, data: User })
      return
    } else {
      if (result?.data) {
        const { data, success } = result
        res.status(200).json({ success, error: data.message, data: null })
        return
      } else {
        res.status(200).json({
          success: false,
          error: `${response.status} ${response.statusText}`,
        })
        return
      }
    }
  } catch (error) {
    res.status(200).json({ success: false, error: error.message })
    return
  }
}
