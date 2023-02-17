import "server-only"
import Validation from "./Validation"
import Axios from "@/app/modules/axios"
import RemoteEndpoints from "@/app/modules/endpoints"
import { PageRoutes } from "@/app/modules/menu"

const ValidateEmailAndUser = async (params) => {
  if (params.type === "existing" || params.type === "reset") {
    try {
      let response = null

      const url = `${PageRoutes.setpassword}/${params.type}/${params.user_uuid}`
      response = await Axios.post(
        RemoteEndpoints.CHECK_EMAIL_VERIFICATION_LINK,
        { user_uuid: params.user_uuid },
        {
          timeout: process.TIMEOUT,
        }
      ).catch((e) => {
        return {
          success: false,
          error: `${e.message}. Please check you connection`,
          data: null,
        }
      })
      if (response) {
        const { success, data } = response
        if (success) {
          return {
            success: true,
            error: null,
            data: url,
          }
        } else {
          return {
            success: false,
            error: data,
            data: null,
          }
        }
      } else {
        return {
          success: false,
          error: "Cannot reach the server. Please check your connection",
          data: null,
        }
      }
    } catch (err) {
      console.log({ err })
      return {
        success: false,
        error: "Something went wrong",
        data: null,
      }
    }
  }
  return {
    error: null,
    data: null,
  }
}
export default async function ValidationPage({ params: { param } }) {
  const user_uuid = param && param[0] ? param[0] : null
  const type = param && param[1] ? param[1] : null
  const Params = { user_uuid, type }

  const { data, error } = await ValidateEmailAndUser(Params)

  console.log("data", { data })
  console.log({ error })
  return <Validation url={data} err={error} params={Params} />
}
