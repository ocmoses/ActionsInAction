import useProcessing from "@/hooks/useProcessing";
import useApp from "@/hooks/useApp";
import useLogout from "@/hooks/useLogout";
import { useEffect, useState } from "react";
import { filterCategory, getstages } from "@/app/modules/utilities";
import { useStoreActions, useStoreState } from "easy-peasy";
import { filterPartner, Decrypt } from "@/app/modules/utilities";
import { useRouter } from "next/navigation";
import RemoteEndpoints, { NextEndPoints } from "@/app/modules/endpoints";

export default function useAdmins() {
  const  {LogoutAdmin} = useLogout();
  const router = useRouter();
  const states = useStoreState((action) => action.admins);
  const actions = useStoreActions((action) => action.admins);

  const { setProcessing } = useProcessing();
  const [allCategories, setAllCategories] = useState([]);
  const app = useApp();
  const rejectionReasons = app.rejectionReasons;

  useEffect(() => {
    const Categories = {};
    if (states.categories?.length > 0) {
      states.categories.map((category) => {
        Categories[category.uuid] = category;
      });
    }
    setAllCategories(Categories);
  }, [states.categories]);
  useEffect(() => {
    if (!rejectionReasons) app.getRejectionReasons();
  }, [rejectionReasons]);

  const getStages = (category, categories) => {
    return getstages(category, categories);
  };

  // console.log("states from within useAdmin", states);
  
  const getAllPartners = async (page, perPage, contractStatus) => {
    try {
      const params = [];
      if (page) params.push(`page=${page}`);
      if (perPage) params.push(`per_page=${perPage}`);
      if (contractStatus) params.push(`contract_status=${contractStatus}`);

      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.ALL_PARTNERS}?${
          params.length > 0 ? params.join("&") : ""
        }`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            token: states.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.token}`,
          },
        }
      );
      if (response.status === 400 || response.status === 401 ) {
        LogoutAdmin();
        return;
      }
      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();
      setProcessing(false);
      if (result?.success) {
        const partners = result.data?.partners.data;
        if (partners.length > 0)
          partners.map((partner) => {
            filterPartner(partner, states.categories);
          });
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

  const getAllAdmins = async (page, perPage) => {
    try {
      const params = [];
      if (page) params.push(`page=${page}`);
      if (perPage) params.push(`per_page=${perPage}`);

      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.ALL_ADMINS}?${
          params.length > 0 ? params.join("&") : ""
        }`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            token: states.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.token}`,
          },
        }
      );

      console.log("response", response);
      console.log("response.status", response.status);
      console.log("response.status === 401", response.status === 401);

      if (response.status === 400 || response.status === 401 ) {
        LogoutAdmin();
        return;
      }
      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();
      setProcessing(false);
      if (result?.success) {
        const admin_users = result.data?.admin_users.data;
        // if (admins_users.length > 0)
        // admins_users.map((admin) => {
        //     filterPartner(admin, states.categories);
        //   });
        const navigation = {
          current_page: result?.data?.admin_users?.current_page,
          first_page_url: result?.data?.admin_users?.first_page_url,
          from: result?.data?.admin_users?.from,
          last_page: result?.data?.admin_users?.last_page,
          last_page_url: result?.data?.admin_users?.last_page_url,
          links: result?.data?.admin_users?.links,
          next_page_url: result?.data?.admin_users?.next_page_url,
          path: result?.data?.admin_users?.path,
          per_page: result?.data?.admin_users?.per_page,
          prev_page_url: result?.data?.admin_users?.prev_page_url,
          to: result?.data?.admin_users?.to,
          total: result?.data?.admin_users?.total,
        };

        // console.log('Admins retrieved', result);

        return {
          admin_users,
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

  const getAllBoardResolutionDocuments = async () => {
    try {
      
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_RESOLUTION_DOCUMENTS}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            token: states.token,
            "Content-Type": "application/json",
            Authorization: `Bearer ${states.token}`,
          },
        }
      );

      console.log("response", response);
      console.log("response.status", response.status);
      console.log("response.status === 401", response.status === 401);

      if (response.status === 400 || response.status === 401 ) {
        LogoutAdmin();
        return;
      }
      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();
      setProcessing(false);

      if (result?.success) {

        const brds = result?.data['board-resolution-documents'].data;
        
        const navigation = {
          current_page: result?.data['board-resolution-documents'].current_page,
          first_page_url: result?.data['board-resolution-documents'].first_page_url,
          from: result?.data['board-resolution-documents'].from,
          last_page: result?.data['board-resolution-documents'].last_page,
          last_page_url: result?.data['board-resolution-documents'].last_page_url,
          links: result?.data['board-resolution-documents'].links,
          next_page_url: result?.data['board-resolution-documents'].next_page_url,
          path: result?.data['board-resolution-documents'].path,
          per_page: result?.data['board-resolution-documents'].per_page,
          prev_page_url: result?.data['board-resolution-documents'].prev_page_url,
          to: result?.data['board-resolution-documents'].to,
          total: result?.data['board-resolution-documents'].total,
        };

        // console.log('brds', brds);

        return {
          brds,
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

  const getAllDepartments = async (page, perPage) => {
    try {
      const params = [];
      if (page) params.push(`page=${page}`);
      if (perPage) params.push(`per_page=${perPage}`);

      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.ALL_DEPARTMENTS}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            token: states.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.token}`,
          },
        }
      );
      if (response.status === 400 || response.status === 401 ) {
        LogoutAdmin();
        return;
      }
      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();
      setProcessing(false);
      if (result?.success) {
        const all_departments = result.data?.departments;
        // if (admins_users.length > 0)
        // admins_users.map((admin) => {
        //     filterPartner(admin, states.categories);
        //   });
        // const navigation = {
        //   current_page: result?.data?.admin_users?.current_page,
        //   first_page_url: result?.data?.admin_users?.first_page_url,
        //   from: result?.data?.admin_users?.from,
        //   last_page: result?.data?.admin_users?.last_page,
        //   last_page_url: result?.data?.admin_users?.last_page_url,
        //   links: result?.data?.admin_users?.links,
        //   next_page_url: result?.data?.admin_users?.next_page_url,
        //   path: result?.data?.admin_users?.path,
        //   per_page: result?.data?.admin_users?.per_page,
        //   prev_page_url: result?.data?.admin_users?.prev_page_url,
        //   to: result?.data?.admin_users?.to,
        //   total: result?.data?.admin_users?.total,
        // };

        // console.log('Admins retrieved', result);

        return {
          all_departments,
          // navigation,
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

  const ApproveField = async (formdata) => {
    try {
      var headers = new Headers();
      headers.append("token", states.token);
      headers.append("Authorization", `bearer ${states.token}`);
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      var urlEncoded = new URLSearchParams();
      urlEncoded.append("partner_uuid", formdata.partner_uuid ?? "");
      urlEncoded.append("user_uuid", formdata.user_uuid ?? "");
      urlEncoded.append("category_uuid", formdata.category_uuid ?? "");
      urlEncoded.append("category_stage", formdata.category_stage ?? "");
      urlEncoded.append("admin_user", states.admin.uuid ?? "");
      urlEncoded.append("feedback", formdata.feedback ?? "");
      urlEncoded.append("status", formdata.status ?? "");
      urlEncoded.append("field", formdata.field ?? "");
      urlEncoded.append("approval_uuid", formdata.approval_uuid ?? "");
      urlEncoded.append("created_by", states.admin.uuid ?? "");

      var requestOptions = {
        method: "POST",
        headers: headers,
        body: urlEncoded,
        redirect: "follow",
      };

      const response = await fetch(
        RemoteEndpoints.COMPLIANCE_APPROVE,
        requestOptions
      ).catch((error) => {
        console.log("error", error);
        return { success: false, error: error };
      });
      console.log({ response });
      if (!response)
        return {
          success: false,
          error: "Unable to send request. Please check your connection",
        };
      const result = await response.json();
      if (!response)
        return {
          success: false,
          error: "Unable to receive response. Please check your connection",
        };
      const { success, data } = result;
      if (!success) return { success: false, error: data.message };
      return { success: true, data, error: null };
    } catch (error) {
      return {
        success: false,
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  };

  const createAdmin = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.CREATE_ADMIN}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            token: states.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.token}`,
          },
        }
      );
      
      if (!response)
      return {
        error: "This request has no response available",
      };
      const result = await response.json();

      console.log('RemoteEndpoints.CREATE_ADMIN', RemoteEndpoints.CREATE_ADMIN);
      console.log('Create result', result);
      console.log('states.admins.token', states.token);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('Created message', message);

        return {
          message
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

  const deleteAdmin = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.DELETE_ADMIN}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: 'DELETE',
          body: JSON.stringify(data),
          headers: {
            token: states.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.token}`,
          },
        }
      );
      
      if (!response)
      return {
        error: "This request has no response available",
      };
      const result = await response.json();

      console.log('RemoteEndpoints.DELETE_ADMIN', RemoteEndpoints.DELETE_ADMIN);
      console.log('Create result', result);
      console.log('states.token', states.token);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('deleted message', message);

        return {
          message
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



/// //////////////////////////////////////////afolabi's functions starts here
  const fetchData = async (url, apikey) => {
    try {
      const response = await axios.get(
        url,
        {
          headers: {
            apikey: apikey,
          },
        }
      );
      //console.log("this is my response", response);
     return {success: true, data: response.data.data}
    } catch (error) {
      console.error("Error fetching data:", error);
      return {success: false, message: error.message}
    }
  };


/// //////////////////////////////////////////afolabi's functions Ends here



  return {
    ...states,
    ...actions,
    getAllPartners,
    getAllAdmins,
    allCategories,
    filterCategory,
    getStages,
    ApproveField,
    rejectionReasons,
    createAdmin,
    getAllDepartments,
    deleteAdmin,
    fetchData,
    getAllBoardResolutionDocuments
  };
}