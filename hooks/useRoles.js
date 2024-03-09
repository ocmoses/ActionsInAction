"use client";
import { useStoreActions, useStoreState } from "easy-peasy";
import useProcessing from "@/hooks/useProcessing";
import RemoteEndpoints from "@/app/modules/endpoints";
import { redirect } from "next/navigation";
import useLogout from "@/hooks/useLogout";

const useRoles = () => {
  const actions = useStoreActions((action) => action);
  const states = useStoreState((state) => state);

  const { Logout, LogoutAdmin } = useLogout();

  const { setProcessing } = useProcessing();

  const isSuperadmin = () => false;

  const getAllAdminRoles = async (page, perPage) => {
    try {
      const params = [];
      if (page) params.push(`page=${page}`);
      if (perPage) params.push(`per_page=${perPage}`);

      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.ALL_ADMIN_ROLES}?${
          params.length > 0 ? params.join("&") : ""
        }`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            token: states.admins.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.admins.token}`,
          },
        }
      );

      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 401) {
        Logout();
        return;
      }

      const result = await response.json();

      setProcessing(false);
      if (result?.success) {
        const admin_roles = result.data?.roles;

        return {
          admin_roles,
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
  
  const getAllAdminPrivileges = async (page, perPage) => {
    try {
      const params = [];
      if (page) params.push(`page=${page}`);
      if (perPage) params.push(`per_page=${perPage}`);

      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.ALL_ADMIN_PRIVILEGES}?${
          params.length > 0 ? params.join("&") : ""
        }`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            token: states.admins.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.admins.token}`,
          },
        }
      );

      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 401) {
        LogoutAdmin();
        return;
      }

      const result = await response.json();

      setProcessing(false);
      if (result?.success) {
        const admin_privileges = result.data?.privileges;

        return {
          admin_privileges,
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

  const deleteRole = async (uuid) => {
    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.DELETE_ROLE}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        method: "DELETE",
        body: JSON.stringify({
          role_uuid: uuid,
        }),
        headers: {
          token: states.admins.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${states.admins.token}`,
        },
      });

      if (response.status === 401) {
        redirect(NextEndPoints.LOGIN_ADMIN);
        return;
      }

      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 400 || response.status === 401) {
        LogoutAdmin();
        return;
      }

      const result = await response.json();

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

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

  const createRole = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.CREATE_ROLE}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          token: states.admins.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${states.admins.token}`,
        },
      });

      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 400 || response.status === 401) {
        LogoutAdmin();
        return;
      }

      const result = await response.json();

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;

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

  const getAllPartnerRoles = async (page, perPage) => {
    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.ALL_PARTNER_ROLES}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        headers: {
          apikey: process.env.NEXT_PUBLIC_APIKEY,
          token: states.users.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${states.users.token}`,
        },
      });
      if (response.status === 401) {
        Logout();
        return;
      }
      if (!response)
        return {
          error: "This request has no response available",
        };

      const result = await response.json();

      setProcessing(false);
      if (result?.success) {
        const partner_roles = result.data?.roles;

        return {
          partner_roles,
        };
      }
      return {
        status: response?.status,
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

  const getAllPartnerPrivileges = async (page, perPage) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.ALL_PARTNER_PRIVILEGES}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            token: states.partners.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.users.token}`,
          },
        }
      );

      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 400 || response.status === 401) {
        Logout();
        return;
      }

      const result = await response.json();

      setProcessing(false);
      if (result?.success) {
        const partner_privileges = result.data?.privileges;

        return {
          partner_privileges,
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
  return {
    ...states,
    ...actions,
    isSuperadmin,
    getAllAdminRoles,
    getAllAdminPrivileges,
    deleteRole,
    createRole,
    getAllPartnerRoles,
    getAllPartnerPrivileges,
  };
};

export default useRoles;
