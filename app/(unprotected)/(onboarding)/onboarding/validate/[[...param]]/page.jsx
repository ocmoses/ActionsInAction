import Validation from "./Validation"
import RemoteEndpoints, {
  NextEndPoints,
  EndPointHeaders,
} from "@/app/modules/endpoints"

const ValidateEmailAndUser = async (params) => {
  try {
    let url = ""
    switch (params.type) {
      case "existing":
      case "reset":
        url = RemoteEndpoints.CHECK_EMAIL_VERIFICATION_LINK
        break
      case "new":
        url = NextEndPoints.VALIDATE_USER
        break
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...EndPointHeaders,
        apikey: `${process.env.NEXT_PUBLIC_APIKEY}`,
      },
      cache: "no-store",
      body: JSON.stringify({ user_uuid: params.user_uuid }),
    })

    const { success, data } = await response?.json()
    console.log({ data })
    console.log({ success })

    if (success) {
      switch (params.type) {
        case "existing":
        case "reset":
          url = `${PageRoutes.setpassword}/${params.type}`
          break
        case "new":
          url = PageRoutes.getstarted
          break
      }
      return { success: true, error: null, data: url }
    } else {
      return {
        success: false,
        error: data.message ?? "Something went wrong",
        data: null,
      }
    }
  } catch (err) {
    return { success: false, error: JSON.stringify(err), data: null }
  }
}
export default async function ValidationPage({ params: { param } }) {
  const user_uuid = param && param[0] ? param[0] : null
  const type = param && param[1] ? param[1] : null
  const Params = { user_uuid, type }
  const result = await ValidateEmailAndUser(Params)
  return <Validation params={result} />
}
