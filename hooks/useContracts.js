"use client";
import { useStoreActions, useStoreState } from "easy-peasy";
import useProcessing from "@/hooks/useProcessing";
import RemoteEndpoints from "@/app/modules/endpoints";
import useLogout from "@/hooks/useLogout";


const useContracts = () => {
  const actions = useStoreActions((action) => action);
  const states = useStoreState((state) => state);

  const {Logout, LogoutAdmin} = useLogout();

  // console.log('States from within useContracts', states);

  // console.log('User from within useContracts', states.users);

  const { setProcessing } = useProcessing();


  const isSuperadmin = () => false;

  const getAllContracts = async (page, perPage) => {

    return [{
        title: "CVE0-003",
        contract_status: "expired",
        contract_id: "123esrs",
        company: "ABC",
        start_date: "today",
        due_date: "tomorrow"
    }, 
    {
        title: "CVE0-180",
        contract_status: "active",
        contract_id: "123esrs",
        company: "XYZ",
        start_date: "today",
        due_date: "11/11/2023"
    },
    {
        title: "CVE0-000",
        contract_status: "active",
        contract_id: "123esrs",
        company: "XYZ",
        start_date: "today",
        due_date: "11/11/2023"
    },
    {
        title: "CVE0-123",
        contract_status: "active",
        contract_id: "123esrs",
        company: "XYZ",
        start_date: "today",
        due_date: "11/11/2023"
    }];
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

      if (response.status === 401 ) {
        Logout();
        return;
      }

      const result = await response.json();

      // console.log('RemoteEndpoints.ALL_ADMIN_ROLES', RemoteEndpoints.ALL_ADMIN_ROLES);
      // console.log('All Admin Roles', result);
      // console.log('states.admins.token', states.admins.token);

      setProcessing(false);
      if (result?.success) {
        const admin_roles = result.data?.roles;
        
        // console.log('Admin roles retrieved', admin_roles);

        return {
          admin_roles
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
 
  return { ...states, ...actions, isSuperadmin, getAllContracts};
};

export default useContracts;
