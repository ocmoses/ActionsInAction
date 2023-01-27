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
    const user_uuid = JSON.parse(req.body)
    const response = await fetchData(
      `${RemoteEndpoints.GET_USER_INFO_VALIDATED}/${user_uuid}`,
      {
        cache: "no-store",
        headers: { ...EndPointHeaders },
      }
    )
    if (response) {
      const { data, success } = response
      const { User, authToken } = createHttpOnlyCookie(data, req, res)
      if (!authToken)
        return res
          .status(200)
          .json({ success, data: { user: User, message: "Invalid request" } })
      return res.status(200).json({ success, data: User })
    } else {
      return res.status(200).json({
        success: false,
        data: { message: `${response.status} ${response.statusText}` },
      })
    }
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, data: { message: error.message } })
  }
}
