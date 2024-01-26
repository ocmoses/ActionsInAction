import useProcessing from "@/hooks/useProcessing";
import useApp from "@/hooks/useApp";
import useLogout from "@/hooks/useLogout";
import { useEffect, useState } from "react";
import { filterCategory, getstages } from "@/app/modules/utilities";
import { useStoreActions, useStoreState, filterPartner } from "easy-peasy";
import RemoteEndpoints from "@/app/modules/endpoints";

export default function useAdmins() {
  const { LogoutAdmin } = useLogout();
  const states = useStoreState((action) => action.admins);
  const actions = useStoreActions((action) => action.admins);

  const { setProcessing } = useProcessing();
  const [allCategories, setAllCategories] = useState([]);
  const app = useApp();
  const rejectionReasons = app.rejectionReasons;

  useEffect(() => {
    setProcessing(false);
    const Categories = {};
    if (states.categories?.length > 0) {
      states.categories.map((category) => {
        Categories[category.uuid] = category;
      });
    }
    setAllCategories(Categories);
  }, [states.categories]);
  useEffect(() => {
    setProcessing(false);
    if (!rejectionReasons) app.getRejectionReasons();
  }, [rejectionReasons]);

  const getStages = (category, categories) => {
    return getstages(category, categories);
  };

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
      if (response.status === 400 || response.status === 401) {
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
        const partners = result.data?.partners;
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

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();
      setProcessing(false);
      if (result?.success) {
        const admin_users = result.data?.admin_users.data;

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

      if (response.status === 401) {
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
        const brds = result?.data["board-resolution-documents"];

        console.log("brds", brds);

        return {
          brds,
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

  const getAllQuestionnaire = async () => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_ALL_QUESTIONNAIRE_RESPONSE}`,
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

      if (response.status === 401) {
        LogoutAdmin();
        return;
      }

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();
      setProcessing(false);

      console.log("All Questionnairre response", result);

      if (result?.success) {
        const questionnaires = result?.data;

        return {
          questionnaires,
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

  const getAllRevenueShare = async () => {
    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.GET_ALL_REVENUE_SHARE}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        headers: {
          token: states.token,
          "Content-Type": "application/json",
          Authorization: `Bearer ${states.token}`,
        },
      });

      if (response.status === 401) {
        LogoutAdmin();
        return;
      }

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();
      setProcessing(false);

      console.log("All revenue share response", result);

      if (result?.success) {
        const revenue_share = result?.data;

        return {
          revenue_share,
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

  const getAllChangeOrder = async () => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_ALL_CHANGE_ORDER_REQUESTS}`,
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

      if (response.status === 401) {
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
        const change_orders = result?.data;

        console.log("All change orders", change_orders);

        return {
          change_orders,
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

  const getAllIP = async () => {
    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.GET_ALL_IP_REQUESTS}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        headers: {
          token: states.token,
          "Content-Type": "application/json",
          Authorization: `Bearer ${states.token}`,
        },
      });

      if (response.status === 401) {
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
        const ip_requests = result?.data;

        console.log("All IP Requests", ip_requests);

        return {
          ip_requests,
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
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.ALL_DEPARTMENTS}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        headers: {
          token: states.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${states.token}`,
        },
      });
      if (response.status === 401) {
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

        return {
          all_departments,
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
      let headers = new Headers();
      headers.append("token", states.token);
      headers.append("Authorization", `bearer ${states.token}`);
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      let urlEncoded = new URLSearchParams();
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

      let requestOptions = {
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
      const response = await fetch(`${RemoteEndpoints.CREATE_ADMIN}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          token: states.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${states.token}`,
        },
      });

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();

      console.log("RemoteEndpoints.CREATE_ADMIN", RemoteEndpoints.CREATE_ADMIN);
      console.log("Create result", result);
      console.log("states.admins.token", states.token);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

        console.log("Created message", message);

        return {
          message,
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
      const response = await fetch(`${RemoteEndpoints.DELETE_ADMIN}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          token: states.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${states.token}`,
        },
      });

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();

      console.log("RemoteEndpoints.DELETE_ADMIN", RemoteEndpoints.DELETE_ADMIN);
      console.log("Create result", result);
      console.log("states.token", states.token);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

        console.log("deleted message", message);

        return {
          message,
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

  const approveOrRejectBrd = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.APPROVE_REJECT_BRD}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          token: states.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${states.token}`,
        },
      });

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

        console.log("Approval/rejection message", message);

        return {
          message,
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

  const approveOrRejectQuestionnaire = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.APPROVE_REJECT_QUESTIONNAIRE}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: "POST",
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

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

        console.log("Approval/rejection message", message);

        return {
          message,
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

  const approveRevenueShare = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.APPROVE_REVENUE_SHARE}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          token: states.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${states.token}`,
        },
      });

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

        console.log("Approval/rejection message", message);

        return {
          message,
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

  const approveChangeOrder = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.APPROVE_OR_REJECT_CHANGE_ORDER}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: "POST",
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

      console.log("APPROVAL RESPONSE", result);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

        console.log("Approval/rejection message", message);

        return {
          message: "Approved successfully",
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

  const rejectChangeOrder = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.APPROVE_OR_REJECT_CHANGE_ORDER}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: "POST",
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

      console.log("REJECTION RESPONSE", result);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

        console.log("Approval/rejection message", message);

        return {
          message: "Rejected successfully",
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

  const handleIPDetail = async (data, isApproval) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.APPROVE_REJECT_IP_DETAILS}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: "POST",
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

      console.log("APPROVAL RESPONSE", result);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

        console.log("Approval/rejection message", message);

        return {
          message: isApproval
            ? "Approved successfully"
            : "Rejected successfully",
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

  const approveIPDetail = async (data) => {
    return handleIPDetail(data, true);
  };

  const rejectIPDetail = async (data) => {
    return handleIPDetail(data, false);
  };

  const addDynamicField = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.ADD_DYNAMIC_FIELD}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          token: states.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${states.token}`,
        },
      });

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();

      console.log("ADD DYNAMIC FIELD RESPONSE", result);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

        console.log("Adding dynamic field message", message);

        return {
          message: "Added successfully",
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

  const removeDynamicField = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.REMOVE_DYNAMIC_FIELD}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          token: states.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${states.token}`,
        },
      });

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();

      console.log("REMOVE DYNAMIC FIELD RESPONSE", result);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

        console.log("Remove dynamic field message", message);

        return {
          message: "Deleted successfully",
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
  const getAllGracePeriod = async () => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_ALL_LICENSE_GRACE_PERIOD_REQUEST}`,
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

      if (response.status === 401) {
        LogoutAdmin();
        return;
      }

      if (!response)
        return {
          error: "getAllGracePeriod has no response available",
        };
      const result = await response.json();
      setProcessing(false);

      console.log("All Grace Period response", result);

      if (result?.success) {
        const graceperiods = result?.data;

        return {
          graceperiods,
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Trying to fetch getAllGracePeriod 1",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Trying to fetch getAllGracePeriod 1",
      };
    }
  };
  const getAllLicenceRenewal = async () => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_ALL_LICENSE_RENEWAL_REQUEST}`,
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

      if (response.status === 401) {
        LogoutAdmin();
        return;
      }

      if (!response)
        return {
          error: "getAllLicenceRenewal has no response available",
        };
      const result = await response.json();
      setProcessing(false);

      console.log("All Licence Renewal response", result);

      if (result?.success) {
        const licenserenewals = result?.data;

        return {
          licenserenewals,
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Trying to fetch getAllLicenceRenewal 1",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Trying to fetch getAllLicenceRenewal 2",
      };
    }
  };

  const getAllPartnersShortCodes = async () => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_ALL_PARTNER_SHORTCODES}`,
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

      if (response.status === 401) {
        LogoutAdmin();
        return;
      }

      if (!response)
        return {
          error: "getAllPartnersShortCodes has no response available",
        };
      const result = await response.json();
      setProcessing(false);

      console.log("Get all partner shortcodes", result);

      if (result?.success) {
        const shortcodes = result?.data;

        return {
          shortcodes,
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Trying to fetch getAllPartnersShortCodes 1",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Trying to fetch getAllPartnersShortCodes 2",
      };
    }
  };

  const getSinglePartnerShortcodes = async (partner_uuid) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_SINGLE_PARTNER_SHORTCODE}${partner_uuid}`,
        {
          cache: "no-store",
          headers: {
            token: states.token,
            "Content-Type": "application/json",
            Authorization: `Bearer ${states.token}`,
          },
        }
      );

      if (!response.ok) {
        return {
          error: `Failed to fetch data. Status: ${response.status}`,
        };
      }

      if (response.status === 401) {
        LogoutAdmin();
        return;
      }

      const result = await response.json();
      setProcessing(false);

      if (result?.success) {
        const partnershortcodes = result?.data;
        return {
          partnershortcodes,
        };
      }

      return {
        error:
          result?.data?.message ??
          "Something went wrong. Trying to fetch getSinglePartnerShortcodes 1",
      };
    } catch (error) {
      console.error({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Trying to fetch getSinglePartnerShortcodes 2",
      };
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
    getAllBoardResolutionDocuments,
    approveOrRejectBrd,
    getAllQuestionnaire,
    approveOrRejectQuestionnaire,
    getAllRevenueShare,
    getAllChangeOrder,
    approveRevenueShare,
    approveChangeOrder,
    rejectChangeOrder,
    getAllGracePeriod,
    getAllLicenceRenewal,
    getAllIP,
    getAllPartnersShortCodes,
    approveIPDetail,
    rejectIPDetail,
    addDynamicField,
    removeDynamicField,
    getSinglePartnerShortcodes,
  };
}
