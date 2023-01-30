import Validation from "./Validation"
import RemoteEndpoints, {
  NextEndPoints,
  EndPointHeaders,
} from "@/app/modules/endpoints"
import { PageRoutes } from "@/app/modules/menu"
let processed = false
const ValidateEmailUser = async (payload) => {
  if (processed) return
  try {
    let url = ""
    let response = null
    switch (payload.type) {
      case "existing":
      case "reset":
        response = await fetch(RemoteEndpoints.CHECK_EMAIL_VERIFICATION_LINK, {
          method: "POST",
          headers: {
            ...EndPointHeaders,
          },
          cache: "no-store",
          body: JSON.stringify({ user_uuid: payload.user_uuid }),
        })
        break
      case "new":
        response = await fetch(
          `${RemoteEndpoints.GET_USER_INFO_VALIDATED}/${payload.user_uuid}`,
          {
            cache: "no-store",
            headers: { ...EndPointHeaders },
          }
        )
        break
    }
    const results = await response?.json()
    processed = true
    console.log({ results })

    if (results) {
      return results
      // const { success, data } = results
      // console.log({ data })
      // console.log({ success })
      // if (success) {
      //   switch (payload.type) {
      //     case "existing":
      //     case "reset":
      //       url = `${PageRoutes.setpassword}/${payload.type}`
      //       break
      //     case "new":
      //       url = PageRoutes.getstarted
      //       break
      //   }
      //   return { success: true, error: null, data: url }
      // } else {
      //   console.log("data, data", data)
      //   if (data) {
      //     return {
      //       success: false,
      //       error: data.message,
      //       data: null,
      //     }
      //   } else {
      //     return {
      //       success: false,
      //       error: data.message ?? "Something went wrong",
      //       data: null,
      //     }
      //   }
      // }
    } else {
      return {
        success: false,
        error: "Something went wrong",
        data: null,
      }
    }
  } catch (err) {
    console.log({ err })
    return { success: false, error: JSON.stringify(err), data: null }
  }
}
export default async function ValidationPage({ params: { param } }) {
  console.log({ param })
  const user_uuid = param && param[0] ? param[0] : null
  const type = param && param[1] ? param[1] : null
  const Params = { user_uuid, type }
  console.log({ Params })
  const result = await ValidateEmailUser(Params)
  console.log({ result })
  return <Validation params={result} />
}
