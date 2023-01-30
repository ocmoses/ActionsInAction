import Validation from "./Validation"
import RemoteEndpoints, {
  NextEndPoints,
  EndPointHeaders,
} from "@/app/modules/endpoints"
import { PageRoutes } from "@/app/modules/menu"

const ValidateEmailAndUser = async (params) => {
  try {
    let url = ""
    let response = null
    switch (params.type) {
      case "existing":
      case "reset":
        response = await fetch(RemoteEndpoints.CHECK_EMAIL_VERIFICATION_LINK, {
          method: "POST",
          headers: {
            ...EndPointHeaders,
          },
          cache: "no-store",
          body: JSON.stringify({ user_uuid: params.user_uuid }),
        })
        break
      case "new":
        response = await fetch(
          `${RemoteEndpoints.GET_USER_INFO_VALIDATED}/${params.user_uuid}`,
          {
            cache: "no-store",
            headers: { ...EndPointHeaders },
          }
        )
        break
    }

    const results = await response?.json()
    console.log({ results })
    const { success, data } = results
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
    console.log({ err })
    return { success: false, error: JSON.stringify(err), data: null }
  }
}
export default async function ValidationPage({ params: { param } }) {
  const user_uuid = param && param[0] ? param[0] : null
  const type = param && param[1] ? param[1] : null
  const Params = { user_uuid, type }
  const result = await ValidateEmailAndUser(Params)
  console.log({ result })
  return <Validation params={result} />
}
