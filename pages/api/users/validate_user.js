import RemoteEndpoints, { EndPointHeaders } from "@/app/modules/endpoints"
import { fetchData } from "@/app/modules/fetchData"
import { createHttpOnlyCookie } from "@/app/modules/utilities"

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res
        .status(200)
        .json({ success: false, data: { message: "Invalid request method" } })
      return
    }
    const user_uuid = req.body.user_uuid
    const response = await fetch(
      `${RemoteEndpoints.GET_USER_INFO_VALIDATED}/${user_uuid}`,
      {
        cache: "no-store",
        headers: { ...EndPointHeaders },
      }
    )
    if (response) {
      const result = await response.json()
      // console.log({ result })
      const { data, success } = result
      if (success) {
        const { User, authToken } = createHttpOnlyCookie(data, req, res)
        if (!authToken)
          return res.status(200).json({
            success: false,
            data: {
              message: "Invalid requiest. Unable to proceed.",
            },
          })
        return res.status(200).json({ success, data: User })
      }

      return res.status(200).json({ success, data })
    } else {
      return res.status(200).json({
        success: false,
        data: { message: `${response.status} ${response.statusText}` },
      })
    }
  } catch (error) {
    // console.log({ error })
    return res
      .status(200)
      .json({ success: false, data: { message: error.message } })
  }
}
