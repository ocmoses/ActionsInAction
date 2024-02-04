"use client";
import { useStoreActions, useStoreState } from "easy-peasy";
import { NextEndPoints } from "@/app/modules/endpoints";
import RemoteEndpoints from "@/app/modules/endpoints";
import useProcessing from "@/hooks/useProcessing";
import useErrors from "@/hooks/useErrors";

export default function useUsers() {
  const states = useStoreState((action) => action.users);
  const actions = useStoreActions((action) => action.users);
  const { processing, setProcessing } = useProcessing();
  const { errors, setError, clearErrors } = useErrors(null);

  const handleLogin = async (data) => {
    const response = await fetch(NextEndPoints.LOGIN, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const result = await response.json();
    const { data: userdata, error } = result;
    if (!userdata && error) {
      return { success: false, error, userdata: null };
    }
    if (!userdata.success) {
      if (userdata.data?.email_verified === "no") {
        setNotVerified(userdata.data);
      }
      return { success: false, error: userdata.error, userdata };
    }

    const serverSession = {
      status: userdata?.data?.user?.uuid ? "authenticated" : "unauthenticated",
      User: userdata?.data,
      token: userdata?.data?.login_token?.access_token,
      type: "user",
    };
    app.setStoreStates(serverSession, userdata?.categories, "login");

    const redirect =
      params &&
      params?.length &&
      params[0] !== "login" &&
      params[1] !== "getstarted"
        ? `/${params.join("/")}`
        : PageRoutes.dashboard;
    if (params?.includes("getstarted")) app.toggleGetstartedLink(true);
    else app.toggleGetstartedLink(false);
    return router.replace(redirect);
  };

  const refreshSession = async () => {
    const response = await fetch(RemoteEndpoints.AUTH_USER, {
      headers: {
        apiKey: process.env.NEXT_PUBLIC_APIKEY,
        "Content-Type": "application/json",
        // redirect: "follow",
        referrerPolicy: "no-referrer",
        Authorization: `bearer ${states.token}`,
      },
    }).catch((error) => {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    });
    const result = await response.json();

    // console.log("result from useUsers", result);
    const { data: loginData, error: loginError } = result;
    if (!loginData) {
      setProcessing(false);
      return setError({ login: loginError /*"Authentication failed"*/ });
    }
    if (!loginData.success) {
      setProcessing(false);
      if (loginData.data?.email_verified === "no") {
        setNotVerified(loginData.data);
      }
      return setError({ login: loginData.error });
    }
    setTmpUser(null);
    const serverSession = {
      status: loginData?.data?.user?.uuid ? "authenticated" : "unauthenticated",
      User: loginData?.data,
      token: loginData?.data?.login_token?.access_token,
      type: "user",
      role: loginData?.data["login-user-role"],
    };
    app.setStoreStates(serverSession, loginData?.categories, "login");
    location.reload();
  };

  return { ...states, ...actions, handleLogin, refreshSession };
}
