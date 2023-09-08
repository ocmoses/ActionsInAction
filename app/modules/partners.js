import RemoteEndpoints, { NextEndPoints } from "@/app/modules/endpoints";
import { cookies } from "next/headers";
import { Decrypt } from "./utilities";
import useLogout from "@/hooks/useLogout";

export const getAllPartners = async (page, perPage, contractStatus) => {

  // const {Logout} = useLogout();

  try {
    const params = [];
    if (page) params.push(`page=${page}`);
    if (perPage) params.push(`per_page=${perPage}`);
    if (contractStatus) params.push(`contract_status=${contractStatus}`);

    const cookieStore = cookies();

    // console.log("cookieStore", cookieStore);

    const token = cookieStore.get("token");
    const response = await fetch(
      `${RemoteEndpoints.ALL_PARTNERS}?${
        params.length > 0 ? params.join("&") : ""
      }`,
      {
        cache: "no-store",
        next: { revalidate: 120 },
        headers: {
          token: token?.value,
          Authorization: `bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 400 || response.status === 401 ) {
      LogoutAdmin();
      return;
    }
    const result = await response.json();
    if (result?.success) {
      const partners = result.data?.partners.data;
      const navigation = {
        current_page: result?.data?.partners?.current_page,
        first_page_url: result?.data?.partners?.first_page_url,
        from: result?.data?.partners?.from,
        last_page: result?.data?.partners?.last_page,
        last_page_url: result?.data?.partners?.last_page_url,
        links: result?.data?.partners?.links,
        next_page_url: result?.data?.partners?.next_page_url,
        path: result?.data?.partners?.path,
        per_page: result?.data?.partners?.per_page,
        prev_page_url: result?.data?.partners?.prev_page_url,
        to: result?.data?.partners?.to,
        total: result?.data?.partners?.total,
      };

      return {
        partners,
        navigation,
      };
    }
    return {
      error:
        result?.data?.message ??
        "Something went wrong. Please check your connection and try again",
    };
  } catch (error) {
    console.log({ error });
    return {
      error:
        error.message ??
        "Something went wrong. Please check your connection and try again",
    };
  }
};
