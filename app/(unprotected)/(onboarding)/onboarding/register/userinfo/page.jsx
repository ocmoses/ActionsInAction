import UserInfo from "./UserInfo"
import { apiURL } from "@/app/modules/constants"

const getDesignations = async () => {
  try {
    const response = await fetch(`${apiURL}/v1/your-roles`, {
      headers: {
        apikey: `${process.env.APIKEY}`,
        "Content-Type": "application/json",
        redirect: "follow",
        referrerPolicy: "no-referrer",
      },
    })
    const { success, data } = await response.json()
    if (response?.ok) {
      console.log(data)
      return { success, error: null, data }
    } else {
      if (data) {
        return { success, error: data.message, data: {} }
      } else {
        return {
          success: false,
          error: `${response.status} ${response.statusText}`,
          data: {},
        }
      }
    }
  } catch (error) {
    return { success: false, error: error.message, data: {} }
  }
  s
}

async function UserInfoPage() {
  const designations = await getDesignations()

  return <UserInfo designations={designations} />
}

export default UserInfoPage
