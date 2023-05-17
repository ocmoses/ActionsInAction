"use client"
import { useStoreActions, useStoreState } from "easy-peasy"
import { NextEndPoints } from "@/app/modules/endpoints"

export default function useUsers() {
  const states = useStoreState((action) => action.users)
  const actions = useStoreActions((action) => action.users)

  const handleLogin = async (data) => {
    const response = await fetch(NextEndPoints.LOGIN, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
    const result = await response.json()
    const { data: userdata, error } = result
    if (!userdata && error) {
      return { success: false, error, userdata: null }
    }
    if (!userdata.success) {
      if (userdata.data?.email_verified === "no") {
        setNotVerified(userdata.data)
      }
      return { success: false, error: userdata.error, userdata }
    }

    const serverSession = {
      status: userdata?.data?.user?.uuid ? "authenticated" : "unauthenticated",
      User: userdata?.data,
      type: "user",
    }
    app.setStoreStates(serverSession, userdata?.categories, "login")

    const redirect =
      params &&
      params?.length &&
      params[0] !== "login" &&
      params[1] !== "getstarted"
        ? `/${params.join("/")}`
        : PageRoutes.dashboard
    if (params?.includes("getstarted")) app.toggleGetstartedLink(true)
    else app.toggleGetstartedLink(false)
    return router.replace(redirect)
  }

  return { ...states, ...actions, handleLogin }
}
