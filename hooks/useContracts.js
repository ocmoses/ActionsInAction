"use client";
import { useStoreActions, useStoreState } from "easy-peasy";
import useProcessing from "@/hooks/useProcessing";
import RemoteEndpoints from "@/app/modules/endpoints";
import useLogout from "@/hooks/useLogout";
import usePartners from "@/hooks/usePartners";
import useUsers from "@/hooks/useUsers";


const useContracts = () => {
  const actions = useStoreActions((action) => action);
  const states = useStoreState((state) => state);

  const {partner} = usePartners();
  const {user} = useUsers();

  const {Logout, LogoutAdmin} = useLogout();

  console.log('useUsers from within useContracts', useUsers());

  // console.log('User from within useContracts', states.users);

  const { setProcessing } = useProcessing();


  const isSuperadmin = () => false;

  const getAllContracts = async (page, perPage) => {

    // return [{
    //     title: "CVE0-003",
    //     contract_status: "expired",
    //     contract_id: "123esrs",
    //     company: "ABC",
    //     start_date: "today",
    //     due_date: "tomorrow"
    // }, 
    // {
    //     title: "CVE0-180",
    //     contract_status: "active",
    //     contract_id: "123esrs",
    //     company: "XYZ",
    //     start_date: "today",
    //     due_date: "11/11/2023"
    // },
    // {
    //     title: "CVE0-000",
    //     contract_status: "active",
    //     contract_id: "123esrs",
    //     company: "XYZ",
    //     start_date: "today",
    //     due_date: "11/11/2023"
    // },
    // {
    //     title: "CVE0-123",
    //     contract_status: "active",
    //     contract_id: "123esrs",
    //     company: "XYZ",
    //     start_date: "today",
    //     due_date: "11/11/2023"
    // }];
    try {
      const params = [];
      if (page) params.push(`page=${page}`);
      if (perPage) params.push(`per_page=${perPage}`);

      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_ALL_CONTRACTS}`,
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

      // console.log('RemoteEndpoints.GET_ALL_CONTRACTS', RemoteEndpoints.GET_ALL_CONTRACTS);
      // console.log('ALL CONTRACTS', result);
      // console.log('states.admins.token', states.admins.token);

      setProcessing(false);
      if (result?.success) {
        const contracts = result.data?.contracts.data;
        
        // console.log('Admin roles retrieved', admin_roles);
        const navigation = {
          current_page: result?.data?.contracts?.current_page,
          first_page_url: result?.data?.contracts?.first_page_url,
          from: result?.data?.contracts?.from,
          last_page: result?.data?.contracts?.last_page,
          last_page_url: result?.data?.contracts?.last_page_url,
          links: result?.data?.contracts?.links,
          next_page_url: result?.data?.contracts?.next_page_url,
          path: result?.data?.contracts?.path,
          per_page: result?.data?.contracts?.per_page,
          prev_page_url: result?.data?.contracts?.prev_page_url,
          to: result?.data?.contracts?.to,
          total: result?.data?.contracts?.total,
        };

        return {
          contracts,
          navigation
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

  const partnerGetAllContracts = async (page, perPage) => {

    // return [{
    //     title: "CVE0-003",
    //     contract_status: "expired",
    //     contract_id: "123esrs",
    //     company: "ABC",
    //     start_date: "today",
    //     due_date: "tomorrow"
    // }, 
    // {
    //     title: "CVE0-180",
    //     contract_status: "active",
    //     contract_id: "123esrs",
    //     company: "XYZ",
    //     start_date: "today",
    //     due_date: "11/11/2023"
    // },
    // {
    //     title: "CVE0-000",
    //     contract_status: "active",
    //     contract_id: "123esrs",
    //     company: "XYZ",
    //     start_date: "today",
    //     due_date: "11/11/2023"
    // },
    // {
    //     title: "CVE0-123",
    //     contract_status: "active",
    //     contract_id: "123esrs",
    //     company: "XYZ",
    //     start_date: "today",
    //     due_date: "11/11/2023"
    // }];
    try {
      const params = [];
      if (page) params.push(`page=${page}`);
      if (perPage) params.push(`per_page=${perPage}`);

      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_ALL_CONTRACTS}?partner_uuid=${partner.uuid}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            token: user.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${user.token}`,
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
        const contracts = result.data?.contracts.data;
        
        // console.log('Admin roles retrieved', admin_roles);
        const navigation = {
          current_page: result?.data?.contracts?.current_page,
          first_page_url: result?.data?.contracts?.first_page_url,
          from: result?.data?.contracts?.from,
          last_page: result?.data?.contracts?.last_page,
          last_page_url: result?.data?.contracts?.last_page_url,
          links: result?.data?.contracts?.links,
          next_page_url: result?.data?.contracts?.next_page_url,
          path: result?.data?.contracts?.path,
          per_page: result?.data?.contracts?.per_page,
          prev_page_url: result?.data?.contracts?.prev_page_url,
          to: result?.data?.contracts?.to,
          total: result?.data?.contracts?.total,
        };

        return {
          contracts,
          navigation
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
 
  return { ...states, ...actions, isSuperadmin, getAllContracts, partnerGetAllContracts};
};

export default useContracts;
