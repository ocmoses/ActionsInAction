import "@/styles/globals.css";
import Providers from "@/app/Providers";
import Session from "@/app/Session";
import ResponsiveLabel from "@/app/components/ResponsiveLabel";
import RouteLoader from "@/app/components/RouteLoader";
import RemoteEndpoints from "@/app/modules/endpoints";
import { userData, Decrypt } from "@/app/modules/utilities";
import { cookies } from "next/headers";
import { getCategories } from "@/app/modules/categories";
import { apikey } from "@/app/modules/constants";

import "./modules/bootstrap";

const getServerSession = async () => {
  try {
    const nextCookies = cookies();
    // User session
    const token = nextCookies.has("auth-token")
      ? nextCookies.get("auth-token")?.value
      : null;
    const partnerid = nextCookies.has("partnerid")
      ? nextCookies.get("partnerid")?.value
      : null;
    const user_id = nextCookies.has("user_id")
      ? nextCookies.get("user_id")?.value
      : null;
    // Admin session
    const adminToken = nextCookies.has("token")
      ? nextCookies.get("token")?.value
      : null;
    const uuid = nextCookies.has("uuid")
      ? nextCookies.get("uuid")?.value
      : null;
    if (uuid) {
      try {
        // ADMIN INFO
        console.log({ adminToken });
        const response = await fetch(RemoteEndpoints.ADMIN_AUTH_USER, {
          headers: {
            apikey,
            "Content-Type": "application/json",
            referrerPolicy: "no-referrer",
            token: adminToken,
            Authorization: `bearer ${adminToken}`,
          },
        }).catch((error) => {
          return {
            success: false,
            error: error.message,
            data: null,
          };
        });

        if (!response)
          return {
            success: false,
            error: "Error reaching the server. Please check your connection",
            data: null,
          };
        if (response?.status === 500)
          return {
            success: false,
            error: response.statusText,
            data: null,
          };
        const { success, data } = await response.json();
        if (response?.ok) {
          //Added for quick user storage/retrieval
          // localStorage.setItem('user', data.user);
          return {
            success,
            error: null,
            data: data.user,
            type: "admin",
            token: adminToken,
          };
        }

        if (data?.message)
          return { success: false, error: data.message, data: null };
        return {
          success: false,
          error: "No data was return from the server. Please try again",
          data: null,
        };
      } catch (error) {
        return { success: false, error: error.message, data: null };
      }
    } else if (user_id) {
      // GET USER INFO
      const authToken = token ? Decrypt(token) : null;
      const partnerID = partnerid ? Decrypt(partnerid) : null;
      try {
        const response = await fetch(RemoteEndpoints.AUTH_USER, {
          headers: {
            apikey,
            "Content-Type": "application/json",
            // redirect: "follow",
            referrerPolicy: "no-referrer",
            Authorization: `bearer ${authToken}`,
          },
        }).catch((error) => {
          return {
            success: false,
            error: error.message,
            data: null,
          };
        });
        if (!response)
          return {
            success: false,
            error: "Error reaching the server. Please check your connection",
            data: null,
          };
        if (response?.status === 500)
          return {
            success: false,
            error: response.statusText,
            data: null,
          };
        const { success, data } = await response.json();
        if (response?.ok) {
          const User = userData(data);
          if (partnerID && User.partners?.length > 0) {
            User.partnerID = partnerID;
            User.partner = User.partners.find((p) => p?.uuid === partnerID);
          }
          return { success, error: null, data: User, type: "user" };
        } else {
          if (data?.message)
            return { success: false, error: data.error, data: null };
          return {
            success: false,
            error: "No data was return from the server. Please try again",
            data: null,
          };
        }
      } catch (error) {
        console.log({ error });
        return { success: false, error: error.message, data: null };
      }
    } else {
      return { success: true, error: null, data: null };
    }
  } catch (err) {
    console.log({ err });
    return {
      success: false,
      error: "Error reaching the server. Please check your connection",
      data: null,
    };
  }
};
export default async function RootLayout({ children }) {
  const resultGetServerSession = getServerSession();
  const resultGetCategories = getCategories(process.env.APIKEY);
  // Wait for the promises to resolve
  const [sessionData, categoriesData] = await Promise.all([
    resultGetServerSession,
    resultGetCategories,
  ]);
  const categories = {
    success: categoriesData.success,
    data: null,
    error: null,
  };
  // console.log({ categoriesData })
  if (categoriesData) {
    if (categoriesData?.success) {
      categories.data = categoriesData.data;
    } else {
      categories.error = categoriesData.message;
    }
  } else {
    categories.error = "Error fetching categories";
  }
  const serverSession = {
    status: sessionData?.data ? "authenticated" : "unauthenticated",
    User: sessionData?.data ?? null,
    error: sessionData?.error ?? null,
    type: sessionData?.type,
    // token: sessionData?.type === "admin" ? sessionData?.token : "",
    token: sessionData?.token,
  };
  const error = categoriesData?.error
    ? categoriesData?.error
    : sessionData?.error
    ? sessionData?.error
    : null;
  console.log({ error });
  return (
    <>
      <html lang="en">
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <head />
        <body>
          <div id="portals" className="relative z-50"></div>
          {process.env.NODE_ENV === "development" && <ResponsiveLabel />}
          <Providers>
            <Session
              serverSession={serverSession}
              categories={categories}
              error={error}
            >
              {<RouteLoader />}
              {children}
            </Session>
          </Providers>
          <div id="modalPortal"></div>
        </body>
      </html>
      {/* )} */}
    </>
  );
}
