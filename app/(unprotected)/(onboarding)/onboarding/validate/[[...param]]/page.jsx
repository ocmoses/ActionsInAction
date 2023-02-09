import "server-only"
import Validation from "./Validation"
import Axios from "@/app/modules/axios"
import RemoteEndpoints, {
  NextEndPoints,
  EndPointHeaders,
} from "@/app/modules/endpoints"
import { redirect } from "next/navigation"
import { PageRoutes } from "@/app/modules/menu"

const ValidateEmailAndUser = async (params) => {
  try {
    let url = ""
    let response = null
    switch (params.type) {
      case "existing":
      case "reset":
        url = `${PageRoutes.setpassword}/${params.type}/${params.user_uuid}`
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
        break
      case "new":
        url = PageRoutes.getstarted
        // url = NextEndPoints.VALIDATE_USER
        // url =  `${RemoteEndpoints.GET_USER_INFO_VALIDATED}/${params.user_uuid}`
        // response = await fetch(
        //   `${RemoteEndpoints.GET_USER_INFO_VALIDATED}/${params.user_uuid}`,
        //   {
        //     cache: "no-store",
        //     next: { revalidate: 0 },
        //     headers: {
        //       // ...EndPointHeaders
        //       apikey: `${process.env.APIKEY}`,
        //     },
        //   }
        // )
        response = await Axios.get(
          `${RemoteEndpoints.GET_USER_INFO_VALIDATED}/${params.user_uuid}`,
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
        console.log({ response })
        break
    }
    const { success, data } = response
    if (response) {
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
export default async function ValidationPage({ params: { param } }) {
  const user_uuid = param && param[0] ? param[0] : null
  const type = param && param[1] ? param[1] : null
  const Params = { user_uuid, type }
  const { data, error } = await ValidateEmailAndUser(Params)
  console.log({ data })
  console.log({ error })
  return <Validation url={data} err={error} params={Params} />
}
