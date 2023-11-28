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

      // console.log("response", response);
      // console.log("response.status", response.status);
      // console.log("response.status === 401", response.status === 401);

      // if (response.status === 400 || response.status === 401 ) {
      //   LogoutAdmin();
      //   return;
      // }
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

      // console.log("response", response);
      // console.log("response.status", response.status);
      // console.log("response.status === 401", response.status === 401);

      if (response.status === 401 ) {
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

        const brds = result?.data['board-resolution-documents'];
        
        console.log('brds', brds);

        return {
          brds
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

      // console.log("response", response);
      // console.log("response.status", response.status);
      // console.log("response.status === 401", response.status === 401);

      if (response.status === 401 ) {
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
          questionnaires
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

    // return {
    //   revenue_share: [
    //     {
    //         "id": 11,
    //         "uuid": "79d22cfc-5244-460b-b1fa-fb912wcc29263",
    //         "user_uuid": "9e20a6f3-5f25-4165-80cd-7074d654a817",
    //         "partner_uuid": "eaedc1b7-0d2f-43dd-bf08-3523101da5f2",
    //         "status": "pending",
    //         "status_date": "2023-10-10",
    //         "status_by": "sunaf4real@mtn.com",
    //         "user_company_type": null,
    //         "company_name": "MTN Nigeria",
    //         "created_at": "2023-10-10T12:49:19.000000Z",
    //         "updated_at": "2023-10-10T14:06:23.000000Z",
    //         "request_id": "RSH-79d52",
    //         "email": "afolabi.o@eleadersnetwork.com"
    //     },
    //     {
    //       "id": 11,
    //       "uuid": "79d22cfc-5244-460b-b1fa-2w3ecc29263",
    //       "user_uuid": "9e20a6f3-5f25-4165-80cd-7074d2r5t817",
    //       "partner_uuid": "eaedc1b7-0d2f-43dd-bf08-35d3a01da5f2",
    //       "status": "pending",
    //       "status_date": "2023-10-10",
    //       "status_by": "sunaf4real@mtn.com",
    //       "user_company_type": null,
    //       "company_name": "MTN Nigeria",
    //       "created_at": "2023-10-10T12:49:19.000000Z",
    //       "updated_at": "2023-10-10T14:06:23.000000Z",
    //       "request_id": "RSH-79d92",
    //       "email": "afolabi.o@eleadersnetwork.com"
    //     },
    //     {
    //       "id": 11,
    //       "uuid": "79d22cfc-5244-460b-b1fa-fb900c123w63",
    //       "user_uuid": "9e20a6f3-5f25-4165-80cd-7074d2254rf17",
    //       "partner_uuid": "eaedc1b7-0d2f-43dd-bf08-35d3a01da5f2",
    //       "status": "pending",
    //       "status_date": "2023-10-10",
    //       "status_by": "sunaf4real@mtn.com",
    //       "user_company_type": null,
    //       "company_name": "MTN Nigeria",
    //       "created_at": "2023-10-10T12:49:19.000000Z",
    //       "updated_at": "2023-10-10T14:06:23.000000Z",
    //       "request_id": "RSH-79022",
    //       "email": "afolabi.o@eleadersnetwork.com"
    //     }
    //   ]
    // };
    try {
        
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_ALL_REVENUE_SHARE}`,
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

      // console.log("response", response);
      // console.log("response.status", response.status);
      // console.log("response.status === 401", response.status === 401);

      if (response.status === 401 ) {
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
          revenue_share
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

  }

  const getAllChangeOrder = async () => {
    // return {
    //   change_orders: [
    //     {
    //         "id": 11,
    //         "uuid": "79d22cfc-5244-460b-b1fa-fb9222cc29263",
    //         "user_uuid": "9e20a6f3-5f25-4165-80cd-7074d654a817",
    //         "partner_uuid": "eaedc1b7-0d2f-43dd-bf08-3523101da5f2",
    //         "status": "pending",
    //         "status_date": "2023-10-10",
    //         "status_by": "sunaf4real@mtn.com",
    //         "user_company_type": null,
    //         "company_name": "MTN Nigeria",
    //         "created_at": "2023-10-10T12:49:19.000000Z",
    //         "updated_at": "2023-10-10T14:06:23.000000Z",
    //         "request_id": "RSH-79d52",
    //         "email": "afolabi.o@eleadersnetwork.com"
    //     },
    //     {
    //       "id": 11,
    //       "uuid": "79d22cfc-5244-460b143fa-2w3ecc29263",
    //       "user_uuid": "9e20a6f3-5f25-4165-80cd-7074d2r5t817",
    //       "partner_uuid": "eaedc1b7-0d2f-43dd-bf08-35d3a01da5f2",
    //       "status": "pending",
    //       "status_date": "2023-10-10",
    //       "status_by": "sunaf4real@mtn.com",
    //       "user_company_type": null,
    //       "company_name": "MTN Nigeria",
    //       "created_at": "2023-10-10T12:49:19.000000Z",
    //       "updated_at": "2023-10-10T14:06:23.000000Z",
    //       "request_id": "RSH-79d92",
    //       "email": "afolabi.o@eleadersnetwork.com"
    //     },
    //     {
    //       "id": 11,
    //       "uuid": "79d22cfc-5244-460b-b1fa234900c123w63",
    //       "user_uuid": "9e20a6f3-5f25-4165-80cd-7074d2254rf17",
    //       "partner_uuid": "eaedc1b7-0d2f-43dd-bf08-35d3a01da5f2",
    //       "status": "pending",
    //       "status_date": "2023-10-10",
    //       "status_by": "sunaf4real@mtn.com",
    //       "user_company_type": null,
    //       "company_name": "MTN Nigeria",
    //       "created_at": "2023-10-10T12:49:19.000000Z",
    //       "updated_at": "2023-10-10T14:06:23.000000Z",
    //       "request_id": "RSH-79022",
    //       "email": "afolabi.o@eleadersnetwork.com"
    //     }
    //   ]
    // };

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

      // console.log("response", response);
      // console.log("response.status", response.status);
      // console.log("response.status === 401", response.status === 401);

      if (response.status === 401 ) {
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
          change_orders
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
  }

  const getAllIP = async () => {

    return {
      ips: [

        {
          "request_type": "VAS Clearance",
          "request_id": "IP-bc7ba",
          "created_at": "2023-11-21T02:57:33.000000Z",
          "status": "pending",
          "partner_uuid": "696b70df-f88e-4f19-9611-9c7438cdb445",
          "uuid": "bc7ba4f2-451f-4951-a29c-44cc0967b5f9",
          "id": 1,
          "user_uuid": "c021a592-45cb-4252-8571-b65562c1f841",
          "content_creator": {
              "field": "I can see this clearly",
              "status": null,
          },
          "authorization_letter": {
              "file": "http://10.1.44.25/dms/PARTNER_ONBOARDING/VBEC-2023-5067519_file_2023-11-21-05-56.pdf",
              "status": null,
          },
          "probate_of_will": {
            "file": "http://10.1.44.25/dms/PARTNER_ONBOARDING/VBEC-2023-5067519_file_2023-11-21-05-56.pdf",
            "status": null,
          },
          "license_period": {
            "start_date": "2023-11-23",
            "end_date": "2024-11-23",
            "status": null,
          },
          "video_file": {
              "file": "http://10.1.44.25/dms/PARTNER_ONBOARDING/VBEC-2023-5067519_file_2023-11-21-06-21.pdf",      
              "status": null,     
          },
          "means_of_id": {
              "file": "http://10.1.44.25/dms/PARTNER_ONBOARDING/VBEC-2023-5067519_file_2023-11-21-06-43.pdf",
              "status": null,
          },
          "additional_proof": {
            "file": "http://10.1.44.25/dms/PARTNER_ONBOARDING/VBEC-2023-5067519_file_2023-11-21-06-43.pdf",
            "status": null,
        },
          "general_status": null,
          "updated_at": "2023-11-21T20:40:20.000000Z"
        },

        {
          "request_type": "VAS Clearance",
          "request_id": "IP-bc1ba",
          "created_at": "2023-11-21T02:57:33.000000Z",
          "status": "pending",
          "partner_uuid": "696b70df-f88e-4f19-9611-9c7438cdb445",
          "uuid": "bc7ba4f2-451f-4951-a29c-45cc0092b5f9",
          "id": 1,
          "user_uuid": "c021a592-45cb-4252-8571-b65562c1f841",
          "content_creator": {
              "field": "I can see this clearly",
              "status": null,
          },
          "probate_of_will": {
            "file": "http://10.1.44.25/dms/PARTNER_ONBOARDING/VBEC-2023-5067519_file_2023-11-21-05-56.pdf",
            "status": null,
          },
          "license_period": {
            "start_date": "2023-11-23",
            "end_date": "2024-11-23",
            "status": null,
          },
          "authorization_letter": {
              "file": "http://10.1.44.25/dms/PARTNER_ONBOARDING/VBEC-2023-5067519_file_2023-11-21-05-56.pdf",
              "status": null,
              
          },
          "video_file": {
              "file": "http://10.1.44.25/dms/PARTNER_ONBOARDING/VBEC-2023-5067519_file_2023-11-21-06-21.pdf",  
              "status": null,         
          },
          "means_of_id": {
              "file": "http://10.1.44.25/dms/PARTNER_ONBOARDING/VBEC-2023-5067519_file_2023-11-21-06-43.pdf",
              "status": null,
          },
          "general_status": null,
          "updated_at": "2023-11-21T20:40:20.000000Z"
        }

      ]
    }
    
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

      // console.log("response", response);
      // console.log("response.status", response.status);
      // console.log("response.status === 401", response.status === 401);

      if (response.status === 401 ) {
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
          change_orders
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
  }

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
      if (response.status === 401 ) {
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

  const approveOrRejectBrd = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.APPROVE_REJECT_BRD}`,
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

      // console.log('RemoteEndpoints.APPROVE_REJECT_BRD', RemoteEndpoints.APPROVE_REJECT_BRD);
      // console.log('Approve result', result);
      // console.log('states.admins.token', states.token);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('Approval/rejection message', message);

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

  const approveOrRejectQuestionnaire = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.APPROVE_REJECT_QUESTIONNAIRE}`,
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

      // console.log('RemoteEndpoints.APPROVE_REJECT_BRD', RemoteEndpoints.APPROVE_REJECT_BRD);
      // console.log('Approve result', result);
      // console.log('states.admins.token', states.token);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('Approval/rejection message', message);

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
  }

  const approveRevenueShare = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.APPROVE_REVENUE_SHARE}`,
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

      // console.log('RemoteEndpoints.APPROVE_REJECT_BRD', RemoteEndpoints.APPROVE_REJECT_BRD);
      // console.log('Approve result', result);
      // console.log('states.admins.token', states.token);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('Approval/rejection message', message);

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

  const approveChangeOrder = async (data) => {

    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.APPROVE_OR_REJECT_CHANGE_ORDER}`,
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

      console.log("APPROVAL RESPONSE", result);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('Approval/rejection message', message);

        return {
          message: "Approved successfully"
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
  }

  const rejectChangeOrder = async (data) => {

    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.APPROVE_OR_REJECT_CHANGE_ORDER}`,
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

      console.log("REJECTION RESPONSE", result);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('Approval/rejection message', message);

        return {
          message: "Rejected successfully"
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
  }

  const approveIP = async (data) => {

    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.APPROVE_OR_REJECT_IP}`,
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

      console.log("APPROVAL RESPONSE", result);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('Approval/rejection message', message);

        return {
          message: "Approved successfully"
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
  }

  const rejectIP = async (data) => {

    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.APPROVE_OR_REJECT_IP}`,
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

      console.log("REJECTION RESPONSE", result);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('Approval/rejection message', message);

        return {
          message: "Rejected successfully"
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
  }

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

      if (response.status === 401 ) {
        LogoutAdmin();
        return;
      }

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();
      setProcessing(false);


      console.log("All Grace Period response", result);

      if (result?.success) {

        const graceperiods = result?.data;

        return {
          graceperiods
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

      if (response.status === 401 ) {
        LogoutAdmin();
        return;
      }

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();
      setProcessing(false);


      console.log("All Licence Renewal response", result);

      if (result?.success) {

        const licenserenewals = result?.data;

        return {
          licenserenewals
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

      if (response.status === 401 ) {
        LogoutAdmin();
        return;
      }

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();
      setProcessing(false);


      console.log("Get all partner shortcodes", result);

      if (result?.success) {

        const shortcodes = result?.data;

        return {
          shortcodes
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
    getAllBoardResolutionDocuments,
    approveOrRejectBrd,
    getAllQuestionnaire,
    approveOrRejectQuestionnaire ,
    getAllRevenueShare,
    getAllChangeOrder,
    approveRevenueShare,
    approveChangeOrder,
    approveIP,
    rejectChangeOrder,
    rejectIP,
    getAllGracePeriod,
    getAllLicenceRenewal,
    getAllIP,
    getAllPartnersShortCodes,
  };
}